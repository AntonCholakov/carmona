import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { FormUtil } from '../../../../core/services/form.util';
import { Question } from '../../models/question.model';
import { QuestionsService } from '../../services/questions.service';

@Component({
	selector: 'app-question-correct-answers-modal',
	templateUrl: './question-correct-answers-modal.component.html',
	styleUrls: ['./question-correct-answers-modal.component.scss']
})
export class QuestionCorrectAnswersModalComponent implements OnInit {

	@Output() onSaveSuccessEmitter = new EventEmitter<void>();

	question: Question;

	formGroup: FormGroup;

	constructor(private questionsService: QuestionsService,
				private formUtil: FormUtil,
				public bsModalRef: BsModalRef,
				private fb: FormBuilder) {
		this.buildForm();
	}

	ngOnInit(): void {
		this.buildForm(this.question);
	}

	onSubmit(): void {
		const data = this.formUtil.prepareData(this.formGroup);

		this.questionsService.save({
			id: this.question.id,
			data: data
		}).subscribe(() => {
			this.onSaveSuccessEmitter.emit();
			this.bsModalRef.hide();
		});
	}

	private buildForm(question?: Question): void {
		if (!question) {
			question = new Question();
		}

		this.formGroup = this.fb.group({
			id: question.id,
			correctAnswerId: [question.correctAnswerId, Validators.required]
		});
	}
}
