import { environment } from '../../../environments/environment';
import { RequestOptions } from '../interfaces/request-options.interface';
import { BaseModel } from '../models/base.model';

export abstract class BaseService<T extends BaseModel, O extends RequestOptions<T>> {

	protected constructor(protected collection: string) {
	}

	buildUrl(options: O): string {
		const getParams: { [prop: string]: any } = options.getParams || {};

		if (options.search) {
			getParams[options.search.field + '_like'] = options.search.value;
		}

		if (options.page) {
			getParams['_page'] = options.page;
		}

		if (options.limit) {
			getParams['_limit'] = options.limit;
		}

		if (options.sort) {
			getParams['_sort'] = options.sort.field;
			getParams['_order'] = options.sort.order || 'asc';
		}

		if (options.expand) {
			getParams['_expand'] = options.expand;
		}

		if (options.embed) {
			getParams['_embed'] = options.embed;
		}

		let url = environment.apiUrl + this.buildUri(options);

		const params = this.buildGetParams(getParams);
		if (params) {
			url += '?' + params;
		}

		return url;

	}

	buildUri(options: O): string {
		let url = this.collection;

		if (options.id) {
			url += '/' + options.id;
		} else if (options.data && options.data.id) {
			url += '/' + options.data.id;
		}

		return url;
	}

	protected buildGetParams(params: any): string {
		let result = '';

		for (const prop in params) {
			if (params.hasOwnProperty(prop)) {
				if (result) {
					result += '&';
				}

				if (Array.isArray(params[prop])) {
					result += encodeURIComponent(prop) + '=' + (<Array<string>>params[prop]).map(x => encodeURIComponent(x)).join(',');
				} else {
					result += encodeURIComponent(prop) + '=' + encodeURIComponent(params[prop]);
				}
			}
		}

		return result;
	}

}
