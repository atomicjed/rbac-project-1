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
    
}