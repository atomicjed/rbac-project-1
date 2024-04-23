using System.Security.Cryptography;
using System.Text;
using MongoDB.Driver;
using Synergy.Models;

namespace SynergyUnitTests;

public class UsersUnitTests
{
    private IMongoDatabase _testDatabase;
    private IMongoCollection<Users> _usersCollection;
    [SetUp]
    public void Setup()
    {
        var client = new MongoClient("mongodb://localhost:27017");
        _testDatabase = client.GetDatabase("SynergyTest");
        _usersCollection = _testDatabase.GetCollection<Users>("UsersTest");
    }

    [Test]
    public async Task Test_AddUser()
    {
        var user = new Users
        {
            UserId = "USER_ID",
            Name = "Ricky",
            Role = "Manager"
        };
        var encrypted = EncryptionHelper.Encrypt(user.Name);
        var decrypted = EncryptionHelper.Decrypt(encrypted);
        Console.WriteLine("decryptedName:", decrypted);
        var newUser = new Users
        {
            UserId = user.UserId,
            Name = encrypted,
            Role = user.Role
        };
        Console.WriteLine("encryptedName:", encrypted);
        await AddUser(newUser, decrypted);

        var filter = Builders<Users>.Filter.Eq(x => x.UserId, "USER_ID");
        var addedUser = await _usersCollection.Find(filter).FirstOrDefaultAsync();
        Assert.That(addedUser, Is.Not.Null);
        Assert.That(addedUser.Role, Is.EqualTo("Manager"));
    }

    public async Task AddUser(Users newUser, string decryptedName)
    {
        
        await _usersCollection.InsertOneAsync(newUser);
        var newUser2 = new Users
        {
            UserId = newUser.UserId,
            Name = decryptedName,
            Role = newUser.Role
        };
        await _usersCollection.InsertOneAsync(newUser2);
    }

    [Test]
    public async Task Test_GetUser()
    {
        var userId = "USER_ID";
        var user = await GetUser(userId);
        Assert.That(user.Name, Is.EqualTo("Ricky"));
    }
    public async Task<Users> GetUser(string userId)
    {
        var dbUser = await _usersCollection.Find(x => x.UserId == userId).FirstOrDefaultAsync();
        var encrypted = EncryptionHelper.Encrypt("Ricky");
        var decryptedName = EncryptionHelper.Decrypt(dbUser.Name);
        var user = new Users
        {
            UserId = dbUser.UserId,
            Name = decryptedName,
            Role = dbUser.Role
        };
        return user;
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