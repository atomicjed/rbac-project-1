using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Synergy.Configurations;
using Synergy.Models;

namespace Synergy.Services;

public class UsersService
{
    private readonly IMongoCollection<Users> _usersCollection;
    private readonly EncryptionService _encryptionService;

    public UsersService(IOptions<DatabaseSettings> databaseSettings)
    {
        var mongoClient = new MongoClient(databaseSettings.Value.ConnectionString);
        var db = mongoClient.GetDatabase(databaseSettings.Value.DatabaseName);
        _usersCollection = db.GetCollection<Users>(databaseSettings.Value.UsersCollectionName);
        _encryptionService = new EncryptionService();
    }

    public async Task AddUser(Users newUser)
    {
        var encryptedName = EncryptionService.EncryptionHelper.Encrypt(newUser.Name);
        var user = new Users
        {
            UserId = newUser.UserId,
            Name = encryptedName,
            Role = newUser.Role,
        };
        await _usersCollection.InsertOneAsync(user);
    }

    public async Task<Users> GetUser(string userId)
    {
        var dbUser = await _usersCollection.Find(x => x.UserId == userId).FirstOrDefaultAsync();
        var decryptedName = EncryptionService.EncryptionHelper.Decrypt(dbUser.Name);
        var user = new Users
        {
            UserId = dbUser.UserId,
            Name = decryptedName,
            Role = dbUser.Role
        };
        return user;
    }
}
