import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
	selector: 'app-main-layout',
	templateUrl: './main-layout.component.html',
	styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

	@HostBinding('class') classes = 'app header-fixed sidebar-fixed aside-menu-fixed aside-menu-hidden';

	constructor() {
	}

	ngOnInit() {
	}

}
