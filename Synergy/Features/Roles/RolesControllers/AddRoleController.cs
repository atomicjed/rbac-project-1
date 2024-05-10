using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Synergy.Configurations;
using Synergy.Validators;

namespace Synergy.Features.Roles.RolesControllers;

public class AddRoleController : Controller
{
    private readonly IMongoCollection<Models.Roles> _rolesCollection;
    private readonly RolesValidator _rolesValidator;
    public AddRoleController(IOptions<DatabaseSettings> databaseSettings, RolesValidator rolesValidator)
    {
        var mongoClient = new MongoClient(databaseSettings.Value.ConnectionString);
        var db = mongoClient.GetDatabase(databaseSettings.Value.DatabaseName);
        _rolesCollection = db.GetCollection<Models.Roles>(databaseSettings.Value.RolesCollectionName);
        _rolesValidator = rolesValidator;
    }

    [HttpPost("/api/Roles/add-role")]
    [Authorize]
    public async Task<IActionResult> AddRole([FromBody] Models.Roles role)
    {
        var results = await Task.Run(() => _rolesValidator.Validate(role));
        if (!results.IsValid)
            return BadRequest(results.Errors);
        await _rolesCollection.InsertOneAsync(role);
        return NoContent();
    }
}