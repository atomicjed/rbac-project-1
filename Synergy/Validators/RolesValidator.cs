using FluentValidation;
using Synergy.Models;
using Synergy.Validators.CustomValidators;

namespace Synergy.Validators;

public class RolesValidator : AbstractValidator<Roles>
{
    public RolesValidator()
    {
        RuleFor(x => x.RoleName).MustNotContainHarmfulCharacters();
        RuleFor(x => x.Id).Must(text => text?.Contains('$') != true && text?.Contains('.') != true)
            .WithMessage("Guid ID must not contain harmful characters!");
        RuleFor(x => x.RoleName).NotEmpty().NotNull().MustNotContainHarmfulCharacters();
        RuleFor(x => x.Permissions).NotEmpty().NotNull().ArrayMustNotContainHarmfulCharacters();
    }
}