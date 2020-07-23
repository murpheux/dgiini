import { Component, OnInit } from '@angular/core';
import { LocationService } from '../user/services/location.service';
import { ICityLocation } from '../user/models/city';
import { Constants } from 'src/app/shared/models/constants';
import { AuthService } from '../user/services/auth.service';
import * as HttpStatus from 'http-status-codes';
import { UserService } from '../user/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../user/components/register/register.component';
import { IUser } from '../user/models/user';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    currentUser: IUser;
    currentCity: ICityLocation;
    taskerClientState = Constants.USER_ROLE_CLIENT; // default client state

    constructor(
        private dialog: MatDialog,
        private authService: AuthService,
        private userService: UserService,
        private locationService: LocationService,
    ) { }

    ngOnInit() {

        this.locationService.getCurrentCity().then(data => {
           this.currentCity = data;
        });

        this.loadRegisterDialog();

        if (localStorage.getItem(Constants.AUTH_LOCAL_PROFILE)) {
            this.currentUser = JSON.parse(localStorage.getItem(Constants.AUTH_LOCAL_PROFILE));

            // get user info from db
            this.userService.getUserByEmail(this.currentUser.username).subscribe(response => {
                if (response.code === HttpStatus.NOT_FOUND) {
                    this.loadRegisterDialog();
                } else {
                    console.log('user was found!');
                }
            });
        }
    }

    handleStateChanged(state: string) {
        this.taskerClientState = state;
    }

    loadRegisterDialog() {
        let dialogRef;

        dialogRef = this.dialog.open(RegisterComponent, {
            height: '570px',
            width: '800px',
        });

    }

}
