import { BaseModel } from '../../../core/models/base.model';
import { Category } from '../../categories/models/category.model';
import { QuestionSource } from '../../question-sources/models/question-source.model';
import { Answer } from './answer.model';

export class Question extends BaseModel {
	text: string;
	plainText: string;
	categoryId: number;
	questionSourceId: number;
	questionType: string;
	answers: Answer[];
	correctAnswerId: number;
	correctAnswer: string;
	correctAnswerTrimmed: string;

	category: Category;
	questionSource: QuestionSource;

	constructor() {
		super();
	}
}
