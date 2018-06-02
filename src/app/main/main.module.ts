import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedModule } from '../shared/shared.module';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryEditModalComponent } from './categories/modals/category-edit-modal/category-edit-modal.component';
import { CategoriesService } from './categories/services/categories.service';
import { MainFooterComponent } from './layout/main-footer/main-footer.component';
import { MainHeaderComponent } from './layout/main-header/main-header.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { MainSidebarComponent } from './layout/main-sidebar/main-sidebar.component';
import { MainRoutingModule } from './main-routing.module';

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		NgxDatatableModule,
		ModalModule.forRoot(),
		SweetAlert2Module,
		BsDropdownModule,
		SharedModule,
		MainRoutingModule
	],
	declarations: [
		MainLayoutComponent,
		MainHeaderComponent,
		MainFooterComponent,
		MainSidebarComponent,
		CategoriesComponent,
		CategoryEditModalComponent
	],
	entryComponents: [
		CategoryEditModalComponent
	],
	providers: [
		CategoriesService
	]
})
export class MainModule {
}
