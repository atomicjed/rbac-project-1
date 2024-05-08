using MongoDB.Driver;
using Synergy.Models;

namespace SynergyUnitTests;

public class RandomCodeUnitTests
{
    private IMongoDatabase _testDatabase;
    private IMongoCollection<RandomCodes> _randomCodesCollection;
    private static Random _random = new Random();

    [SetUp]
    public void Setup()
    {
        var client = new MongoClient("mongodb://localhost:27017");
        _testDatabase = client.GetDatabase("SynergyTest");
        _randomCodesCollection = _testDatabase.GetCollection <RandomCodes>("RandomCodesTest");
    }
    
    [Test]
    public async Task Test_GenerateRandomCodeInvite()
    {
        var teamId = "TEAM_ID";
        var randomCode = await GenerateRandomCodeInvite(teamId);
        Assert.That(randomCode.Length, Is.EqualTo(10));
    }

    public async Task<string> GenerateRandomCodeInvite(string teamId)
    {
        var randomCode = GenerateRandomCode(10);
        var randomCodeObject = new RandomCodes
        {
            RandomCode = randomCode,
            TeamId = teamId
        };
        await _randomCodesCollection.InsertOneAsync(randomCodeObject);
        return randomCode;
    }
    
    public static string GenerateRandomCode(int length)
    {
        const string validChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var chars = new char[length];

        for (int i = 0; i < length; i++)
        {
            chars[i] = validChars[_random.Next(validChars.Length)];
        }

        return new string(chars);
    }

    [Test]
    public async Task Test_ValidateInviteCode()
    {
        var reqBody = new RandomCodes
        {
            RandomCode = "P3lxQ8zkgT",
            TeamId = "TEAM_ID"
        };
        var result = await ValidateInviteCode(reqBody);
        Assert.That(result, Is.EqualTo(true));
    }

    public async Task<bool> ValidateInviteCode(RandomCodes body)
    {
        var filter = Builders<RandomCodes>.Filter.Eq(x => x.RandomCode, body.RandomCode);
        var codeDoc = await _randomCodesCollection.Find(filter).FirstOrDefaultAsync();
        return codeDoc != null && codeDoc.TeamId == body.TeamId;
    }

    [Test]
    public async Task Test_DeleteInviteCode()
    {
        var inviteCode = "KgmP3YdFbi";
        await DeleteInviteCode(inviteCode);
        
        var filter = Builders<RandomCodes>.Filter.Eq(x => x.RandomCode, inviteCode);
        var inviteCodeDoc = await _randomCodesCollection.Find(filter).FirstOrDefaultAsync();
        Assert.That(inviteCodeDoc, Is.Null);
    }

    public async Task DeleteInviteCode(string inviteCode)
    {
        var filter = Builders<RandomCodes>.Filter.Eq(x => x.RandomCode, inviteCode);
        await _randomCodesCollection.DeleteOneAsync(filter);
    }
}