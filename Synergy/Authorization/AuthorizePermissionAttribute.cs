using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Synergy.Services;

namespace Synergy.Authorization;

public static class Permissions
{
    public const string CanRegisterTeam = "can-register-team";
    public const string CanAssignTrainer = "can-assign-trainer";
    public const string CanCreatePlan = "can-create-plan";
    public const string CanJoinTeam = "can-join-team";
    public const string CanTrackHabits = "can-track-habits";
    public const string CanAddDetail = "can-add-detail";

}

[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = true)]
public class AuthorizePermissionAttribute : Attribute, IAuthorizationFilter
{
    private readonly string _permissionName;
    
    public AuthorizePermissionAttribute(string permissionName)
    {
        _permissionName = permissionName;
    }

    public void OnAuthorization(AuthorizationFilterContext context)
    {
        var usersService = context.HttpContext.RequestServices.GetService<UsersService>();
        if (usersService == null)
        {
            throw new InvalidOperationException("PermissionsService not registered");
        }
        var userIdClaim = context.HttpContext.User.FindFirst("user_id");
        if (userIdClaim != null)
        {
            var userId = userIdClaim.Value;
            var user = usersService.GetUserInfo(userId).GetAwaiter().GetResult();
            if (!user.Permissions.Contains(_permissionName))
            {
                context.Result = new ForbidResult();
            }
        }
    }
}