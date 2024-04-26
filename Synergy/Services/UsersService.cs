using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Synergy.Configurations;
using Synergy.Models;

namespace Synergy.Services;

public class UsersService
{
    private readonly IMongoCollection<Users> _usersCollection;
    private readonly IMongoCollection<Permissions> _permissionsCollection;
    private readonly EncryptionService _encryptionService;
    private readonly PermissionsService _permissionsService;

    public UsersService(IOptions<DatabaseSettings> databaseSettings)
    {
        var mongoClient = new MongoClient(databaseSettings.Value.ConnectionString);
        var db = mongoClient.GetDatabase(databaseSettings.Value.DatabaseName);
        _usersCollection = db.GetCollection<Users>(databaseSettings.Value.UsersCollectionName);
        _permissionsCollection = db.GetCollection<Permissions>(databaseSettings.Value.PermissionsCollectionName);
        _encryptionService = new EncryptionService();
        _permissionsService = new PermissionsService(databaseSettings);
    }

    public async Task<string[]> AddUser(Users user)
    {
        await _usersCollection.InsertOneAsync(user);
        var permissions = await _permissionsService.GetUserPermissions(user.UserId);
        return permissions;
    }

    public async Task<Users> GetUser(string userId)
    {
        var dbUser = await _usersCollection.Find(x => x.UserId == userId).FirstOrDefaultAsync();
        var user = new Users
        {
            UserId = dbUser.UserId,
            Role = dbUser.Role
        };
        return user;
    }
}
