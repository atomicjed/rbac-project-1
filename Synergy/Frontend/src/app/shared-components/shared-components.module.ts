import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HlmButtonDirective} from "@spartan-ng/ui-button-helm";
import {HlmInputDirective} from "@spartan-ng/ui-input-helm";
import {HlmLabelDirective} from "@spartan-ng/ui-label-helm";
import {HlmIconComponent} from "@spartan-ng/ui-icon-helm";
import {
  BrnPopoverComponent,
  BrnPopoverContentDirective,
  BrnPopoverTriggerDirective
} from "@spartan-ng/ui-popover-brain";
import {HlmPopoverContentDirective} from "@spartan-ng/ui-popover-helm";
import {
  HlmCardContentDirective,
  HlmCardDescriptionDirective,
  HlmCardDirective, HlmCardFooterDirective,
  HlmCardHeaderDirective,
  HlmCardModule,
  HlmCardTitleDirective
} from "@spartan-ng/ui-card-helm";
import {BrnMenuTriggerDirective} from "@spartan-ng/ui-menu-brain";
import {
  HlmMenuBarComponent, HlmMenuBarItemDirective,
  HlmMenuComponent, HlmMenuGroupComponent, HlmMenuItemCheckboxDirective, HlmMenuItemCheckComponent,
  HlmMenuItemDirective, HlmMenuItemIconDirective, HlmMenuItemRadioComponent, HlmMenuItemRadioDirective,
  HlmMenuItemSubIndicatorComponent,
  HlmMenuLabelComponent,
  HlmMenuSeparatorComponent,
  HlmMenuShortcutComponent,
  HlmSubMenuComponent
} from "@spartan-ng/ui-menu-helm";
import {DropdownComponent} from "./dropdown/dropdown.component";
import {CodeValidatorDirective} from "./directives/validators/code-validator.directive";
import {EmailValidatorDirective} from "./directives/validators/email-validator.directive";
import {PasswordValidatorDirective} from "./directives/validators/password-validator.directive";
import {XssValidatorDirective} from "./directives/validators/xss-validator.directive";
import { CanRegisterTeamDirective } from './directives/conditional-statements/can-register-team.directive';

@NgModule({
  declarations: [
    DropdownComponent,
    CodeValidatorDirective,
    EmailValidatorDirective,
    PasswordValidatorDirective,
    XssValidatorDirective,
    CanRegisterTeamDirective
  ],
  imports: [
    CommonModule,
    HlmButtonDirective,
    HlmInputDirective,
    HlmLabelDirective,
    HlmIconComponent,
    BrnPopoverComponent,
    BrnPopoverTriggerDirective,
    HlmPopoverContentDirective,
    BrnPopoverContentDirective,
    HlmCardModule,
    BrnPopoverComponent,
    BrnPopoverTriggerDirective,
    BrnPopoverContentDirective,
    HlmPopoverContentDirective,
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmCardDescriptionDirective,
    HlmCardContentDirective,
    HlmCardFooterDirective,
    BrnMenuTriggerDirective,
    HlmMenuComponent,
    HlmMenuBarComponent,
    HlmSubMenuComponent,
    HlmMenuItemDirective,
    HlmMenuItemSubIndicatorComponent,
    HlmMenuLabelComponent,
    HlmMenuShortcutComponent,
    HlmMenuSeparatorComponent,
    HlmMenuItemIconDirective,
    HlmMenuBarItemDirective,
    HlmMenuItemCheckComponent,
    HlmMenuItemRadioComponent,
    HlmMenuGroupComponent,
    HlmButtonDirective,
    HlmMenuItemCheckboxDirective,
    HlmMenuItemRadioDirective,
  ],
  exports: [
    CommonModule,
    HlmButtonDirective,
    HlmInputDirective,
    HlmLabelDirective,
    HlmIconComponent,
    BrnPopoverComponent,
    BrnPopoverTriggerDirective,
    HlmPopoverContentDirective,
    BrnPopoverContentDirective,
    HlmCardModule,
    BrnPopoverComponent,
    BrnPopoverTriggerDirective,
    BrnPopoverContentDirective,
    HlmPopoverContentDirective,
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmCardDescriptionDirective,
    HlmCardContentDirective,
    HlmCardFooterDirective,
    BrnMenuTriggerDirective,
    HlmMenuComponent,
    HlmMenuBarComponent,
    HlmSubMenuComponent,
    HlmMenuItemDirective,
    HlmMenuItemSubIndicatorComponent,
    HlmMenuLabelComponent,
    HlmMenuShortcutComponent,
    HlmMenuSeparatorComponent,
    HlmMenuItemIconDirective,
    HlmMenuBarItemDirective,
    HlmMenuItemCheckComponent,
    HlmMenuItemRadioComponent,
    HlmMenuGroupComponent,
    HlmButtonDirective,
    HlmMenuItemCheckboxDirective,
    HlmMenuItemRadioDirective,
    DropdownComponent,
    CodeValidatorDirective,
    EmailValidatorDirective,
    PasswordValidatorDirective,
    XssValidatorDirective,
    CanRegisterTeamDirective,
  ]
})
export class SharedComponentsModule { }
