using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Synergy.Models;
using Synergy.Services;

namespace Synergy.Controllers;

[ApiController]
[Route("/api/[controller]")]
[Authorize]
public class RolesController : ControllerBase
{
    private readonly RolesService _rolesService;

    public RolesController(RolesService rolesService)
    {
        _rolesService = rolesService;
    }

    [HttpPost("add-role")]
    public async Task<IActionResult> AddRole([FromBody] Roles role)
    {
        try
        {
            await _rolesService.AddRole(role);
            return Ok();
        }
        catch
        {
            return StatusCode(500, "Internal server error when adding role");
        }
    }
    [HttpGet("get-role/{roleName}")]
    public async Task<IActionResult> GetRole(string roleName)
    {
        try
        {
            var role = await _rolesService.GetRole(roleName);
            return Ok(role);
        }
        catch
        {
            return StatusCode(500, "Internal server error when getting role");
        }
    }
}