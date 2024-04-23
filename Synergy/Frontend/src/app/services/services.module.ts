import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XssValidatorDirective } from './validators/directives/xss-validator.directive';
import { CodeValidatorDirective } from './validators/directives/code-validator.directive';
import { PasswordValidatorDirective } from './validators/directives/password-validator.directive';
import { EmailValidatorDirective } from './validators/directives/email-validator.directive';

@NgModule({
  declarations: [
    XssValidatorDirective,
    CodeValidatorDirective,
    PasswordValidatorDirective,
    EmailValidatorDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    XssValidatorDirective,
    CodeValidatorDirective,
    PasswordValidatorDirective,
    EmailValidatorDirective,
  ]
})
export class ServicesModule { }
