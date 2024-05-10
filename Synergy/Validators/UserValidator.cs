using FluentValidation;
using Synergy.Features.Users.UserControllers;
using Synergy.Models;
using Synergy.Validators.CustomValidators;
using Synergy.Validators.SharedValidatorLogic;

namespace Synergy.Validators;

public class UserValidator : AbstractValidator<User>
{
    public UserValidator()
    {
        RuleFor(x => x.Id).MustNotContainHarmfulCharacters();
        RuleFor(x => x.Permissions).NotEmpty().NotNull().ArrayMustNotContainHarmfulCharacters();
        RuleFor(x => x.Role).NotEmpty().NotNull().MustNotContainHarmfulCharacters();
        RuleFor(x => x.UserId).NotEmpty().NotNull().MustNotContainHarmfulCharacters();
    }
}

public class UserIdInputValidator : AbstractValidator<UserIdInput>
{
    public UserIdInputValidator()
    {
        RuleFor(x => x.UserId).NotEmpty().NotNull().MustNotContainHarmfulCharacters();
    }
}

public class UserFromBodyInputValidator : AbstractValidator<UserFromBodyInput>
{
    public UserFromBodyInputValidator()
    {
        RuleFor(x => x.UserId).NotEmpty().NotNull().MustNotContainHarmfulCharacters();
        RuleFor(x => x.Role).NotEmpty().NotNull().MustNotContainHarmfulCharacters();
    }
}