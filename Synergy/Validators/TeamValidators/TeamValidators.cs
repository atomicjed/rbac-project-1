using FluentValidation;
using Synergy.Features.Teams.TeamControllers;
using Synergy.Features.UserInviteCodes.UserInviteCodeControllers;

namespace Synergy.Validators.TeamValidators;

public class RegisterTeamInputValidator : AbstractValidator<RegisterTeamInput>
{
    public RegisterTeamInputValidator()
    {
        RuleFor(input => input.UserId).NotEmpty().NotNull().Must(text => !text.Contains('$') && !text.Contains('.'))
            .WithMessage("User ID must not contain harmful characters!");
        RuleFor(input => input.Team).NotNull();
    }
}

public class AddUserToTeamInputValidator : AbstractValidator<AddUserToTeamInput>
{
    public AddUserToTeamInputValidator()
    {
        RuleFor(input => input.UserId).NotEmpty().NotNull().Must(text => !text.Contains('$') && !text.Contains('.'))
            .WithMessage("User ID must not contain harmful characters!");
        RuleFor(input => input.TeamId).NotNull().NotEmpty().Must(text => !text.Contains('$') && !text.Contains('.'))
            .WithMessage("Team ID must not contain harmful characters!");
        RuleFor(input => input.Role).NotNull().NotEmpty().Matches(@"^[a-zA-Z]+$")
            .WithMessage("Text must only contain letters.");
    }
}

public class TeamIdInputValidator : AbstractValidator<TeamIdInput>
{
    public TeamIdInputValidator()
    {
        RuleFor(input => input.Id).NotNull().NotEmpty().Must(text => !text.Contains('$') && !text.Contains('.'))
            .WithMessage("Team ID must not contain harmful characters!");
    }
}