import { Component, OnInit, Input } from '@angular/core';
import { LocationService } from '../../services/location.service';
import { User } from 'src/app/shared/models/user';
import { AuthService } from '../../services/auth.service';
import { IUser } from '../../models/user';

@Component({
    selector: 'app-userprofile',
    templateUrl: './userprofile.component.html',
    styleUrls: ['./userprofile.component.scss']
})
export class UserprofileComponent implements OnInit {
    currentUser: IUser;
    isClient: boolean;
    isVendor: boolean;

    constructor(
        private authService: AuthService,
    ) { }

    ngOnInit() {

        if (this.authService.loggedIn) {
            this.authService.userProfile$.subscribe(user => {
                this.currentUser = user;

                this.isClient = user.client !== undefined;
                this.isVendor = user.vendor !== undefined;
            });
        }
    }

}
