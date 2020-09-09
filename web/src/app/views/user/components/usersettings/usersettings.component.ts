import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { IUser } from '../../models/user';
import { IVendor } from '../../models/vendor';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-usersettings',
    templateUrl: './usersettings.component.html',
    styleUrls: ['./usersettings.component.scss'],
})
export class UsersettingsComponent implements OnInit {
    currentUser: IUser;
    isVendor = false;
    vendor: IVendor;

    constructor(
        private authService: AuthService,
        private userService: UserService,
    ) {}

    ngOnInit(): void {
        this.authService.loginUserSubject$.subscribe(user => {
            if (user) {
                this.currentUser = user;
                this.isVendor = user.role.includes('vendor');

                if (this.isVendor) {
                    this.userService.getUserByEmail(this.currentUser.username).subscribe(res => {
                        this.vendor = res.payload.data;
                    });
                }
            }
        });
    }
}
