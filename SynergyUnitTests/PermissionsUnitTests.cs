using MongoDB.Driver;
using Synergy.Models;

namespace SynergyUnitTests;

public class PermissionsUnitTests
{
    private IMongoDatabase _testDatabase;
    private IMongoCollection<Permissions> _permissionsCollection;
    private IMongoCollection<User> _usersCollection;

    [SetUp]
    public void Setup()
    {
        var client = new MongoClient("mongodb://localhost:27017");
        _testDatabase = client.GetDatabase("SynergyTest");
        _permissionsCollection = _testDatabase.GetCollection<Permissions>("PermissionsTest");
        _usersCollection = _testDatabase.GetCollection<User>("UsersTest");
    }

    [Test]
    public async Task Test_GetUserPermissions()
    {
        var userId = "USER_ID";
        string[] expectedPermissions = ["can-register-team", "can-assign-trainer", "can-create-plan"];
        var permissionNames = await GetUserPermissions(userId);
        Assert.That(permissionNames, Is.EqualTo(expectedPermissions));
    }

    public async Task<string[]> GetUserPermissions(string userId)
    {
        var userFilter = Builders<User>.Filter.Eq(x => x.UserId, userId);
        var user = await _usersCollection.Find(userFilter).FirstOrDefaultAsync();
        var permissionFilter = Builders<Permissions>.Filter.AnyEq(x => x.Roles, user.Role);
        var projectName = Builders<Permissions>.Projection.Include(x => x.PermissionName);
        var permissions = _permissionsCollection.Find(permissionFilter).Project(projectName).ToList();
        var permissionNames = permissions.Select(x => x["PermissionName"].AsString).ToArray();
        return permissionNames;
    }

    [Test]
    public async Task Test_AddPermission()
    {
        var permission = new Permissions
        {
            PermissionName = "can-add-detail",
            Description = "Can add detail to a fitness plan",
            Roles = ["Personal Trainer"]
        };
        await AddPermission(permission);
        var filter = Builders<Permissions>.Filter.Eq(x => x.PermissionName, "can-register-team");
        var addedPermission = await _permissionsCollection.Find(filter).FirstOrDefaultAsync();
        Assert.That(addedPermission.PermissionName, Is.EqualTo("can-register-team"));
    }

    public async Task AddPermission(Permissions permission)
    {
        await _permissionsCollection.InsertOneAsync(permission);
    }

    [Test]
    public async Task Test_GetPermission()
    {
        var permissionName = "can-register-team";
        var permission = await GetPermission(permissionName);
        Assert.That(permission.Description, Is.EqualTo("Can register a team"));
    }

    public async Task<Permissions> GetPermission(string permissionName)
    {
        var filter = Builders<Permissions>.Filter.Eq(x => x.PermissionName, permissionName);
        return await _permissionsCollection.Find(filter).FirstOrDefaultAsync();
    }
}