import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class AppGlobals {
	public static ADMINISTRATORS = ['Ani', 'Tony', 'Vedi', 'Zdravka'];

	public static loggedUserSubject = new BehaviorSubject<string>(null);

	public static getLoggedUser(): string {
		return this.loggedUserSubject.value;
	}

	public static setLoggedUser(user: string): void {
		this.loggedUserSubject.next(user.toLowerCase());
	}

	public static isLoggedUserAdmin(): boolean {
		return this.ADMINISTRATORS.map(x => x.toLowerCase()).indexOf(this.getLoggedUser()) > -1;
	}
}
