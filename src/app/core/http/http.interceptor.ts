import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HttpInterceptor {

	constructor(private httpClient: HttpClient) {
	}

	public get(url: string, headers: string[]): Observable<HttpResponse<any>> {
		const httpHeaders = this.getHttpHeaders(headers);

		return this.httpClient.get(url, {
			headers: httpHeaders,
			observe: 'response'
		}).catch((error) => {
			this.handleError(error);
			return Observable.throw(error);
		});
	}

	public post(url: string, body: any, headers: string[]): Observable<HttpResponse<any>> {
		const httpHeaders = this.getHttpHeaders(headers);

		return this.httpClient.post(url, body, {
			headers: httpHeaders,
			observe: 'response'
		}).catch((error) => {
			this.handleError(error);
			return Observable.throw(error);
		});
	}

	public put(url: string, body: any, headers: string[]): Observable<HttpResponse<any>> {
		const httpHeaders = this.getHttpHeaders(headers);

		return this.httpClient.put(url, body, {
			headers: httpHeaders,
			observe: 'response'
		}).catch((error) => {
			this.handleError(error);
			return Observable.throw(error);
		});
	}

	public patch(url: string, body: any, headers: string[]): Observable<HttpResponse<any>> {
		const httpHeaders = this.getHttpHeaders(headers);

		return this.httpClient.patch(url, body, {
			headers: httpHeaders,
			observe: 'response'
		}).catch((error) => {
			this.handleError(error);
			return Observable.throw(error);
		});
	}

	public delete(url: string, headers: string[]): Observable<HttpResponse<any>> {
		const httpHeaders = this.getHttpHeaders(headers);

		return this.httpClient.delete(url, {
			headers: httpHeaders,
			observe: 'response'
		}).catch((error) => {
			this.handleError(error);
			return Observable.throw(error);
		});
	}

	private handleError(error: HttpResponse<any>): void {
		console.log(error);
	}

	/**
	 * Get Http Headers depending on headers requested from HTTP calls
	 * @param {string[]} headers
	 * @returns {HttpHeaders}
	 */
	private getHttpHeaders(headers: string[]): HttpHeaders {
		return new HttpHeaders();
	}
}
