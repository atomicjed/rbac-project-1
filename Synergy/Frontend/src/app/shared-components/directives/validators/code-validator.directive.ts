import {Directive, forwardRef} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn} from "@angular/forms";

export const codeValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const invalid = /[<>]/.test(control.value);
  return invalid ? {codeTag: true} : null;
}

@Directive({
  selector: '[appCodeValidator][formControlName],[appCodeValidator][formControl]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CodeValidatorDirective),
      multi: true
    }
  ]
})
export class CodeValidatorDirective implements Validator{
  validate(control: AbstractControl): ValidationErrors | null {
    return codeValidator(control);
  }
}
