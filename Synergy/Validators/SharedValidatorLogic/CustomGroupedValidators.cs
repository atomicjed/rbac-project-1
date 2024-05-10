using System.Linq.Expressions;
using FluentValidation;

namespace Synergy.Validators.SharedValidatorLogic;

public class CustomGroupedValidators<T> : AbstractValidator<T>
{
    protected void ValidateNullEmptyAndHarmfulCharacters(Expression<Func<T, string>> propertySelector,
        string errorMessage)
    {
        RuleFor(propertySelector).NotEmpty().NotNull().Must(text => !text.ContainsHarmfulCharacters())
            .WithMessage(errorMessage);
    }

    protected void ValidateArrayForHarmfulCharacters(Expression<Func<T, string[]>> arraySelector,
        string errorMessage)
    {
        RuleFor(arraySelector)
            .NotEmpty()
            .NotNull()
            .Must(array => !array.ArrayContainsHarmfulCharacters())
            .WithMessage(errorMessage);
    }
}