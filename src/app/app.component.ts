import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import { AppGlobals } from './core/services/app.globals';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

	constructor() {
	}

	ngOnInit(): void {
		if (environment.production) {
			const name = prompt('Please enter your name');
			AppGlobals.setLoggedUser(name);
		} else {
			AppGlobals.setLoggedUser('tony');
		}
	}
}
