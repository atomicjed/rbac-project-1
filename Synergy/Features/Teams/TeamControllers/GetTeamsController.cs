using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Synergy.Configurations;

namespace Synergy.Features.Teams.TeamControllers;

public class GetTeamsController : Controller
{
    private readonly IMongoCollection<Models.Teams> _teamsCollection;

    public GetTeamsController(IOptions<DatabaseSettings> databaseSettings)
    {
        var mongoClient = new MongoClient(databaseSettings.Value.ConnectionString);
        var db = mongoClient.GetDatabase(databaseSettings.Value.DatabaseName);
        _teamsCollection = db.GetCollection<Models.Teams>(databaseSettings.Value.TeamsCollectionName);
    }
    
    [HttpPost("/api/Teams/get-user-teams")]
    [Authorize]
    public async Task<ActionResult<Models.Teams[]>> GetTeams([FromBody] string[] teamIds)
    {
        if (teamIds.Length == 0)
            return BadRequest("TeamIds array cannot be empty.");
        var teamsList = new List<Models.Teams>();
        foreach (var teamId in teamIds)
        {
            var filter = Builders<Models.Teams>.Filter.Eq(x => x.Id, teamId);
            var team = await _teamsCollection.Find(filter).FirstOrDefaultAsync();
            if (team != null)
                teamsList.Add(team);
        }

        return teamsList.ToArray();
    }
}