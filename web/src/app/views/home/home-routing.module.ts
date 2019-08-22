import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { AuthGuard as AuthGuard } from 'src/app/shared/guards/auth-guard';
import { CallbackComponent } from '../user/pages/callback/callback.component';
import { ProfileComponent } from '../user/pages/profile/profile.component';

const routes: Routes = [
  { path: '',  component: HomeComponent, canActivate: [] },
  { path: 'home',  component: HomeComponent, canActivate: [] },
  { path: 'callback', component: CallbackComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
