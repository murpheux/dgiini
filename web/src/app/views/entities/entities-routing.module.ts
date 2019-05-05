import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './components/create/create.component';
import { EntitiesComponent } from './components/entities.component';
import { NeedAuthGuard } from 'src/app/shared/guards/need-auth-guard';

const routes: Routes = [
  { path: '',  component: EntitiesComponent, canActivate: [NeedAuthGuard] },
  { path: 'entities',  component: EntitiesComponent, canActivate: [NeedAuthGuard] },
  { path: 'create',  component: CreateComponent, canActivate: [NeedAuthGuard] },
  { path: 'create/:id',  component: CreateComponent, canActivate: [NeedAuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntitiesRoutingModule { }
