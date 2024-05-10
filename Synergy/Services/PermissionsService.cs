using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Synergy.Configurations;
using Synergy.Models;

namespace Synergy.Services;

public class PermissionsService
{
    private readonly IMongoCollection<Permissions> _permissionsCollection;
    private readonly IMongoCollection<User> _usersCollection;

    public PermissionsService(IOptions<DatabaseSettings> databaseSettings)
    {
        var mongoClient = new MongoClient(databaseSettings.Value.ConnectionString);
        var db = mongoClient.GetDatabase(databaseSettings.Value.DatabaseName);
        _permissionsCollection = db.GetCollection<Permissions>(databaseSettings.Value.PermissionsCollectionName);
        _usersCollection = db.GetCollection<User>(databaseSettings.Value.UsersCollectionName);
    }

    public async Task<string[]> GetPermissionsFromRole(string role)
    {
        var permissionFilter = Builders<Permissions>.Filter.AnyEq(x => x.Roles, role);
        var projectName = Builders<Permissions>.Projection.Include(x => x.PermissionName);
        var permissions = _permissionsCollection.Find(permissionFilter).Project(projectName).ToList();
        var permissionNames = permissions.Select(x => x["PermissionName"].AsString).ToArray();
        return permissionNames;
    }
}