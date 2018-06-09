import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { FormUtil } from '../../../../core/services/form.util';
import { QuestionSource } from '../../models/question-source.model';
import { QuestionSourcesService } from '../../services/question-sources.service';

@Component({
	selector: 'app-question-source-edit-modal',
	templateUrl: './question-source-edit-modal.component.html',
	styleUrls: ['./question-source-edit-modal.component.scss']
})
export class QuestionSourceEditModalComponent implements OnInit {

	@Output() onReloadEmitter = new EventEmitter<QuestionSource>();

	questionSource: QuestionSource;

	formGroup: FormGroup;

	constructor(private questionSourcesService: QuestionSourcesService,
				private formUtil: FormUtil,
				public bsModalRef: BsModalRef,
				private fb: FormBuilder) {
		this.buildForm();
	}

	ngOnInit(): void {
		this.buildForm(this.questionSource);
	}

	onSubmit(): void {
		const data = this.formUtil.prepareData(this.formGroup);

		this.questionSourcesService.save({
			data: data
		}).subscribe((response) => {
			this.onReloadEmitter.emit(response.body);
			this.bsModalRef.hide();
		});
	}

	private buildForm(questionSource?: QuestionSource): void {
		if (!questionSource) {
			questionSource = new QuestionSource();
		}

		this.formGroup = this.fb.group({
			id: questionSource.id,
			name: [questionSource.name, Validators.required],
			description: [questionSource.description]
		});
	}

}
