import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as HttpStatus from 'http-status-codes';
import { Constants } from 'src/app/shared/models/constants';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UtilService } from 'src/app/shared/services/util.service';
import { RegisterComponent } from '../user/components/register/register.component';
import { ICityLocation } from '../user/models/city';
import { IProfile } from '../user/models/profile';
import { IUser } from '../user/models/user';
import { LocationService } from '../user/services/location.service';
import { UserService } from '../user/services/user.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    currentUser: IUser;
    profile: IProfile;
    currentCity: ICityLocation;
    taskerClientState = Constants.USER_ROLE_CLIENT; // default client state

    constructor(
        private dialog: MatDialog,
        private authService: AuthService,
        private userService: UserService,
        private locationService: LocationService,
        private utilService: UtilService,
    ) {}

    async ngOnInit(): Promise<void> {
        this.locationService.getCurrentCity().then((data) => {
            this.currentCity = data;
        });

        if (this.authService.isLoggedIn$) {
            this.authService.userProfile$.subscribe(profile => {

                if (profile) {
                    this.userService
                        .getUserByEmail(profile.email)
                        .subscribe(response => {
                            if (response.code === HttpStatus.NOT_FOUND) {
                                this.loadRegisterDialog(profile);
                            }
                            else if (response.code === HttpStatus.OK) {
                                const user = response.payload.data;
                                this.authService.updateLoginUser(this.utilService.getUserFromProfile(profile, user));
                            }
                        });
                }
            });
        }
    }

    handleStateChanged(state: string): void {
        this.taskerClientState = state;
    }

    loadRegisterDialog(profile: any): void {
        let dialogRef;
        let vl = 0;

        this.utilService.indexSubject$.subscribe(val => {
            vl = val;
            vl++;
        });

        if (vl === 1) {
            this.utilService.updateIndex(vl);

            dialogRef = this.dialog.open(RegisterComponent, {
                height: '570px',
                width: '800px',
                data:  profile
            });

            dialogRef.afterClosed().subscribe((result) => {});
        }
    }
}
