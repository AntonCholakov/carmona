import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'app-field-error-message',
	templateUrl: './field-error-message.component.html',
	styleUrls: ['./field-error-message.component.scss']
})
export class FieldErrorMessageComponent {

	@Input() control: FormControl;

	constructor() {
	}

	get errorMessage() {
		if (this.control && this.control.errors) {
			for (const propertyName in this.control.errors) {
				if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
					if (this.control.errors.required) {
						return 'This field is required.';
					}
					if (this.control.errors.invalidEmailAddress) {
						return 'Please enter a valid email.';
					}
				}
			}
		}

		return null;
	}

}
