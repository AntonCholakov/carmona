import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Subscription } from 'rxjs/Subscription';
import swal from 'sweetalert2';
import { PagerInformationInterface } from '../../core/interfaces/pager-information.interface';
import { CategoryEditModalComponent } from './modals/category-edit-modal/category-edit-modal.component';
import { Category } from './models/category.model';
import { CategoriesService } from './services/categories.service';

@Component({
	selector: 'app-categories',
	templateUrl: './categories.component.html',
	styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, OnDestroy {

	manage: boolean;

	categories: Category[];
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

	constructor(private categoriesService: CategoriesService,
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
		if (this.onReloadSubscription) {
			this.onReloadSubscription.unsubscribe();
		}
	}

	onEditClick(category?: Category): void {
		if (!category) {
			category = new Category();
		}

		this.bsModalRef = this.bsModalService.show(CategoryEditModalComponent, {
			initialState: {
				category: category
			}
		});

		this.onReloadSubscription = this.bsModalRef.content.onReloadEmitter.subscribe(() => {
			this.pageNumber = 0;
			this.get();

			swal({
				title: 'Success',
				text: 'Category was successfully saved.',
				type: 'success',
				toast: true,
				timer: 3000,
				position: 'top-right'
			});
		});
	}

	onDeleteClick(category: Category): void {
		swal({
			title: 'Delete Category',
			text: 'Are you sure you want to delete this category?',
			type: 'question',
			showCancelButton: true,
			focusCancel: true,
			preConfirm: () => {
				return this.categoriesService.delete({
					id: category.id
				}).subscribe(() => {
					this.pageNumber = 0;
					this.get();

					swal({
						title: 'Success',
						text: 'Category was successfully deleted.',
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
		this.categoriesService.getAll({
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
				this.categories = [];
				this.pager.totalItemsCount = 0;
			} else {
				this.categories = response.body;
				this.pager.totalItemsCount = +response.headers.get('X-Total-Count');
			}
		});
	}

}
