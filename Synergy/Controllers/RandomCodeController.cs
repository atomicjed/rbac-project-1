using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Synergy.Authorization;
using Synergy.Models;
using Synergy.Services;
using Permissions = Synergy.Authorization.Permissions;

namespace Synergy.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class RandomCodeController : ControllerBase
{
    private readonly RandomCodeService _randomCodeService;

    public RandomCodeController(RandomCodeService randomCodeService)
    {
        _randomCodeService = randomCodeService;
    }

    [HttpPost("generate-code")]
    [Authorize]
    [AuthorizePermission(Permissions.CanRegisterTeam)]
    public async Task<IActionResult> GenerateCode([FromBody] TeamId body)
    {
        var teamId = body.Id;
        try
        {
            var randomCode = await _randomCodeService.GenerateRandomCodeInvite(teamId);
            return Ok(randomCode);
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Internal Server error when generating random code");
        }
    }

    [HttpPost("validate-invitation-code")]
    public async Task<IActionResult> ValidateCode([FromBody] RandomCodes body)
    {
        try
        {
            var codeIsValid = await _randomCodeService.ValidateInviteCode(body);
            return Ok(codeIsValid);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal Server Error when validating invitation code: {ex.Message}");
        }
    }

    [HttpDelete("delete-invite-code")]
    public async Task<IActionResult> DeleteCode([FromBody] DeleteInviteCodeBody body)
    {
        var inviteCode = body.InviteCode;
        try
        {
            await _randomCodeService.DeleteInviteCode(inviteCode);
            return Ok();
        }
        catch
        {
            return StatusCode(500, "Internal Server Error when deleting invite code");
        }
    }

    public record TeamId
    {
        public string Id { get; set; } = null!;
    }

    public record DeleteInviteCodeBody
    {
        public string InviteCode { get; set; } = null!;
    }
}