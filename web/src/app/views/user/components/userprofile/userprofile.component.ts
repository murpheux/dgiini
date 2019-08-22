import { Component, OnInit, Input } from '@angular/core';
import { LocationService } from '../../services/location.service';
import { User } from 'src/app/shared/models/user';
import { IProfile } from 'src/app/shared/models/profile';

@Component({
    selector: 'app-userprofile',
    templateUrl: './userprofile.component.html',
    styleUrls: ['./userprofile.component.scss']
})
export class UserprofileComponent implements OnInit {
    currentUser: IProfile;
    isClient: boolean;
    isVendor: boolean;

    constructor(
        private locationService: LocationService,
    ) { }

    ngOnInit() {

        this.locationService.isLoggedIn().subscribe(islogin => {
            if (islogin) {
                this.locationService.getCurrentUser().subscribe(user => {
                    this.currentUser = user;

                    this.isClient = user.client !== undefined;
                    this.isVendor = user.vendor !== undefined;
                });
            }
        });
    }

}
