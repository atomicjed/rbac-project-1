using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Synergy.Authorization;
using Synergy.Configurations;
using Synergy.Services;
using Synergy.Validators.TeamValidators;
using Permissions = Synergy.Authorization.Permissions;

namespace Synergy.Features.Teams.TeamControllers;

public class RegisterTeamController : Controller
{
    private readonly IMongoCollection<Models.Teams> _teamsCollection;
    private readonly UsersService _usersService;
    private readonly RegisterTeamInputValidator _validator;

    public RegisterTeamController(IOptions<DatabaseSettings> databaseSettings, UsersService usersService, RegisterTeamInputValidator validator)
    {
        _validator = validator;
        _usersService = usersService;
        var mongoClient = new MongoClient(databaseSettings.Value.ConnectionString);
        var db = mongoClient.GetDatabase(databaseSettings.Value.DatabaseName);
        _teamsCollection = db.GetCollection<Models.Teams>(databaseSettings.Value.TeamsCollectionName);
    }
    
    [AuthorizePermission(Authorization.Permissions.CanRegisterTeam)]
    [HttpPost("/api/Teams/register-team")]
    public async Task<IActionResult> RegisterTeam([FromBody] RegisterTeamInput body)
    {
        var results = await Task.Run(() => _validator.Validate(body)); 
        if (!results.IsValid)
            return BadRequest(results.Errors);

        var team = body.Team;
        var userId = body.UserId;

        await _teamsCollection.InsertOneAsync(team);
        await _usersService.AddTeamIdToUser(userId, team?.Id ?? "");
        return NoContent();
    }
}

public sealed record RegisterTeamInput
{
    public string UserId { get; set; } = null!;
    public Models.Teams Team { get; set; } = null!;
}