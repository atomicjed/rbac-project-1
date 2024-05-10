using System.ComponentModel;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Synergy.Models;

public enum RolesOptions
{
    Manager,
    Player,
    [Description("Personal Trainer")]
    PersonalTrainer
}

public record User
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }
    public string UserId { get; set; } = null!;
    public string Role { get; set; } = null!;
    public string[] Permissions { get; set; } = null!;
    public string[]? Teams { get; set; }
}