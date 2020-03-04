import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialDesignModule } from 'src/app/material-design/material-design.module';
import { UserRoutingModule } from './user-routing.module';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { LocationService } from './services/location.service';
import { RegisterComponent } from './components/register/register.component';
import { UserprofileComponent } from './components/userprofile/userprofile.component';
import { BecomevendorComponent } from './components/becomevendor/becomevendor.component';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { UsersettingsComponent } from './components/usersettings/usersettings.component';
import { SupportComponent } from './components/support/support.component';
import { FinanceComponent } from './components/finance/finance.component';
import { UserstatsComponent } from './components/userstats/userstats.component';
import { TransactionsComponent } from './components/transactions/transactions.component';

@NgModule({
  declarations: [ RegisterComponent, UserprofileComponent, BecomevendorComponent,
    UsersettingsComponent, SupportComponent, FinanceComponent, UserstatsComponent, TransactionsComponent],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    UserRoutingModule,
    MaterialDesignModule
  ],
  providers: [LocationService, UserService, AuthService ],
  exports: [ RegisterComponent, UserprofileComponent ]
})
export class UserModule { }
