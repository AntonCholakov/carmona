import { Injectable } from '@angular/core';
import { HttpInterceptor } from '../../../core/http/http.interceptor';
import { RequestOptions } from '../../../core/interfaces/request-options.interface';
import { CrudService } from '../../../core/services/crud.service';
import { Category } from '../models/category.model';

@Injectable()
export class CategoriesService extends CrudService<Category, RequestOptions<Category>> {

	constructor(http: HttpInterceptor) {
		super(http, '/categories');
	}
}
