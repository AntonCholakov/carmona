import { Injectable } from '@angular/core';
import { HttpInterceptor } from '../../../core/http/http.interceptor';
import { RequestOptions } from '../../../core/interfaces/request-options.interface';
import { CrudService } from '../../../core/services/crud.service';
import { Question } from '../models/question.model';

@Injectable()
export class QuestionsService extends CrudService<Question, RequestOptions<Question>> {

	constructor(http: HttpInterceptor) {
		super(http, '/questions');
	}
}
