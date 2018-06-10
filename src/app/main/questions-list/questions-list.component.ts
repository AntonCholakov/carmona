import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CollectionUtil } from '../../core/services/collection.util';
import { Category } from '../categories/models/category.model';
import { CategoriesService } from '../categories/services/categories.service';
import { QuestionSource } from '../question-sources/models/question-source.model';
import { QuestionSourcesService } from '../question-sources/services/question-sources.service';
import { Question } from '../questions/models/question.model';
import { QuestionsService } from '../questions/services/questions.service';

@Component({
	selector: 'app-questions-list',
	templateUrl: './questions-list.component.html',
	styleUrls: ['./questions-list.component.scss']
})
export class QuestionsListComponent implements OnInit {

	categories: Category[];
	sources: QuestionSource[];
	questions: Question[];

	formGroup: FormGroup;

	constructor(private questionsService: QuestionsService,
				private categoriesService: CategoriesService,
				private questionSourcesService: QuestionSourcesService,
				private fb: FormBuilder,
				private renderer: Renderer2) {
		this.buildForm();
	}

	ngOnInit(): void {
		this.categoriesService.getAll({}).subscribe((response) => {
			this.categories = response.body;

			if (this.categories && this.categories.length) {
				this.formGroup.patchValue({
					categoryId: this.categories[0].id
				});

				this.get();
			}
		});

		this.questionSourcesService.getAll({}).subscribe((response) => {
			this.sources = response.body;
		});
	}

	onAnswerSelect(question: Question, answerId: number, answerInput: ElementRef) {
		if (question.correctAnswerId === answerId) {
			this.renderer.addClass(answerInput, 'text-success');
		} else {
			this.renderer.addClass(answerInput, 'text-danger');
		}
	}

	onOpenAnswerKeyUp(question: Question, input: HTMLTextAreaElement): void {
		const value = input.value.replace(/\s/g, '');
		if (question.correctAnswerTrimmed === value) {
			this.renderer.removeClass(input, 'text-danger');
			this.renderer.addClass(input, 'text-success');
		} else {
			this.renderer.removeClass(input, 'text-success');
			this.renderer.addClass(input, 'text-danger');
		}
	}

	private get(): void {
		const categoryId = this.formGroup.value.categoryId;
		const sourceId = this.formGroup.value.sourceId;

		this.questionsService.getAll({
			getParams: {
				...categoryId && {
					categoryId: categoryId
				},
				...sourceId && {
					questionSourceId: sourceId
				}
			}
		}).subscribe((response) => {
			let questions = response.body;

			if (this.formGroup.value.shuffleAnswers) {
				questions.forEach(q => {
					if (q.questionType === 'radio') {
						q.answers = CollectionUtil.shuffle(q.answers);
					}
				});
			}

			if (this.formGroup.value.shuffleQuestions) {
				questions = CollectionUtil.shuffle(questions);
			}

			this.questions = questions;
		});
	}

	private buildForm(): void {
		this.formGroup = this.fb.group({
			categoryId: '',
			sourceId: '',
			shuffleQuestions: false,
			shuffleAnswers: true
		});
	}

}
