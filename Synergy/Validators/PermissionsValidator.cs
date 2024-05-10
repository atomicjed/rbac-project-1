using FluentValidation;
using Synergy.Models;

namespace Synergy.Validators;

public class PermissionsValidator : AbstractValidator<Permissions>
{
    public PermissionsValidator()
    {
        RuleFor(input => input.PermissionName).NotEmpty().NotNull().Must(text => !text.Contains('$') && !text.Contains('.'))
            .WithMessage("Permission name must not contain harmful characters!");
        RuleFor(input => input.Description).NotEmpty().NotNull().Must(text => text?.Contains('$') != true && text?.Contains('.') != true)
            .WithMessage("Permission description must not contain harmful characters!");
        RuleFor(input => input.Id).Must(text => text?.Contains('$') != true && text?.Contains('.') != true)
            .WithMessage("Guid ID must not contain harmful characters!");
        RuleFor(input => input.Roles).NotEmpty().NotNull()
            .Must(roles => roles.All(role => !role.Contains('$') && !role.Contains('.')));
    }
}