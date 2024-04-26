import {FormBuilder, FormGroup} from '@angular/forms';
import { xssValidator } from "../../services/validators/validators.service";
import {Injectable} from "@angular/core";

@Injectable()
export class CustomFormBuilder extends FormBuilder {
  constructor() {
    super();
  }
  override group(controlsConfig: { [key: string]: any; }, options?: { [key: string]: any; } | null): FormGroup {
    const formGroup = super.group(controlsConfig, options);
    this.appendXssValidatorToControls(formGroup);
    return formGroup;
  }

  private appendXssValidatorToControls(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(controlName => {
      const control = formGroup.get(controlName);
      if (control) {
        const validators = control.validator ? [control.validator, xssValidator()] : xssValidator();
        control.setValidators(validators);
        control.updateValueAndValidity();
      }
    });
  }
}

