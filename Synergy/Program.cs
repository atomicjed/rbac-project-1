using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Synergy.Configurations;
using Synergy.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowDevOrigin",
        build =>
        {
            build.WithOrigins("http://localhost:4200")
                .AllowAnyMethod()
                .AllowAnyHeader();
        });
    options.AddPolicy("AllowProductionOrigin",
        build =>
        {
            build.WithOrigins("https://synergy")
                .AllowAnyMethod()
                .AllowAnyHeader();
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


builder.Services.Configure<DatabaseSettings>(builder.Configuration.GetSection("MongoDatabase"));
builder.Services.AddScoped<UsersService>();
builder.Services.AddScoped<EncryptionService>();
builder.Services.AddScoped<PermissionsService>();
builder.Services.AddScoped<RolesService>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddControllers();

var app = builder.Build();

app.UseCors("AllowProductionOrigin");
app.UseAuthentication();
app.UseAuthorization();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors("AllowDevOrigin");
    app.MapControllers().RequireCors("AllowDevOrigin");
}

app.UseHttpsRedirection();


app.Run();