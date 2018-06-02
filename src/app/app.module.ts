import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CookieModule } from 'ngx-cookie';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

@NgModule({
	imports: [
		BrowserModule,
		HttpClientModule,
		CoreModule,
		CookieModule.forRoot(),
		BsDropdownModule.forRoot(),
		SweetAlert2Module.forRoot({
			buttonsStyling: false,
			customClass: 'modal-content',
			confirmButtonClass: 'btn btn-primary',
			cancelButtonClass: 'btn'
		}),
		AppRoutingModule
	],
	declarations: [
		AppComponent
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
