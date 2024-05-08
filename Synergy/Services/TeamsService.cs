using FirebaseAdmin.Auth;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Synergy.Configurations;
using Synergy.Models;

namespace Synergy.Services;

public class TeamsService
{
    private readonly IMongoCollection<Teams> _teamsCollection;

    public TeamsService(IOptions<DatabaseSettings> databaseSettings)
    {
        var mongoClient = new MongoClient(databaseSettings.Value.ConnectionString);
        var db = mongoClient.GetDatabase(databaseSettings.Value.DatabaseName);
        _teamsCollection = db.GetCollection<Teams>(databaseSettings.Value.TeamsCollectionName);
    }

    public async Task<string> RegisterTeam(Teams team)
    {
        await _teamsCollection.InsertOneAsync(team);
        return team.Id ?? "";
    }

    public async Task<Teams[]> GetTeams(string[] teamIds)
    {
        var teamsList = new List<Teams>();
        foreach (var teamId in teamIds)
        {
            var filter = Builders<Teams>.Filter.Eq(x => x.Id, teamId);
            var team = await _teamsCollection.Find(filter).FirstOrDefaultAsync();
            if (team != null)
                teamsList.Add(team);
        }

        return teamsList.ToArray();
    }
    
    public async Task<AddTeamIdToUserBody> AddUserToTeam(AddUserToTeamBody body)
    {
        var field = body.Role switch
        {
            "Player" => "Players",
            "Personal Trainer" => "PersonalTrainers",
            "Manager" => "Managers",
            _ => "Players"
        };
        var filter = Builders<Teams>.Filter.Eq(x => x.Id, body.TeamId);
        var update = Builders<Teams>.Update.AddToSet($"{field}", body.UserId);
        await _teamsCollection.UpdateOneAsync(filter, update);

        var addTeamIdToUserBody = new AddTeamIdToUserBody
        {
            UserId = body.UserId,
            TeamId = body.TeamId
        };
        return addTeamIdToUserBody;
    }
}

public record AddUserToTeamBody
{
    public string UserId { get; set; } = null!;
    public string Role { get; set; } = null!;
    public string TeamId { get; set; } = null!;
}
public record AddTeamIdToUserBody
{
    public string UserId { get; set; } = null!;
    public string TeamId { get; set; } = null!;
}