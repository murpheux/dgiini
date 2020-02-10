import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { UserprofileComponent } from './components/userprofile/userprofile.component';
import { BecomevendorComponent } from './components/becomevendor/becomevendor.component';
import { AuthGuard } from 'src/app/shared/guards/auth-guard';
import { UsersettingsComponent } from './components/usersettings/usersettings.component';
import { SupportComponent } from './components/support/support.component';
import { FinanceComponent } from './components/finance/finance.component';
import { UserstatsComponent } from './components/userstats/userstats.component';
import { TransactionsComponent } from './components/transactions/transactions.component';

const routes: Routes = [
  { path: '',  component: RegisterComponent, canActivate: []  },
  { path: 'register',  component: RegisterComponent, canActivate: []  },
  { path: 'profile',  component: UserprofileComponent, canActivate: [AuthGuard] },
  { path: 'settings',  component: UsersettingsComponent, canActivate: [AuthGuard]  },
  { path: 'support',  component: SupportComponent, canActivate: []  },
  { path: 'finance',  component: FinanceComponent, canActivate: [AuthGuard]  },
  { path: 'transactions',  component: TransactionsComponent, canActivate: [AuthGuard]  },
  { path: 'statistics',  component: UserstatsComponent, canActivate: [AuthGuard]  },
  { path: 'upgrade',  component: BecomevendorComponent, canActivate: [AuthGuard]  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
