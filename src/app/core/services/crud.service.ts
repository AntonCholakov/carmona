import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpInterceptor } from '../http/http.interceptor';
import { RequestOptions } from '../interfaces/request-options.interface';
import { BaseModel } from '../models/base.model';
import { BaseService } from './base.service';

export abstract class CrudService<T extends BaseModel, O extends RequestOptions<T>> extends BaseService<T, O> {

	constructor(private http: HttpInterceptor,
				collection: string) {
		super(collection);
	}

	public getAll(options: O): Observable<HttpResponse<T[]>> {
		return this.http.get(this.buildUrl(options), []);
	}

	public getById(options: O): Observable<HttpResponse<T>> {
		return this.http.get(this.buildUrl(options), []);
	}

	public post(options: O): Observable<HttpResponse<T>> {
		return this.http.post(this.buildUrl(options), options.data, []);
	}

	public put(options: O): Observable<HttpResponse<T>> {
		return this.http.put(this.buildUrl(options), options.data, []);
	}

	public patch(options: O): Observable<HttpResponse<T>> {
		return this.http.patch(this.buildUrl(options), options.data, []);
	}

	public delete(options: O): Observable<HttpResponse<T>> {
		return this.http.delete(this.buildUrl(options), []);
	}

	public save(options: O): Observable<HttpResponse<T>> {
		if (options.data.id) {
			return this.patch(options);
		} else {
			return this.post(options);
		}
	}
}
