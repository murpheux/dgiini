import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guards/auth-guard';
import { TaskCreateComponent } from './components/task-create/task-create.component';
import { TaskCategoriesComponent } from './components/task-categories/task-categories.component';
import { TaskUserComponent } from './components/task-user/task-user.component';

const routes: Routes = [
    { path: '', component: TaskCategoriesComponent, canActivate: [] },
    { path: 'new', component: TaskCreateComponent, canActivate: [] },
    { path: 'mytask', component: TaskUserComponent, canActivate: [AuthGuard] },
    { path: ':id', component: TaskCategoriesComponent, canActivate: [] },
    { path: 'category/:category', component: TaskCategoriesComponent, canActivate: [] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
