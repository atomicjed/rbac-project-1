using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Synergy.Models;

public record Roles
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }
    public string RoleName { get; set; } = null!;
    public string[] Permissions { get; set; } = null!;
}