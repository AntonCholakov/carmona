import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CollectionUtil } from '../../core/services/collection.util';
import { Category } from '../categories/models/category.model';
import { CategoriesService } from '../categories/services/categories.service';
import { Question } from '../questions/models/question.model';
import { QuestionsService } from '../questions/services/questions.service';

@Component({
	selector: 'app-questions-list',
	templateUrl: './questions-list.component.html',
	styleUrls: ['./questions-list.component.scss']
})
export class QuestionsListComponent implements OnInit {

	categories: Category[];
	questions: Question[];

	formGroup: FormGroup;

	constructor(private questionsService: QuestionsService,
				private categoriesService: CategoriesService,
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

				this.onCriteriaChange();
			}
		});
	}

	onCriteriaChange(): void {
		const categoryId = this.formGroup.value.categoryId;
		this.get(categoryId);
	}

	onAnswerSelect(question: Question, answerId: number, answerInput: ElementRef) {
		if (question.correctAnswerId === answerId) {
			this.renderer.addClass(answerInput, 'text-success');
		} else {
			this.renderer.addClass(answerInput, 'text-danger');
		}
	}

	private get(categoryId?: number): void {
		this.questionsService.getAll({
			getParams: {
				...categoryId && {
					categoryId: categoryId
				}
			}
		}).subscribe((response) => {
			let questions = response.body;

			if (this.formGroup.value.shuffleAnswers) {
				questions.forEach(q => {
					q.answers = CollectionUtil.shuffle(q.answers);
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
			shuffleQuestions: false,
			shuffleAnswers: true
		});
	}

}
