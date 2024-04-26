using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Synergy.Models;
using Synergy.Services;

namespace Synergy.Controllers;

[ApiController]
[Route("/api/[controller]")]
[Authorize]
public class UsersController : ControllerBase
{
    private readonly UsersService _usersService;

    public UsersController(UsersService usersService)
    {
        _usersService = usersService;
    }
    
    [HttpPost("add-user")]
    public async Task<IActionResult> AddUser([FromBody] Users newUser)
    {
        try
        {
            var permissions = await _usersService.AddUser(newUser);
            return Ok(permissions);
        }
        catch 
        {
            return StatusCode(500, $"Internal server error when adding user");
        }
    }

    [HttpPost("get-user")]
    public async Task<IActionResult> GetUser([FromBody] string userId)
    {
        try
        {
            var user = await _usersService.GetUser(userId);
            return Ok(user);
        }
        catch
        {
            return StatusCode(500, "Error getting user");
        }
    }
}