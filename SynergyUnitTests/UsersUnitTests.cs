using System.Collections.Immutable;
using System.Security.Cryptography;
using System.Text;
using MongoDB.Bson.Serialization.IdGenerators;
using MongoDB.Driver;
using Synergy.Models;
using Synergy.Services;

namespace SynergyUnitTests;

public class UsersUnitTests
{
    private IMongoDatabase _testDatabase;
    private IMongoCollection<User> _usersCollection;
    private PermissionsService _permissionsService;
    private IMongoCollection<Permissions> _permissionsCollection;
    [SetUp]
    public void Setup()
    {
        var client = new MongoClient("mongodb://localhost:27017");
        _testDatabase = client.GetDatabase("SynergyTest");
        _usersCollection = _testDatabase.GetCollection<User>("UsersTest");
        _permissionsCollection = _testDatabase.GetCollection<Permissions>("PermissionsTest");
    }
    

    [Test]
    public async Task Test_AddUser()
    {
        var user = new UserFromBody
        {
            UserId = "USER_ID",
            Role = "Manager"
        };
        var permissions = await AddUser(user);
        var filter = Builders<User>.Filter.Eq(x => x.UserId, "USER_ID");
        var addedUser = await _usersCollection.Find(filter).FirstOrDefaultAsync();
        string[] expectedPermissions = ["can-register-team", "can-assign-trainer", "can-create-plan"];
        Assert.That(addedUser, Is.Not.Null);
        Assert.That(addedUser.Role, Is.EqualTo("Manager"));
        Assert.That(permissions, Is.EqualTo(expectedPermissions));
    }

    public async Task<string[]> AddUser(UserFromBody userFromBody)
    {
        var permissions = await GetPermissionsFromRole(userFromBody.Role);
        var user = new User
        {
            UserId = userFromBody.UserId,
            Role = userFromBody.Role,
            Permissions = permissions
        };
        await _usersCollection.InsertOneAsync(user);
        return permissions;
    }

    [Test]
    public async Task Test_GetUserPermissions()
    {
        var userId = "USER_ID";
        var permissions = await GetUserPermissions(userId);
        string[] expectedPermissions = ["can-register-team", "can-assign-trainer", "can-create-plan"];
        Assert.That(permissions, Is.EqualTo(expectedPermissions));
    }
    public async Task<string[]> GetUserPermissions(string userId)
    {
        var userFilter = Builders<User>.Filter.Eq(x => x.UserId, userId);
        var user = await _usersCollection.Find(userFilter).FirstOrDefaultAsync();
        return user.Permissions;
    }

    public async Task<string[]> GetPermissionsFromRole(string role)
    {
        var permissionFilter = Builders<Permissions>.Filter.AnyEq(x => x.Roles, role);
        var projectName = Builders<Permissions>.Projection.Include(x => x.PermissionName);
        var permissions = _permissionsCollection.Find(permissionFilter).Project(projectName).ToList();
        var permissionNames = permissions.Select(x => x["PermissionName"].AsString).ToArray();
        return permissionNames;
    }

    public static class EncryptionHelper
    {
        private static readonly string EncryptionKey = "s1db8+P0Im4v5rfKzbAqovjRpX+SR2e8l63W9YvhCuw=\n";

        public static string Encrypt(string plainText)
        {
            using (var aesAlg = Aes.Create())
            {
                aesAlg.Key = Convert.FromBase64String(EncryptionKey);
                aesAlg.IV = GenerateRandomIV();
                aesAlg.Padding = PaddingMode.PKCS7;

                ICryptoTransform encryptor = aesAlg.CreateEncryptor(aesAlg.Key, aesAlg.IV);

                using (MemoryStream msEncrypt = new MemoryStream())
                {
                    using (CryptoStream csEncrypt = new CryptoStream(msEncrypt, encryptor, CryptoStreamMode.Write))
                    {
                        using (StreamWriter swEncrypt = new StreamWriter(csEncrypt))
                        {
                            swEncrypt.Write(plainText);
                        }
                    }
                    return Convert.ToBase64String(aesAlg.IV.Concat(msEncrypt.ToArray()).ToArray());
                }
            }
        }

        public static string Decrypt(string cipherText)
        {
            byte[] cipherBytes = Convert.FromBase64String(cipherText);

            using (Aes aesAlg = Aes.Create())
            {
                aesAlg.Key = Convert.FromBase64String(EncryptionKey);
                aesAlg.IV = cipherBytes.Take(16).ToArray();

                aesAlg.Padding = PaddingMode.PKCS7; // Set the padding mode to PKCS7

                ICryptoTransform decryptor = aesAlg.CreateDecryptor(aesAlg.Key, aesAlg.IV);

                using (MemoryStream msDecrypt = new MemoryStream(cipherBytes, 16, cipherBytes.Length - 16))
                {
                    using (CryptoStream csDecrypt = new CryptoStream(msDecrypt, decryptor, CryptoStreamMode.Read))
                    {
                        using (StreamReader srDecrypt = new StreamReader(csDecrypt))
                        {
                            return srDecrypt.ReadToEnd();
                        }
                    }
                }
            }
        }
        private static byte[] GenerateRandomIV()
        {
            using (Aes aesAlg = Aes.Create())
            {
                aesAlg.GenerateIV();
                return aesAlg.IV;
            }
        }

    }

}