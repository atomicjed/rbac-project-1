using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Synergy.Configurations;
using Synergy.Models;

namespace Synergy.Services;

public class UsersService
{
    private readonly IMongoCollection<User> _usersCollection;
    private readonly IMongoCollection<Permissions> _permissionsCollection;
    private readonly EncryptionService _encryptionService;
    private readonly PermissionsService _permissionsService;

    public UsersService(IOptions<DatabaseSettings> databaseSettings)
    {
        var mongoClient = new MongoClient(databaseSettings.Value.ConnectionString);
        var db = mongoClient.GetDatabase(databaseSettings.Value.DatabaseName);
        _usersCollection = db.GetCollection<User>(databaseSettings.Value.UsersCollectionName);
        _permissionsCollection = db.GetCollection<Permissions>(databaseSettings.Value.PermissionsCollectionName);
        _encryptionService = new EncryptionService();
        _permissionsService = new PermissionsService(databaseSettings);
    }
    
    public async Task<User> GetUserInfo(string userId)
    {
        var userFilter = Builders<User>.Filter.Eq(x => x.UserId, userId);
        var user = await _usersCollection.Find(userFilter).FirstOrDefaultAsync();
        return user;
    }

    public async Task AddTeamIdToUser(string userId, string teamId)
    {
        var filter = Builders<User>.Filter.Eq(x => x.UserId, userId);
        var update = Builders<User>.Update.AddToSet("Teams", teamId);
        await _usersCollection.UpdateOneAsync(filter, update);
    }
}
