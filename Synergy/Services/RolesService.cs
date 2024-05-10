using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Synergy.Configurations;
using Synergy.Models;

namespace Synergy.Services;

public class RolesService
{
    private readonly IMongoCollection<Roles> _rolesCollection;

    public RolesService(IOptions<DatabaseSettings> databaseSettings)
    {
        var mongoClient = new MongoClient(databaseSettings.Value.ConnectionString);
        var db = mongoClient.GetDatabase(databaseSettings.Value.DatabaseName);
        _rolesCollection = db.GetCollection<Roles>(databaseSettings.Value.RolesCollectionName);
    }

    public async Task AddRole(Roles role)
    {
        await _rolesCollection.InsertOneAsync(role);
    }
}