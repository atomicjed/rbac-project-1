using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Synergy.Configurations;
using Synergy.Models;
using Synergy.Services;
using Synergy.Validators;

namespace Synergy.Features.Users.UserControllers;

public class AddUserController : Controller
{
    private readonly IMongoCollection<User> _usersCollection;
    private readonly PermissionsService _permissionsService;
    private UserFromBodyInputValidator _userFromBodyInputValidator;
    public AddUserController(IOptions<DatabaseSettings> databaseSettings, PermissionsService permissionsService, UserFromBodyInputValidator userFromBodyInputValidator)
    {
        var mongoClient = new MongoClient(databaseSettings.Value.ConnectionString);
        var db = mongoClient.GetDatabase(databaseSettings.Value.DatabaseName);
        _usersCollection = db.GetCollection<User>(databaseSettings.Value.UsersCollectionName);
        _permissionsService = permissionsService;
        _userFromBodyInputValidator = userFromBodyInputValidator;
    }
    [HttpPost("/api/Users/add-user")]
    [Authorize]
    public async Task<IActionResult> AddUser([FromBody] UserFromBodyInput userFromBody)
    {
        var results = await Task.Run(() => _userFromBodyInputValidator.Validate(userFromBody));
        if (!results.IsValid)
            return BadRequest(results.Errors);
        var permissions = await _permissionsService.GetPermissionsFromRole(userFromBody.Role);
        var user = new User
        {
            UserId = userFromBody.UserId,
            Role = userFromBody.Role,
            Permissions = permissions,
            Teams = []
        };
        await _usersCollection.InsertOneAsync(user);
        var userId =  userFromBody.UserId;
        return Ok(new { userId });
    }
}

public record UserFromBodyInput
{
    public string UserId { get; set; } = null!;
    public string Role { get; set; } = null!;
}