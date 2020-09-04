import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { IUser } from '../../models/user';

@Component({
    selector: 'app-usersettings',
    templateUrl: './usersettings.component.html',
    styleUrls: ['./usersettings.component.scss'],
})
export class UsersettingsComponent implements OnInit {
    currentUser: IUser;

    constructor(
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        this.authService.loginUserSubject$.subscribe(user => {
            if (user) {
                this.currentUser = user;
            }
        });
    }
}
