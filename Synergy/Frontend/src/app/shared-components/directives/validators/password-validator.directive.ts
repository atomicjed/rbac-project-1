import {Directive, forwardRef} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn} from "@angular/forms";

export const passwordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const valid = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[ -~]{12,128}$/
      .test(control.value);
    return valid ? null : { invalidPassword: true };
}

@Directive({
  selector: '[appPasswordValidator][formControlName],[appPasswordValidator][formControl]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PasswordValidatorDirective),
      multi: true
    }
  ]
})
export class PasswordValidatorDirective implements Validator{
  validate(control: AbstractControl): ValidationErrors | null {
    return passwordValidator(control);
  }
}
