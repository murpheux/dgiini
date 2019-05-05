import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { MaterialDesignModule } from 'src/app/material-design/material-design.module';
import { UserRoutingModule } from './user-routing.module';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthService } from './services/auth.service';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  declarations: [LoginComponent, LogoutComponent],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    UserRoutingModule,
    MaterialDesignModule
  ],
  providers: [AuthService],
  exports: [ LoginComponent, LogoutComponent ]
})
export class UserModule { }
