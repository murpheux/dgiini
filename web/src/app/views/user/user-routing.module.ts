import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { UserprofileComponent } from './components/userprofile/userprofile.component';
import { BecomevendorComponent } from './components/becomevendor/becomevendor.component';

const routes: Routes = [
  { path: '',  component: RegisterComponent },
  { path: 'register',  component: RegisterComponent },
  { path: 'profile',  component: UserprofileComponent },
  { path: 'upgrade',  component: BecomevendorComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
