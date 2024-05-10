using FluentValidation;
using Synergy.Features.UserInviteCodes.UserInviteCodeControllers;
using Synergy.Models;
using Synergy.Validators.CustomValidators;
using Synergy.Validators.SharedValidatorLogic;

namespace Synergy.Validators.UserInviteCodeValidators;

public class UserInviteCodeValidator : CustomGroupedValidators<UserInviteCodes>
{
    public UserInviteCodeValidator()
    {
        RuleFor(x => x.Id).MustNotContainHarmfulCharacters();
        RuleFor(x => x.RandomCode).MustNotContainHarmfulCharacters().NotNull().NotEmpty();
        RuleFor(x => x.TeamId).NotEmpty().NotNull().MustNotContainHarmfulCharacters();
    }
}

public class DeleteInviteCodeInputValidator : AbstractValidator<DeleteInviteCodeInput>
{
    public DeleteInviteCodeInputValidator()
    {
        RuleFor(x => x.InviteCode).NotEmpty().NotNull().Must(text => !text.Contains('$') && !text.Contains('.'));
    }
}