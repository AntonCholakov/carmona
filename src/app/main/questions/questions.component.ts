import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Subscription } from 'rxjs/Subscription';
import swal from 'sweetalert2';
import { PagerInformationInterface } from '../../core/interfaces/pager-information.interface';
import { QuestionCorrectAnswersModalComponent } from './modals/question-correct-answers-modal/question-correct-answers-modal.component';
import { QuestionEditModalComponent } from './modals/question-edit-modal/question-edit-modal.component';
import { Question } from './models/question.model';
import { QuestionsService } from './services/questions.service';

@Component({
	selector: 'app-questions',
	templateUrl: './questions.component.html',
	styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit, OnDestroy {

	manage: boolean;

	questions: Question[];
	pager: PagerInformationInterface;

	pageNumber: number;
	itemsPerPage: number;

	sortField: string;
	sortOrder: string;

	searchFormGroup: FormGroup;
	searchField: string;
	searchValue: string;

	questionEditBsModalRef: BsModalRef;
	questionCorrectAnswersBsModalRef: BsModalRef;

	onQuestionSavedSubscription: Subscription;
	onQuestionCorrectAnswersSubscription: Subscription;

	constructor(private questionsService: QuestionsService,
				private bsModalService: BsModalService,
				private route: ActivatedRoute,
				private fb: FormBuilder) {
		this.pager = {
			totalItemsCount: 0
		};

		this.pageNumber = 0;
		this.itemsPerPage = 10;

		this.sortField = 'created';
		this.sortOrder = 'desc';

		this.searchField = 'name';
		this.searchFormGroup = this.fb.group({
			search: ''
		});

		this.manage = this.route.snapshot.data.manage;
	}

	ngOnInit(): void {
		this.get();
	}

	ngOnDestroy(): void {
		if (this.onQuestionSavedSubscription) {
			this.onQuestionSavedSubscription.unsubscribe();
		}

		if (this.onQuestionCorrectAnswersSubscription) {
			this.onQuestionCorrectAnswersSubscription.unsubscribe();
		}
	}

	onEditClick(question?: Question): void {
		if (!question) {
			question = new Question();
		}

		this.questionEditBsModalRef = this.bsModalService.show(QuestionEditModalComponent, {
			initialState: {
				question: question
			}
		});

		this.onQuestionSavedSubscription = this.questionEditBsModalRef.content.onQuestionSavedEmitter.subscribe((response) => {
			this.pageNumber = 0;
			this.get();

			swal({
				title: 'Success',
				text: 'Question was successfully saved.',
				type: 'success',
				toast: true,
				timer: 3000,
				position: 'top-right'
			});

			this.onMarkAnswersClick(response);

		});
	}

	onMarkAnswersClick(question: Question): void {
		this.questionCorrectAnswersBsModalRef = this.bsModalService.show(QuestionCorrectAnswersModalComponent, {
			initialState: {
				question: question
			}
		});

		this.onQuestionCorrectAnswersSubscription = this.questionCorrectAnswersBsModalRef.content.onSaveSuccessEmitter.subscribe(() => {
			this.pageNumber = 0;
			this.get();

			swal({
				title: 'Success',
				text: 'Answer was successfully marked.',
				type: 'success',
				toast: true,
				timer: 3000,
				position: 'top-right'
			});
		});
	}

	onDeleteClick(question: Question): void {
		swal({
			title: 'Delete Question',
			text: 'Are you sure you want to delete this question?',
			type: 'question',
			showCancelButton: true,
			focusCancel: true,
			preConfirm: () => {
				return this.questionsService.delete({
					id: question.id
				}).subscribe(() => {
					this.pageNumber = 0;
					this.get();

					swal({
						title: 'Success',
						text: 'Question was successfully deleted.',
						type: 'success',
						toast: true,
						timer: 3000,
						position: 'top-right'
					});
				});
			},
			showLoaderOnConfirm: true
		});
	}

	setPage(pageInfo): void {
		this.pageNumber = pageInfo.offset;

		this.get();
	}

	onSort(event): void {
		this.sortField = event.sorts[0].prop;
		this.sortOrder = event.sorts[0].dir;

		this.pageNumber = 0;

		this.get();
	}

	onSearch(): void {
		this.searchValue = this.searchFormGroup.controls.search.value;

		this.pageNumber = 0;

		this.get();
	}

	getRowClass(row: Question): any {
		return {
			'invalid-row': !row.correctAnswerId
		};
	}

	private get(): void {
		this.questionsService.getAll({
			page: this.pageNumber + 1,
			limit: this.itemsPerPage,
			sort: {
				field: this.sortField,
				order: this.sortOrder
			},
			...this.searchValue && {
				search: {
					field: this.searchField,
					value: this.searchValue
				}
			},
			expand: ['category']
		}).subscribe((response) => {
			if (!response.body || !response.body.length) {
				this.questions = [];
				this.pager.totalItemsCount = 0;
			} else {
				this.questions = response.body;
				this.pager.totalItemsCount = +response.headers.get('X-Total-Count');
			}
		});
	}

}
