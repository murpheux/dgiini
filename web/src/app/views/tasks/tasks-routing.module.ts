import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { NeedAuthGuard } from 'src/app/shared/guards/need-auth-guard';
import { TaskCreateComponent } from './components/task-create/task-create.component';
import { TaskDetailsComponent } from './components/task-details/task-details.component';

const routes: Routes = [
    { path: '', component: TaskListComponent, canActivate: [NeedAuthGuard] },
    { path: 'new', component: TaskCreateComponent, canActivate: [NeedAuthGuard] },
    { path: ':id', component: TaskDetailsComponent, canActivate: [NeedAuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
