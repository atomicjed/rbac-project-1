using Hangfire;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Synergy.Configurations;
using Synergy.Models;

namespace Synergy.Services;

public class RandomCodeService
{
    private readonly IMongoCollection<RandomCodes> _randomCodesCollection;
    private static Random _random;
    
    public RandomCodeService(IOptions<DatabaseSettings> databaseSettings)
    {
        var mongoClient = new MongoClient(databaseSettings.Value.ConnectionString);
        var db = mongoClient.GetDatabase(databaseSettings.Value.DatabaseName);
        _randomCodesCollection = db.GetCollection<RandomCodes>(databaseSettings.Value.RandomCodesCollectionName);
        _random = new Random();
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
        ScheduleInviteCodeDeletion(randomCode);
        return randomCode;
    }
    
    private static string GenerateRandomCode(int length)
    {
        const string validChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var chars = new char[length];
    
        for (int i = 0; i < length; i++)
        {
            chars[i] = validChars[_random.Next(validChars.Length)];
        }
    
        return new string(chars);
    }
    
    public async Task<bool> ValidateInviteCode(RandomCodes body)
    {
        var filter = Builders<RandomCodes>.Filter.Eq(x => x.RandomCode, body.RandomCode);
        var codeDoc = await _randomCodesCollection.Find(filter).FirstOrDefaultAsync();
        return codeDoc != null && codeDoc.TeamId == body.TeamId;
    }
    
    public async Task DeleteInviteCode(string inviteCode)
    {
        var filter = Builders<RandomCodes>.Filter.Eq(x => x.RandomCode, inviteCode);
        await _randomCodesCollection.DeleteOneAsync(filter);
    }

    private void ScheduleInviteCodeDeletion(string inviteCode)
    {
        BackgroundJob.Schedule(() => DeleteInviteCode(inviteCode), TimeSpan.FromHours(24));
    }
}