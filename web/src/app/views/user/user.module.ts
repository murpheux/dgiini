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

@NgModule({
  declarations: [ RegisterComponent, UserprofileComponent, BecomevendorComponent],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    UserRoutingModule,
    MaterialDesignModule
  ],
  providers: [LocationService],
  exports: [ RegisterComponent ]
})
export class UserModule { }
