import {Directive, forwardRef} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn} from "@angular/forms";

export const xssValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const invalid = /<script.*?>|<\/script.*?>/gis.test(control.value);
  return invalid ? { xss: true } : null;
};

@Directive({
  selector: '[xssValidator][formControlName],[xssValidator][formControl],[xssValidator][ngModel]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => XssValidatorDirective),
      multi: true
    }
  ]
})
export class XssValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return xssValidator(control);
  }
}
