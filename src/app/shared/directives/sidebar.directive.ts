import { Directive, HostListener } from '@angular/core';

@Directive({
	selector: '[appSidebarMinimizer]'
})
export class SidebarMinimizeDirective {
	constructor() {
	}

	@HostListener('click', ['$event'])
	toggleOpen($event: any) {
		$event.preventDefault();
		document.querySelector('app-main-layout').classList.toggle('sidebar-minimized');
	}
}


@Directive({
	selector: '[appMobileSidebarToggler]'
})
export class MobileSidebarToggleDirective {
	constructor() {
	}

	@HostListener('click', ['$event'])
	toggleOpen($event: any) {
		$event.preventDefault();
		document.querySelector('app-main-layout').classList.toggle('sidebar-mobile-show');
	}
}


export const SIDEBAR_TOGGLE_DIRECTIVES = [
	SidebarMinimizeDirective,
	MobileSidebarToggleDirective
];
