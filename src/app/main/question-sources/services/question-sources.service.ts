import { Injectable } from '@angular/core';
import { HttpInterceptor } from '../../../core/http/http.interceptor';
import { RequestOptions } from '../../../core/interfaces/request-options.interface';
import { CrudService } from '../../../core/services/crud.service';
import { QuestionSource } from '../models/question-source.model';

@Injectable()
export class QuestionSourcesService extends CrudService<QuestionSource, RequestOptions<QuestionSource>> {

	constructor(http: HttpInterceptor) {
		super(http, '/questionSources');
	}
}
