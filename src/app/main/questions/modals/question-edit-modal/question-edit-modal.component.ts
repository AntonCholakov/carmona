import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import * as QuillNamespace from 'quill';
import ImageResize from 'quill-image-resize-module';
import { FormUtil } from '../../../../core/services/form.util';
import { Category } from '../../../categories/models/category.model';
import { CategoriesService } from '../../../categories/services/categories.service';
import { QuestionSource } from '../../../question-sources/models/question-source.model';
import { QuestionSourcesService } from '../../../question-sources/services/question-sources.service';
import { Answer } from '../../models/answer.model';
import { Question } from '../../models/question.model';
import { QuestionsService } from '../../services/questions.service';

const Quill: any = QuillNamespace;
Quill.register('modules/imageResize', ImageResize);

@Component({
	selector: 'app-question-edit-modal',
	templateUrl: './question-edit-modal.component.html',
	styleUrls: ['./question-edit-modal.component.scss']
})
export class QuestionEditModalComponent implements OnInit {

	@Output() onQuestionSavedEmitter = new EventEmitter<Question>();

	question: Question;

	categories: Category[];
	questionSources: QuestionSource[];

	formGroup: FormGroup;

	quillModules: any;

	constructor(private questionsService: QuestionsService,
				private categoriesService: CategoriesService,
				private questionSourcesService: QuestionSourcesService,
				private formUtil: FormUtil,
				private bsModalService: BsModalService,
				public bsModalRef: BsModalRef,
				private fb: FormBuilder) {
		this.quillModules = this.getQuillModules();
		this.buildForm();
	}

	ngOnInit(): void {
		this.categoriesService.getAll({}).subscribe((response) => {
			this.categories = response.body;
		});
		this.questionSourcesService.getAll({}).subscribe((response) => {
			this.questionSources = response.body;
		});

		this.buildForm(this.question);
	}

	onSubmit(): void {
		if (this.formGroup.value.questionType === 'open') {
			this.formGroup.removeControl('answers');
		}

		const data = this.formUtil.prepareData(this.formGroup);

		const answers: Answer[] = data.answers;
		if (answers && answers.length) {
			// If correct answer is removed, remove it as question property as well
			if (answers.map(a => a.id).indexOf(this.question.correctAnswerId) === -1) {
				data['correctAnswerId'] = null;
			}

			for (let i = 0; i < answers.length; i++) {
				answers[i].id = i + 1;
			}
		}

		this.questionsService.save({
			data: data
		}).subscribe((response) => {
			this.question = response.body;
			this.onQuestionSavedEmitter.emit(this.question);
			this.bsModalRef.hide();
		});
	}

	onAddAnswerControl(): void {
		(<FormArray>this.formGroup.get('answers')).push(this.getEmptyAnswerControl());
	}

	onRemoveAnswerControl(index): void {
		(<FormArray>this.formGroup.get('answers')).removeAt(index);
	}

	private buildForm(question?: Question): void {
		if (!question) {
			question = new Question();
		}

		this.formGroup = this.fb.group({
			id: question.id,
			text: [question.text, Validators.required],
			plainText: [question.plainText, Validators.required],
			categoryId: [question.categoryId, Validators.required],
			questionSourceId: [question.questionSourceId, Validators.required],
			questionType: [question.questionType, Validators.required],
			correctAnswerId: question.correctAnswerId,
			answers: this.getAnswersFormArray(question)
		});
	}

	private getAnswersFormArray(question: Question): FormArray {
		const answers = this.fb.array([]);

		if (!question.answers || !question.answers.length) {
			answers.push(this.getEmptyAnswerControl());
			return answers;
		}

		for (let i = 0; i < question.answers.length; i++) {
			answers.push(this.fb.group({
				id: question.answers[i].id,
				text: question.answers[i].text
			}));
		}

		return answers;
	}

	private getEmptyAnswerControl(): FormGroup {
		return this.fb.group({
			id: '',
			text: ''
		});
	}

	private getQuillModules(): any {
		return {
			toolbar: [
				['bold', 'italic', 'underline', 'strike'],
				['code-block'],
				[{'list': 'ordered'}, {'list': 'bullet'}],
				[{'color': []}, {'background': []}],
				[{'font': []}],
				['image']
			],
			imageResize: {
				modules: ['Resize', 'DisplaySize']
			}
		};
	}

}
