using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Synergy.Configurations;
using Synergy.Services;
using Synergy.Validators.TeamValidators;

namespace Synergy.Features.Teams.TeamControllers;

public class AddUserToTeamController : Controller
{
    private readonly UsersService _usersService;
    private readonly IMongoCollection<Models.Teams> _teamsCollection;
    private readonly AddUserToTeamInputValidator _addUserToTeamInputValidator;

    public AddUserToTeamController(IOptions<DatabaseSettings> databaseSettings, UsersService usersService, AddUserToTeamInputValidator addUserToTeamInputValidator)
    {
        var mongoClient = new MongoClient(databaseSettings.Value.ConnectionString);
        var db = mongoClient.GetDatabase(databaseSettings.Value.DatabaseName);
        _teamsCollection = db.GetCollection<Models.Teams>(databaseSettings.Value.TeamsCollectionName);
        _usersService = usersService;
        _addUserToTeamInputValidator = addUserToTeamInputValidator;
    }
    
    [HttpPost("/api/Teams/add-user-to-team")]
    public async Task<IActionResult> AddUserToTeam([FromBody] AddUserToTeamInput body)
    {
        var results = await Task.Run(() => _addUserToTeamInputValidator.Validate(body));
        if (!results.IsValid)
            return BadRequest(results.Errors);
        var field = body.Role switch
        {
            "Player" => "Players",
            "Personal Trainer" => "PersonalTrainers",
            "Manager" => "Managers",
            _ => "Players"
        };
        var filter = Builders<Models.Teams>.Filter.Eq(x => x.Id, body.TeamId);
        var update = Builders<Models.Teams>.Update.AddToSet($"{field}", body.UserId);
        await _teamsCollection.UpdateOneAsync(filter, update);
        await _usersService.AddTeamIdToUser(body.UserId, body.TeamId);
        return NoContent();
    }
}

public sealed record AddUserToTeamInput
{
    public string UserId { get; set; } = null!;
    public string Role { get; set; } = null!;
    public string TeamId { get; set; } = null!;
}