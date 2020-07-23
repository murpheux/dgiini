import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { AuthService } from '../views/user/services/auth.service';
import { UserService } from '../views/user/services/user.service';
import { Constants } from '../shared/models/constants';
import { UtilService } from '../shared/services/util.service';
import { environment } from 'src/environments/environment';
import * as HttpStatus from 'http-status-codes';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../views/user/components/register/register.component';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, AfterViewChecked {

    constructor(
        private authService: AuthService,
        private userService: UserService,
        private utilService: UtilService
    ) { }

    ngOnInit() {}

    ngAfterViewChecked() {
        if (this.authService.loggedIn) {

            if (!this.utilService.getWithExpiry(Constants.AUTH_LOGGEDIN_USER)) {
                this.authService.userToken$.subscribe(token => {
                    this.utilService.setWithExpiry(Constants.AUTH_LOGGEDIN_USER, token, environment.auth_ttl);
                });

                this.authService.userClaims$.subscribe(claim => {
                    this.utilService.setWithExpiry(Constants.AUTH_USER_CLAIM, JSON.stringify(claim), environment.auth_ttl);
                });

                this.authService.userProfile$.subscribe(profile => {
                    this.utilService.setWithExpiry(Constants.AUTH_USER_PROFILE, JSON.stringify(profile), environment.auth_ttl);

                    // get user info from db
                    this.userService.getUserByEmail(profile.email).subscribe(response => {
                        if (response.code === 0) {
                            this.utilService.setWithExpiry(Constants.AUTH_LOCAL_PROFILE, JSON.stringify(response.payload.data),
                                environment.auth_ttl);
                        }
                    });
                });
            }
        }

    }

}
