using FluentValidation;

namespace Synergy.Validators.CustomValidators;

public static class CustomValidators
{
    public static IRuleBuilderOptions<T, string> MustNotContainHarmfulCharacters<T>(this IRuleBuilder<T, string> ruleBuilder) {
        return ruleBuilder.Must(text => text?.Contains('$') != true && text?.Contains('.') != true).WithMessage("Contains harmful characters");
    }

    public static IRuleBuilderOptions<T, string[]> ArrayMustNotContainHarmfulCharacters<T>(
        this IRuleBuilderOptions<T, string[]> ruleBuilder)
    {
        return ruleBuilder.Must(array => array.All(item => !item.Contains('$') && !item.Contains('.')));
    }
}