import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { MaterialDesignModule } from 'src/app/material-design/material-design.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReviewModule } from '../review/review.module';
import { BecometaskerComponent } from './components/becometasker/becometasker.component';
import { FinanceComponent } from './components/finance/finance.component';
import { RegisterComponent } from './components/register/register.component';
import { SupportComponent } from './components/support/support.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { UserprofileComponent } from './components/userprofile/userprofile.component';
import { UsersettingsComponent } from './components/usersettings/usersettings.component';
import { UserstatsComponent } from './components/userstats/userstats.component';
import { LocationService } from './services/location.service';
import { UserService } from './services/user.service';
import { UserRoutingModule } from './user-routing.module';
import { PubProfileComponent } from './components/pub-profile/pub-profile.component';

@NgModule({
    declarations: [
        UserprofileComponent,
        BecometaskerComponent,
        UsersettingsComponent,
        SupportComponent,
        FinanceComponent,
        UserstatsComponent,
        TransactionsComponent,
        RegisterComponent,
        PubProfileComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        CoreModule,
        UserRoutingModule,
        ReviewModule,
        MaterialDesignModule,
    ],
    providers: [LocationService, UserService],
    exports: [UserprofileComponent],
})
export class UserModule {}
