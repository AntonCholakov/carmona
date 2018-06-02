import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldErrorMessageComponent } from './components/field-error-message/field-error-message.component';
import { NAV_DROPDOWN_DIRECTIVES } from './directives/nav-dropdown.directive';
import { SIDEBAR_TOGGLE_DIRECTIVES } from './directives/sidebar.directive';
import { KeysPipe } from './pipes/keys.pipe';

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule
	],
	declarations: [
		SIDEBAR_TOGGLE_DIRECTIVES,
		NAV_DROPDOWN_DIRECTIVES,
		KeysPipe,
		FieldErrorMessageComponent
	],
	exports: [
		SIDEBAR_TOGGLE_DIRECTIVES,
		NAV_DROPDOWN_DIRECTIVES,
		KeysPipe,
		FieldErrorMessageComponent
	]
})
export class SharedModule {
}
