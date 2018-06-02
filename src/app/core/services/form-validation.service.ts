import { FormControl, FormGroup } from '@angular/forms';

export class FormValidationService {

	static emailValidator(control) {
		// RFC 2822 compliant regex
		if (control && (control.value == null || control.value.length === 0)) {
			return null;
		} else if (control.value && control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
			return null;
		} else {
			return {'invalidEmailAddress': true};
		}
	}

	static validate(formGroup: FormGroup) {
		Object.keys(formGroup.controls).forEach(field => {
			const control = formGroup.get(field);
			if (control instanceof FormControl) {
				control.markAsTouched({onlySelf: true});
			} else if (control instanceof FormGroup) {
				this.validate(control);
			}
		});
	}
}
