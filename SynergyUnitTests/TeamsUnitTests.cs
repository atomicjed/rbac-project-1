using MongoDB.Bson.Serialization;
using MongoDB.Driver;
using Synergy.Models;
using Synergy.Services;

namespace SynergyUnitTests;

public class TeamsUnitTests
{
    private IMongoDatabase _testDatabase;
    private IMongoCollection<Teams> _teamsCollection;
    
    [SetUp]
    public void Setup()
    {
        var client = new MongoClient("mongodb://localhost:27017");
        _testDatabase = client.GetDatabase("SynergyTest");
        _teamsCollection = _testDatabase.GetCollection<Teams>("TeamsTest");
    }

    [Test]
    public async Task Test_RegisterTeam()
    {
        var team = new Teams
        {
            TeamName = "Synergy FC",
            UrlSlug = "synergy-fc",
            StandardOfFootball = 0,
            AgeGroup = 0,
            PrimaryColour = "#14d300",
            SecondaryColour = "#ffffff",
            Players = [],
            PersonalTrainers = []
        };
        await RegisterTeam(team);
    }

    public async Task RegisterTeam(Teams team)
    {
        await _teamsCollection.InsertOneAsync(team);
    }

    [Test]
    public async Task Test_AddUserToTeam()
    {
        var body = new AddUserToTeamBody
        {
            UserId = "Player3",
            Role = "Player",
            TeamId = "663a236bfd1bea392db2e7a7"
        };
        await AddUserToTeam(body);

        var filter = Builders<Teams>.Filter.Eq(x => x.Id, body.TeamId);
        var team = await _teamsCollection.Find(filter).FirstOrDefaultAsync();
        Assert.That(team.Players.Contains(body.UserId), Is.EqualTo(true));
    }

    public async Task AddUserToTeam(AddUserToTeamBody body)
    {
        string field = body.Role switch
        {
            "Player" => "Players",
            "Personal Trainer" => "PersonalTrainers",
            "Manager" => "Managers",
            _ => "Players"
        };
        var filter = Builders<Teams>.Filter.Eq(x => x.Id, body.TeamId);
        var update = Builders<Teams>.Update.AddToSet($"{field}", body.UserId);
        await _teamsCollection.UpdateOneAsync(filter, update);
    }
}