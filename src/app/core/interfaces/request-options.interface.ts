import { BaseModel } from '../models/base.model';

export interface RequestOptions<T extends BaseModel> {
	id?: number;
	data?: T;
	search?: {
		field?: string;
		value?: string;
	};
	page?: number;
	limit?: number;
	sort?: {
		field?: string;
		order?: string;
	};
	expand?: string[];
	embed?: string[];
	getParams?: { [prop: string]: any };
}
