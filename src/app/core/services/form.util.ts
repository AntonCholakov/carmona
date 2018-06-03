import { FormArray, FormGroup } from '@angular/forms';

export class FormUtil {

	getTouchedData(formGroup: FormGroup): any {
		const data = {};

		for (const key in formGroup.controls) {
			if (formGroup.controls.hasOwnProperty(key)) {
				const control = formGroup.controls[key];
				if (control.touched || control instanceof FormArray) { // TODO Check for changes in FormArray
					data[key] = control.value;
				}
			}
		}

		return data;
	}

	prepareData(formGroup: FormGroup): any {
		const data = this.getTouchedData(formGroup);
		data.id = formGroup.value.id;

		return data;
	}
}
