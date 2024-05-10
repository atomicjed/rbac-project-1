using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Synergy.Configurations;
using Synergy.Models;
using Synergy.Validators;

namespace Synergy.Features.Users.UserControllers;

public class GetUserInfoController : Controller
{
    private readonly IMongoCollection<User> _usersCollection;
    private readonly UserIdInputValidator _userIdInputValidator;
    public GetUserInfoController(IOptions<DatabaseSettings> databaseSettings, UserIdInputValidator userIdInputValidator)
    {
        var mongoClient = new MongoClient(databaseSettings.Value.ConnectionString);
        var db = mongoClient.GetDatabase(databaseSettings.Value.DatabaseName);
        _usersCollection = db.GetCollection<User>(databaseSettings.Value.UsersCollectionName);
        _userIdInputValidator = userIdInputValidator;
    }
    
    [HttpPost("/api/Users/get-user-info")]
    [Authorize]
    public async Task<IActionResult> GetUserInfo([FromBody] UserIdInput body)
    {
        var results = await Task.Run(() => _userIdInputValidator.Validate(body));
        if (!results.IsValid)
            return BadRequest(results.Errors);
        var userId = body.UserId;
        var userFilter = Builders<User>.Filter.Eq(x => x.UserId, userId);
        var user = await _usersCollection.Find(userFilter).FirstOrDefaultAsync();
        return Ok(user);
    }
}

public sealed record UserIdInput
{
    public string UserId { get; set; } = null!;
}