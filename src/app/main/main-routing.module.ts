import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppGlobals } from '../core/services/app.globals';
import { CategoriesComponent } from './categories/categories.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { QuestionSourcesComponent } from './question-sources/question-sources.component';
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
				component: CategoriesComponent,
				data: {
					manage: AppGlobals.isLoggedUserAdmin()
				}
			},
			{
				path: 'question-sources',
				component: QuestionSourcesComponent,
				data: {
					manage: AppGlobals.isLoggedUserAdmin()
				}
			},
			{
				path: 'questions',
				component: QuestionsComponent,
				data: {
					manage: AppGlobals.isLoggedUserAdmin()
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
