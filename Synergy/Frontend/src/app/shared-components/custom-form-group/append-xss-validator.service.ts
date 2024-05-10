import { FormBuilder, FormGroup } from '@angular/forms';
import {xssValidator} from "@app/services/validators/validators.service";

export class AppendFormValidators {
  static appendXssValidatorToControls(form: FormGroup): void {
    Object.keys(form.controls).forEach(controlName => {
      const control = form.get(controlName);
      if (control) {
        const validators = control.validator ? [control.validator, xssValidator()] : xssValidator();
        control.setValidators(validators);
        control.updateValueAndValidity();
      }
    });
  }
}
