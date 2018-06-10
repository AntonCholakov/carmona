import { Component, OnInit } from '@angular/core';
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
		const name = prompt('Please enter your name');
		AppGlobals.setLoggedUser(name);
	}
}
