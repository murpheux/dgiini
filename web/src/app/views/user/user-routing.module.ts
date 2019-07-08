import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: '',  component: LoginComponent },
  { path: 'login',  component: LoginComponent },
  { path: 'logout',  component: LogoutComponent },
  { path: 'register',  component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
