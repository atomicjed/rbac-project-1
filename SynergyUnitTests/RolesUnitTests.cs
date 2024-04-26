using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Synergy.Configurations;
using Synergy.Models;
using Synergy.Services;

namespace SynergyUnitTests;

public class RolesUnitTests
{
    private IMongoDatabase _testDatabase;
    private IMongoCollection<Roles> _rolesCollection;
    private RolesService _rolesService;

    [SetUp]
    public void Setup()
    {
        var client = new MongoClient("mongodb://localhost:27017");
        _testDatabase = client.GetDatabase("SynergyTest");
        _rolesCollection = _testDatabase.GetCollection<Roles>("RolesTest");
        var databaseSettings = Options.Create(new DatabaseSettings
        {
            ConnectionString = "mongodb://localhost:27017",
            DatabaseName = "SynergyTest",
            RolesCollectionName = "RolesTest"
        });
        _rolesService = new RolesService(databaseSettings);
    }

    [Test]
    public async Task Test_AddRole()
    {
        var role = new Roles
        {
            RoleName = "Manager",
            Permissions = ["can-register-team", "can-assign-trainer", "can-create-plan"]
        };
        await _rolesService.AddRole(role);
    }
}