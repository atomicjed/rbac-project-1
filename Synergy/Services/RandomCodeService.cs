using Hangfire;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Synergy.Configurations;
using Synergy.Models;

namespace Synergy.Services;

public class RandomCodeService
{
    private readonly IMongoCollection<UserInviteCodes> _randomCodesCollection;
    private static Random _random;
    
    public RandomCodeService(IOptions<DatabaseSettings> databaseSettings)
    {
        var mongoClient = new MongoClient(databaseSettings.Value.ConnectionString);
        var db = mongoClient.GetDatabase(databaseSettings.Value.DatabaseName);
        _randomCodesCollection = db.GetCollection<UserInviteCodes>(databaseSettings.Value.RandomCodesCollectionName);
        _random = new Random();
    }
    
    
    public async Task DeleteInviteCode(string inviteCode)
    {
        var filter = Builders<UserInviteCodes>.Filter.Eq(x => x.RandomCode, inviteCode);
        await _randomCodesCollection.DeleteOneAsync(filter);
    }
}