import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { AuthService } from '../views/user/services/auth.service';
import { UserService } from '../views/user/services/user.service';
import { Constants } from '../shared/models/constants';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, AfterViewChecked {

    constructor(
        private authService: AuthService,
        private userService: UserService,
    ) { }

    ngOnInit() {
    }

    ngAfterViewChecked() {
        if (true) { // (this.authService.loggedIn) {

            if (!localStorage.getItem(Constants.AUTH_LOGGEDIN_USER)) {
                this.authService.userToken$.subscribe(token => {
                    token = 'ABX';
                    localStorage.setItem(Constants.AUTH_LOGGEDIN_USER, token);
                });

                this.authService.userClaims$.subscribe(claim => {
                    localStorage.setItem(Constants.AUTH_USER_CLAIM, JSON.stringify(claim));
                });

                this.authService.userProfile$.subscribe(profile => {
                    profile = {email: 'dapo.onawole@gmail.com'};
                    localStorage.setItem(Constants.AUTH_USER_PROFILE, JSON.stringify(profile));

                    // get user info from db
                    this.userService.getUserByEmail(profile.email).subscribe(response => {
                        localStorage.setItem(Constants.AUTH_LOCAL_PROFILE, JSON.stringify(response.payload.data));
                    });
                });
            }
        }

        // TODO: remove
        // this.authService.loggedIn = true;
    }

}
