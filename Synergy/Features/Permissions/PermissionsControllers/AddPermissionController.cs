using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Synergy.Configurations;
using Synergy.Models;
using Synergy.Validators;

namespace Synergy.Features.Permissions.PermissionsControllers;

public class AddPermissionController : Controller
{
    private readonly IMongoCollection<Models.Permissions> _permissionsCollection;
    private readonly IMongoCollection<User> _usersCollection;
    private readonly PermissionsValidator _permissionsValidator;

    public AddPermissionController(IOptions<DatabaseSettings> databaseSettings,
        PermissionsValidator permissionsValidator)
    {
        var mongoClient = new MongoClient(databaseSettings.Value.ConnectionString);
        var db = mongoClient.GetDatabase(databaseSettings.Value.DatabaseName);
        _permissionsCollection = db.GetCollection<Models.Permissions>(databaseSettings.Value.PermissionsCollectionName);
        _usersCollection = db.GetCollection<User>(databaseSettings.Value.UsersCollectionName);
        _permissionsValidator = permissionsValidator;
    }
    
    [HttpPost("/api/Permissions/add-permission")]
    [Authorize]
    public async Task<IActionResult> AddPermission([FromBody] Models.Permissions permission)
    {
        var results = await Task.Run(() => _permissionsValidator.Validate(permission));
        if (!results.IsValid)
            return BadRequest(results.Errors);
        await _permissionsCollection.InsertOneAsync(permission);
        await AddPermissionsToUsers(permission);
        return NoContent();
    }

    private async Task AddPermissionsToUsers(Models.Permissions permission)
    {
        foreach (var role in permission.Roles)
        {
            var filter = Builders<Models.User>.Filter.Eq(x => x.Role, role);
            var update = Builders<Models.User>.Update.AddToSet("Permissions", permission.PermissionName);
            await _usersCollection.UpdateManyAsync(filter, update);
        }
    }
}