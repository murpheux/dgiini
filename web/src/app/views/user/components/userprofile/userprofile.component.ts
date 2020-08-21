import { Component, OnInit, Input, AfterViewChecked } from '@angular/core';
import { LocationService } from '../../services/location.service';
import { IUser } from '../../models/user';
import { Constants } from 'src/app/shared/models/constants';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
    selector: 'app-userprofile',
    templateUrl: './userprofile.component.html',
    styleUrls: ['./userprofile.component.scss'],
})
export class UserprofileComponent implements OnInit, AfterViewChecked {
    currentUser: IUser;

    constructor(private authService: AuthService) {}

    ngOnInit(): void {
        if (localStorage.getItem(Constants.AUTH_LOCAL_PROFILE)) {
            this.currentUser = JSON.parse(
                localStorage.getItem(Constants.AUTH_LOCAL_PROFILE)
            );
        }
    }

    ngAfterViewChecked(): void {
        // if (this.authService.loggedIn) {
        //     this.currentUser = JSON.parse(localStorage.getItem(Constants.AUTH_LOCAL_PROFILE));
        //     console.log(JSON.stringify(this.currentUser));
        // }
    }
}
