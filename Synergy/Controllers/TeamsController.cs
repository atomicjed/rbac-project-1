using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Synergy.Authorization;
using Synergy.Models;
using Synergy.Services;
using Permissions = Synergy.Authorization.Permissions;

namespace Synergy.Controllers;

[ApiController]
[Route("/api/[controller]")]
[Authorize]
public class TeamsController : ControllerBase
{
    private readonly TeamsService _teamsService;
    private readonly UsersService _usersService;

    public TeamsController(TeamsService teamsService, UsersService usersService)
    {
        _teamsService = teamsService;
        _usersService = usersService;
    }

    [AuthorizePermission(Permissions.CanRegisterTeam)]
    [HttpPost("register-team")]
    public async Task<IActionResult> RegisterTeam([FromBody] RegisterTeamBody body)
    {
        var team = body.Team;
        var userId = body.UserId;
        try
        {
            var teamId = await _teamsService.RegisterTeam(team);
            await _usersService.AddTeamIdToUser(userId, teamId);
            return Ok();
        }
        catch
        {
            return StatusCode(500, "Internal server error when registering team");
        }
    }

    [HttpPost("get-user-teams")]
    public async Task<ActionResult<Teams[]>> GetTeams([FromBody] string[] teamIds)
    {
        try
        {
            var teams = await _teamsService.GetTeams(teamIds);
            return teams;
        }
        catch
        {
            return StatusCode(500, "Internal server error when getting teams");
        }
    }

    [HttpPost("add-user-to-team")]
    public async Task<IActionResult> AddUserToTeam([FromBody] AddUserToTeamBody body)
    {
        try
        {
            var addTeamIdToUserBody = await _teamsService.AddUserToTeam(body);
            await _usersService.AddTeamIdToUser(addTeamIdToUserBody.UserId, addTeamIdToUserBody.TeamId);
            return Ok();
        }
        catch
        {
            return StatusCode(500, "Internal server error when adding user");
        }
    }

    public record RegisterTeamBody
    {
        public string UserId { get; set; } = null!;
        public Teams Team { get; set; } = null!;
    }
}