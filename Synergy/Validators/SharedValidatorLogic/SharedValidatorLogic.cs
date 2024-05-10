namespace Synergy.Validators.SharedValidatorLogic;

public static class SharedValidatorLogic
{
    public static bool ContainsHarmfulCharacters(this string? text)
    {
        return text?.Contains('$') == true || text?.Contains('.') == true;
    }

    public static bool ArrayContainsHarmfulCharacters(this string[] array)
    {
        return array?.Any(item => item?.Contains('$') == true || item?.Contains('.') == true) == true;
    }
}
