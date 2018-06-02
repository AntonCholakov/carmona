import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { FormUtil } from '../../../../core/services/form.util';
import { Category } from '../../models/category.model';
import { CategoriesService } from '../../services/categories.service';

@Component({
	selector: 'app-category-edit-modal',
	templateUrl: './category-edit-modal.component.html',
	styleUrls: ['./category-edit-modal.component.scss']
})
export class CategoryEditModalComponent implements OnInit {

	@Output() onReloadEmitter = new EventEmitter<Category>();

	category: Category;

	formGroup: FormGroup;

	constructor(private categoriesService: CategoriesService,
				private formUtil: FormUtil,
				public bsModalRef: BsModalRef,
				private fb: FormBuilder) {
		this.buildForm();
	}

	ngOnInit(): void {
		this.buildForm(this.category);
	}

	onSubmit(): void {
		const data = this.formUtil.prepareData(this.formGroup);

		this.categoriesService.save({
			data: data
		}).subscribe((response) => {
			this.onReloadEmitter.emit(response.body);
			this.bsModalRef.hide();
		});
	}

	private buildForm(category?: Category): void {
		if (!category) {
			category = new Category();
		}

		this.formGroup = this.fb.group({
			id: category.id,
			name: [category.name, Validators.required],
			description: [category.description]
		});
	}

}
