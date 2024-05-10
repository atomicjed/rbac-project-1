using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Synergy.Configurations;
using Synergy.Validators.UserInviteCodeValidators;

namespace Synergy.Features.UserInviteCodes.UserInviteCodeControllers;

public class ValidateInviteCodeController : Controller
{
    private UserInviteCodeValidator _userInviteCodeValidator;
    private IMongoCollection<Models.UserInviteCodes> _userInviteCodesCollection;
    
    public ValidateInviteCodeController(IOptions<DatabaseSettings> databaseSettings, UserInviteCodeValidator userInviteCodeValidator)
    {
        var mongoClient = new MongoClient(databaseSettings.Value.ConnectionString);
        var db = mongoClient.GetDatabase(databaseSettings.Value.DatabaseName);
        _userInviteCodesCollection = db.GetCollection<Models.UserInviteCodes>(databaseSettings.Value.RandomCodesCollectionName);
        _userInviteCodeValidator = userInviteCodeValidator;
    }
    [HttpPost("/api/RandomCode/validate-invitation-code")]
    public async Task<IActionResult> ValidateCode([FromBody] Models.UserInviteCodes body)
    {
        var results = await Task.Run(() => _userInviteCodeValidator.Validate(body));
        if (!results.IsValid)
            return BadRequest(results.Errors);
        var filter = Builders<Models.UserInviteCodes>.Filter.Eq(x => x.RandomCode, body.RandomCode);
        var codeDoc = await _userInviteCodesCollection.Find(filter).FirstOrDefaultAsync();
        var codeIsValid = codeDoc != null && codeDoc.TeamId == body.TeamId;
        return Ok(codeIsValid);
    }
}