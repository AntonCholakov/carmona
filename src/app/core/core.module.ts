import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpInterceptor } from './http/http.interceptor';
import { FormUtil } from './services/form.util';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [],
	exports: [],
	providers: [
		HttpInterceptor,
		FormUtil
	]
})
export class CoreModule {
}
