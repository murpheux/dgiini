import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { NeedAuthGuard } from 'src/app/shared/guards/need-auth-guard';

const routes: Routes = [
  { path: '',  component: DashboardComponent, canActivate: [NeedAuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
