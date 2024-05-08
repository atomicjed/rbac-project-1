using System.ComponentModel.DataAnnotations;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Synergy.Models;

public enum StandardOfFootballEnum
{
    Grassroots,
    Amateur,
    SemiProfessional,
    Professional
}

public enum AgeGroupEnum
{
    Junior, 
    Senior
}

public record Teams
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }
    public string TeamName { get; set; } = null!;
    [RegularExpression(@"^[a-zA-Z0-9_-]+$", ErrorMessage = "Url slug can only contain alphanumeric characters, hyphens, and underscores")]
    public string UrlSlug { get; set; } = null!;
    [BsonRepresentation(BsonType.String)]
    public StandardOfFootballEnum StandardOfFootball { get; set; }
    [BsonRepresentation(BsonType.String)]
    public AgeGroupEnum AgeGroup { get; set; }
    public string PrimaryColour { get; set; } = null!;
    public string SecondaryColour { get; set; } = null!;
    public string[] Managers { get; set; } = null!;
    public string[]? Players { get; set; }
    public string[]? PersonalTrainers { get; set; }
}