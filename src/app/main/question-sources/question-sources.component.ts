import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Subscription } from 'rxjs/Subscription';
import swal from 'sweetalert2';
import { PagerInformationInterface } from '../../core/interfaces/pager-information.interface';
import { Question } from '../questions/models/question.model';
import { QuestionsService } from '../questions/services/questions.service';
import { QuestionSourceEditModalComponent } from './modals/question-source-edit-modal/question-source-edit-modal.component';
import { QuestionSource } from './models/question-source.model';
import { QuestionSourcesService } from './services/question-sources.service';

@Component({
	selector: 'app-question-sources',
	templateUrl: './question-sources.component.html',
	styleUrls: ['./question-sources.component.scss']
})
export class QuestionSourcesComponent implements OnInit, OnDestroy {

	manage: boolean;

	questionSources: QuestionSource[];
	pager: PagerInformationInterface;

	pageNumber: number;
	itemsPerPage: number;

	sortField: string;
	sortOrder: string;

	searchFormGroup: FormGroup;
	searchField: string;
	searchValue: string;

	bsModalRef: BsModalRef;

	onReloadSubscription: Subscription;

	questions: Question[];

	constructor(private questionSourcesService: QuestionSourcesService,
				private questionsService: QuestionsService,
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
		this.questionsService.getAll({}).subscribe((response) => {
			this.questions = response.body;
		});

		this.get();
	}

	ngOnDestroy(): void {
		if (this.onReloadSubscription) {
			this.onReloadSubscription.unsubscribe();
		}
	}

	onMagicClick(questionSource: QuestionSource): void {
		this.questions.forEach(q => {
			setTimeout(() => {
				this.questionsService.patch(<any>{
					id: q.id,
					data: {
						questionSourceId: questionSource.id
					}
				}).subscribe();
			}, 200);
		});
	}

	onEditClick(questionSource?: QuestionSource): void {
		if (!questionSource) {
			questionSource = new QuestionSource();
		}

		this.bsModalRef = this.bsModalService.show(QuestionSourceEditModalComponent, {
			initialState: {
				questionSource: questionSource
			}
		});

		this.onReloadSubscription = this.bsModalRef.content.onReloadEmitter.subscribe(() => {
			this.pageNumber = 0;
			this.get();

			swal({
				title: 'Success',
				text: 'Question source was successfully saved.',
				type: 'success',
				toast: true,
				timer: 3000,
				position: 'top-right'
			});
		});
	}

	onDeleteClick(questionSource: QuestionSource): void {
		swal({
			title: 'Delete Question source',
			text: 'Are you sure you want to delete this question source?',
			type: 'question',
			showCancelButton: true,
			focusCancel: true,
			preConfirm: () => {
				return this.questionSourcesService.delete({
					id: questionSource.id
				}).subscribe(() => {
					this.pageNumber = 0;
					this.get();

					swal({
						title: 'Success',
						text: 'Question source was successfully deleted.',
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

	private get(): void {
		this.questionSourcesService.getAll({
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
			}
		}).subscribe((response) => {
			if (!response.body || !response.body.length) {
				this.questionSources = [];
				this.pager.totalItemsCount = 0;
			} else {
				this.questionSources = response.body;
				this.pager.totalItemsCount = +response.headers.get('X-Total-Count');
			}
		});
	}

}
