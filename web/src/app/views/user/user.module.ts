import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { MaterialDesignModule } from 'src/app/material-design/material-design.module';
import { UserRoutingModule } from './user-routing.module';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthService } from './services/auth.service';
import { LogoutComponent } from './components/logout/logout.component';
import { RegisterComponent } from './components/register/register.component';
import { UserprofileComponent } from './components/userprofile/userprofile.component';

@NgModule({
  declarations: [LoginComponent, LogoutComponent, RegisterComponent, UserprofileComponent],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    UserRoutingModule,
    MaterialDesignModule
  ],
  providers: [AuthService],
  exports: [ LoginComponent, LogoutComponent, RegisterComponent ]
})
export class UserModule { }
