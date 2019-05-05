import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectsComponent } from './components/projects.component';
import { EditComponent } from './components/edit/edit.component';
import { CreateComponent } from './components/create/create.component';
import { NeedAuthGuard } from 'src/app/shared/guards/need-auth-guard';

const routes: Routes = [
  { path: '',  component: ProjectsComponent, canActivate: [NeedAuthGuard] },
  { path: 'create',  component: CreateComponent, canActivate: [NeedAuthGuard]},
  { path: 'edit/:id',  component: EditComponent, canActivate: [NeedAuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
