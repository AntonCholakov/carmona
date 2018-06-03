import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { QuestionsListComponent } from './questions-list/questions-list.component';
import { QuestionsComponent } from './questions/questions.component';

const routes: Routes = [
	{
		path: '',
		component: MainLayoutComponent,

		children: [
			{
				path: '',
				redirectTo: 'categories',
				pathMatch: 'full'
			},
			{
				path: 'categories',
				component: CategoriesComponent
			},
			{
				path: 'categories-manage',
				component: CategoriesComponent,
				data: {
					manage: true
				}
			},
			{
				path: 'questions',
				component: QuestionsComponent
			},
			{
				path: 'questions-manage',
				component: QuestionsComponent,
				data: {
					manage: true
				}
			},
			{
				path: 'questions-list',
				component: QuestionsListComponent
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class MainRoutingModule {
}
