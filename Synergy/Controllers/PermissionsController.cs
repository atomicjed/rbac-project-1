using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Synergy.Models;
using Synergy.Services;

namespace Synergy.Controllers;

[ApiController]
[Route("/api/[controller]")]
[Authorize]
public class PermissionsController : ControllerBase
{
    private readonly PermissionsService _permissionsService;

    public PermissionsController(PermissionsService permissionsService)
    {
        _permissionsService = permissionsService;
    }

    [HttpPost("add-permission")]
    public async Task<IActionResult> AddPermission([FromBody] Permissions permission)
    {
        try
        {
            await _permissionsService.AddPermission(permission);
            return Ok();
        }
        catch
        {
            return StatusCode(500, "Internal server error when adding permission");
        }
    }

    [HttpPost("get-user-permissions")]
    public async Task<IActionResult> GetPermission([FromBody] UserIdBody body)
    {
        try
        {
            var userId = body.UserId;
            var permissions = await _permissionsService.GetUserPermissions(userId);
            return Ok(permissions);
        }
        catch
        {
            return StatusCode(500, "Internal server error when getting permission");
        }
    }

    public record UserIdBody
    {
        public string UserId { get; set; } = null!;
    }
}