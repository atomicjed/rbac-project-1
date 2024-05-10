using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Synergy.Configurations;

namespace Synergy.Features.Roles.RolesControllers;

public class GetRoleController : Controller
{
    private readonly IMongoCollection<Models.Roles> _rolesCollection;

    public GetRoleController(IOptions<DatabaseSettings> databaseSettings)
    {
        var mongoClient = new MongoClient(databaseSettings.Value.ConnectionString);
        var db = mongoClient.GetDatabase(databaseSettings.Value.DatabaseName);
        _rolesCollection = db.GetCollection<Models.Roles>(databaseSettings.Value.RolesCollectionName);
    }
    
    [HttpGet("/api/Roles/get-role/{roleName}")]
    [Authorize]
    public async Task<IActionResult> GetRole(string roleName)
    {
        if (roleName == "")
            return BadRequest("Role name cannot be an empty string");
        var role = await _rolesCollection.Find(x => x.RoleName == roleName).FirstOrDefaultAsync();
        return Ok(role);
    }
}