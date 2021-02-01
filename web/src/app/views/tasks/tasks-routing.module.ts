import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskCategoriesComponent } from './components/task-categories/task-categories.component';
import { TaskCreateComponent } from './components/task-create/task-create.component';
import { TaskEditComponent } from './components/task-edit/task-edit.component';
import { TaskUserComponent } from './components/task-user/task-user.component';

const routes: Routes = [
    { path: '', component: TaskCategoriesComponent, canActivate: [] },
    { path: 'new', component: TaskCreateComponent, canActivate: [] },
    { path: 'my', component: TaskUserComponent, canActivate: [] },
    { path: 'edit', component: TaskEditComponent, canActivate: [] },
    { path: 'edit/:id', component: TaskEditComponent, canActivate: [] },
    {
        path: ':category',
        component: TaskCategoriesComponent,
        canActivate: [],
    },
    {
        path: 'id/:taskid',
        component: TaskCategoriesComponent,
        canActivate: [],
    },
    {
        path: 'search/:searchstr',
        component: TaskCategoriesComponent,
        canActivate: [],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TasksRoutingModule {}
