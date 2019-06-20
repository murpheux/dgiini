import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { AuthGuard } from 'src/app/shared/guards/auth-guard';
import { TaskCreateComponent } from './components/task-create/task-create.component';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { TaskBrowseComponent } from './components/task-browse/task-browse.component';

const routes: Routes = [
    { path: '', component: TaskListComponent, canActivate: [AuthGuard] },
    { path: 'new', component: TaskCreateComponent, canActivate: [AuthGuard] },
    { path: 'browse', component: TaskBrowseComponent, canActivate: [AuthGuard] },
    { path: ':id', component: TaskDetailsComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
