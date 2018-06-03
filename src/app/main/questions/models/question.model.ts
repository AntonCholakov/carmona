import { BaseModel } from '../../../core/models/base.model';
import { Category } from '../../categories/models/category.model';
import { Answer } from './answer.model';

export class Question extends BaseModel {
	text: string;
	categoryId: number;
	questionType: string;
	answers: Answer[];
	correctAnswerId: number;

	category: Category;

	constructor() {
		super();
	}
}
