import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { UserprofileComponent } from './components/userprofile/userprofile.component';
import { BecomevendorComponent } from './components/becomevendor/becomevendor.component';
import { AuthGuard } from 'src/app/shared/guards/auth-guard';

const routes: Routes = [
  { path: '',  component: RegisterComponent, canActivate: []  },
  { path: 'register',  component: RegisterComponent, canActivate: []  },
  { path: 'profile',  component: UserprofileComponent, canActivate: [AuthGuard] },
  { path: 'upgrade',  component: BecomevendorComponent, canActivate: [AuthGuard]  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
