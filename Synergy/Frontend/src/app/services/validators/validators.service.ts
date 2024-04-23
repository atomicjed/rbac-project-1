import { Injectable } from '@angular/core';
import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor() {
  }

  xssValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const invalid = /<script.*?>|<\/script.*?>/gis.test(control.value);
      return invalid ? {xss: true} : null;
    }
  }

  noSqlInjectionValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const invalid = /[$.]/.test(control.value);
      return invalid ? {noSql: true} : null;
    }
  }

  codeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const invalid = /[<>]/.test(control.value);
      return invalid ? {codeTag: true} : null;
    }
  }
  emailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const valid = /^[\w-]+(\.[\w-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/
        .test(control.value);
      return valid ? null : {emailError: true};
    }
  }
  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const valid = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[ -~]{12,128}$/
        .test(control.value);
      return valid ? null : { invalidPassword: true };
    };
  }
}
