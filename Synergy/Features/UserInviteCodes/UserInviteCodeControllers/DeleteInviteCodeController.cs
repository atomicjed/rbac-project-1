using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Synergy.Configurations;
using Synergy.Services;
using Synergy.Validators.UserInviteCodeValidators;

namespace Synergy.Features.UserInviteCodes.UserInviteCodeControllers;

public class DeleteInviteCodeController : Controller
{
    private readonly IMongoCollection<Models.UserInviteCodes> _userInviteCodesCollection;
    private readonly DeleteInviteCodeInputValidator _deleteInviteCodeInputValidator;
    private RandomCodeService _randomCodeService;
    public DeleteInviteCodeController(IOptions<DatabaseSettings> databaseSettings, DeleteInviteCodeInputValidator deleteInviteCodeInputValidator, RandomCodeService randomCodeService)
    {
        var mongoClient = new MongoClient(databaseSettings.Value.ConnectionString);
        var db = mongoClient.GetDatabase(databaseSettings.Value.DatabaseName);
        _userInviteCodesCollection = db.GetCollection<Models.UserInviteCodes>(databaseSettings.Value.RandomCodesCollectionName);
        _deleteInviteCodeInputValidator = deleteInviteCodeInputValidator;
        _randomCodeService = randomCodeService;
    }
    
    [HttpDelete("/api/RandomCode/delete-invite-code")]
    public async Task<IActionResult> DeleteInviteCode([FromBody] DeleteInviteCodeInput body)
    {
        var results = await Task.Run(() => _deleteInviteCodeInputValidator.Validate(body));
        if (!results.IsValid)
            return BadRequest(results.Errors);
        var inviteCode = body.InviteCode;

        await _randomCodeService.DeleteInviteCode(inviteCode);
        return NoContent();
    }
}

public sealed record DeleteInviteCodeInput
{
    public string InviteCode { get; set; } = null!;
}