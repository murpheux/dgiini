import { Component, OnInit, Input, AfterViewChecked } from '@angular/core';
import { LocationService } from '../../services/location.service';
import { IUser } from '../../models/user';
import { Constants } from 'src/app/shared/models/constants';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UtilService } from 'src/app/shared/services/util.service';

@Component({
    selector: 'app-userprofile',
    templateUrl: './userprofile.component.html',
    styleUrls: ['./userprofile.component.scss'],
})
export class UserprofileComponent implements OnInit {
    currentUser: IUser;

    constructor(
        private authService: AuthService,
        private utilService: UtilService
    ) {}

    ngOnInit(): void {
        this.authService.loginUserSubject$.subscribe(user => {
            if (user) {
                this.currentUser = user;
            }
        });
    }
}
