using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Synergy.Models;

public record UserInviteCodes
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }
    public string RandomCode { get; set; } = null!;
    public string TeamId { get; set; } = null!;
}