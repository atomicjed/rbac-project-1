using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Synergy.Models;

public record Permissions
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }
    public string PermissionName { get; set; } = null!;
    public string Description { get; set; } = null!;
    public string[] Roles { get; set; } = null!;
}