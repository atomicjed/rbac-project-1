using System.Security.Claims;
using Hangfire;
using Hangfire.Mongo;
using Hangfire.Mongo.Migration.Strategies;
using Hangfire.Mongo.Migration.Strategies.Backup;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;
using Synergy.Configurations;
using Synergy.Models;
using Synergy.Services;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowDevOrigin",
        build =>
        {
            build.WithOrigins("http://localhost:4200")
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials();
        });
    options.AddPolicy("AllowProductionOrigin",
        build =>
        {
            build.WithOrigins("https://synergy")
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials();
        }
    );
});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, options =>
    {
        options.Authority = builder.Configuration["Authentication:ValidIssuer"];
        options.Audience = builder.Configuration["Authentication:Audience"];
        options.TokenValidationParameters.ValidIssuer = builder.Configuration["Authentication:ValidIssuer"];
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true
        };
    });

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("RequirePermission", policy =>
    {
        policy.RequireAssertion(async context =>
        {
            var userId = context.User.FindFirstValue("sub");
            return false;
        });
    });
});
var connectionString = "mongodb://localhost:27017";
var databaseName = "Synergy";

var mongoUrlBuilder = new MongoUrlBuilder(connectionString);
var mongoClient = new MongoClient(mongoUrlBuilder.ToMongoUrl());

builder.Services.AddHangfire(configuration => configuration
    .SetDataCompatibilityLevel(CompatibilityLevel.Version_180)
    .UseSimpleAssemblyNameTypeSerializer()
    .UseRecommendedSerializerSettings()
    .UseMongoStorage(mongoClient, databaseName, new MongoStorageOptions
    {
        MigrationOptions = new MongoMigrationOptions
        {
            MigrationStrategy = new MigrateMongoMigrationStrategy(),
            BackupStrategy = new CollectionMongoBackupStrategy()
        },
        CheckQueuedJobsStrategy = CheckQueuedJobsStrategy.TailNotificationsCollection,
        Prefix = "hangfire.mongo",
        CheckConnection = true
    })
);
builder.Services.AddHangfireServer(serverOptions =>
{
    serverOptions.ServerName = "Hangfire.Mongo server 1";
});
builder.Services.Configure<DatabaseSettings>(builder.Configuration.GetSection("MongoDatabase"));
builder.Services.AddScoped<UsersService>();
builder.Services.AddScoped<EncryptionService>();
builder.Services.AddScoped<PermissionsService>();
builder.Services.AddScoped<RolesService>();
builder.Services.AddScoped<TeamsService>();
builder.Services.AddScoped<RandomCodeService>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddControllers();

var app = builder.Build();


app.UseHangfireDashboard();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors("AllowDevOrigin");
    app.MapControllers().RequireCors("AllowDevOrigin");
}

if (!app.Environment.IsDevelopment())
{
    app.UseCors("AllowProductionOrigin");
    app.MapControllers().RequireCors("AllowProductionOrigin");
    app.UseHttpsRedirection();
}

app.UseHangfireDashboard();
app.UseAuthentication();
app.UseAuthorization();


app.Run();