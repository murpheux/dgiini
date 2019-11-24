import { Component, OnInit, Input } from '@angular/core';
import { LocationService } from '../../services/location.service';
import { AuthService } from '../../services/auth.service';
import { IUser } from '../../models/user';
import { Constants } from 'src/app/shared/models/constants';

@Component({
    selector: 'app-userprofile',
    templateUrl: './userprofile.component.html',
    styleUrls: ['./userprofile.component.scss']
})
export class UserprofileComponent implements OnInit {
    currentUser: IUser;

    constructor(
        private authService: AuthService,
    ) { }

    ngOnInit() {

        if (this.authService.loggedIn) {
            this.currentUser = JSON.parse(localStorage.getItem(Constants.AUTH_LOCAL_PROFILE));
        }
    }

}
