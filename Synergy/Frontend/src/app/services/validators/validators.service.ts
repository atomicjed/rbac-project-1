import { Injectable } from '@angular/core';
import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function xssValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const invalid = /<script.*?>|<\/script.*?>|{|}|;|(\$|\$where|db\.|db\..*\.|\$\$.*\$|\\)|\.\.\/|\/\.\.|\/\/|\|/gi.test(control.value);
    return invalid ? { xss: true } : null;
  };
}

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

  codeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const invalid = /[<>]/.test(control.value);
      return invalid ? {codeTag: true} : null;
    }
  }
}
