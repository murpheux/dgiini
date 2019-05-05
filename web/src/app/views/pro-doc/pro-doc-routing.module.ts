import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsComponent } from './components/details.component';
import { NeedAuthGuard } from 'src/app/shared/guards/need-auth-guard';

const routes: Routes = [
  {
    path: 'details/:code', component: DetailsComponent, canActivate: [NeedAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProDocRoutingModule { }
