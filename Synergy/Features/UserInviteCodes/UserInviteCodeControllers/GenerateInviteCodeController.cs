using Hangfire;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Synergy.Authorization;
using Synergy.Configurations;
using Synergy.Services;
using Synergy.Validators.TeamValidators;

namespace Synergy.Features.UserInviteCodes.UserInviteCodeControllers;

public class GenerateInviteCodeController : Controller
{
    private readonly TeamIdInputValidator _teamIdInputValidator;
    private readonly IMongoCollection<Models.UserInviteCodes> _userInviteCodesCollection;
    private readonly RandomCodeService _randomCodeService;
    private static Random _random;
    public GenerateInviteCodeController(IOptions<DatabaseSettings> databaseSettings, TeamIdInputValidator teamIdInputValidator, RandomCodeService randomCodeService)
    {
        var mongoClient = new MongoClient(databaseSettings.Value.ConnectionString);
        var db = mongoClient.GetDatabase(databaseSettings.Value.DatabaseName);
        _random = new Random();
        _userInviteCodesCollection = db.GetCollection<Models.UserInviteCodes>(databaseSettings.Value.RandomCodesCollectionName);
        _teamIdInputValidator = teamIdInputValidator;
        _randomCodeService = randomCodeService;
    }
    [HttpPost("api/RandomCode/generate-code")]
    [Authorize]
    [AuthorizePermission(Authorization.Permissions.CanGenerateInviteCode)]
    public async Task<IActionResult> GenerateCode([FromBody] TeamIdInput body)
    {
        var results = await Task.Run(() => _teamIdInputValidator.Validate(body));
        if (!results.IsValid)
            return BadRequest(results.Errors);
        var teamId = body.Id;
        var randomCode = GenerateRandomCode(10);
        var randomCodeObject = new Models.UserInviteCodes
        {
            RandomCode = randomCode,
            TeamId = teamId
        };
        await _userInviteCodesCollection.InsertOneAsync(randomCodeObject);
        ScheduleInviteCodeDeletion(randomCode);
        
        return Ok(randomCode);
    }
    
    private static string GenerateRandomCode(int length)
    {
        const string validChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var chars = new char[10];
    
        for (int i = 0; i < length; i++)
        {
            chars[i] = validChars[_random.Next(validChars.Length)];
        }
    
        return new string(chars);
    }
    
    private void ScheduleInviteCodeDeletion(string inviteCode)
    {
        BackgroundJob.Schedule(() => _randomCodeService.DeleteInviteCode(inviteCode), TimeSpan.FromHours(24));
    }
}
public sealed record TeamIdInput
{
    public string Id { get; set; } = null!;
}