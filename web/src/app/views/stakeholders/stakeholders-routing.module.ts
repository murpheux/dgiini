import { EditComponent } from './components/edit/edit.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StakeholdersComponent } from './components/stakeholders.component';
import { CreateComponent } from './components/create/create.component';
import { NeedAuthGuard } from 'src/app/shared/guards/need-auth-guard';

const routes: Routes = [
  { path: '',  component: StakeholdersComponent, canActivate: [NeedAuthGuard] },
  { path: 'create',  component: CreateComponent, canActivate: [NeedAuthGuard] },
  { path: 'edit/:id',  component: EditComponent, canActivate: [NeedAuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StakeholdersRoutingModule { }
