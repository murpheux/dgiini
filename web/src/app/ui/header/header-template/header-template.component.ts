import {
    ChangeDetectorRef, Component,
    OnDestroy, OnInit
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { NologinComponent } from 'src/app/views/home/components/nologin/nologin.component';
import { TaskCreateComponent } from 'src/app/views/tasks/components/task-create/task-create.component';
import { TaskService } from 'src/app/views/tasks/services/task.service';
import { BecometaskerComponent } from 'src/app/views/user/components/becometasker/becometasker.component';
import { LocationService } from 'src/app/views/user/services/location.service';
import { UserService } from 'src/app/views/user/services/user.service';

@Component({
    selector: 'app-header-template',
    templateUrl: './header-template.component.html',
    styleUrls: ['./header-template.component.scss'],
})
export class HeaderTemplateComponent
    implements OnInit, OnDestroy {
    selectedLanguage = 'en';
    subscription: Subscription;
    isCollapsed = true;
    categories: string[] = [];
    faImageMap = {
        Cleaning: 'sun',
        Gardening: 'tree',
        'Handy Man': 'wrench',
        'Furniture Assembly': 'tools',
        'Lawn Mowing': 'users',
        'Snow Plowing': 'laptop',
        Childcare: 'baby-carriage',
        Moving: 'truck',
    };
    isVendor = false;

    constructor(
        public taskService: TaskService,
        public userService: UserService,
        public authService: AuthService,
        private dialog: MatDialog,
        private router: Router,
        private ref: ChangeDetectorRef,
        private notifier: NotificationService,
        private locationService: LocationService,
    ) {
        ref.detach();
        setInterval(() => {
            this.ref.detectChanges();
        }, 2000);

        this.router.routeReuseStrategy.shouldReuseRoute = () => {
            return false;
        };

        this.subscription = this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                // Trick the Router into believing it's last link wasn't previously loaded
                this.router.navigated = false;
            }
        });
    }

    async ngOnInit(): Promise<void> {
        this.getTaskCategories();

        this.authService.loginUserSubject$.subscribe(user => {
            if (user) {
                this.isVendor = user.role.includes('vendor');
            }
        });
    }

    getTaskCategories(): void {
        this.taskService.getTaskCategories().subscribe((response) => {
            this.categories = response.payload.data.slice(0, 8);
        });
    }

    async upgradeToVendor(): Promise<void> {
        let dialogRef;

        this.authService.isLoggedIn$.subscribe(state => {
            if (state) {
                dialogRef = this.dialog.open(BecometaskerComponent, {
                    height: '570px',
                    width: '800px',
                    disableClose: true,
                });
            } else {
                dialogRef = this.dialog.open(NologinComponent, {
                    height: '570px',
                    width: '350px',
                });
            }
        });

        dialogRef.afterClosed().subscribe((result) => { console.log(`From DRef: ${result}`) });
    }

    async postTask(): Promise<void> {
        let dialogRef;

        this.authService.isLoggedIn$.subscribe(state => {
            if (state) {
                dialogRef = this.dialog.open(TaskCreateComponent, {
                    height: '570px',
                    width: '800px',
                    disableClose: true,
                });
            } else {
                dialogRef = this.dialog.open(NologinComponent, {
                    height: '570px',
                    width: '350px',
                });
            }

        });

        dialogRef.afterClosed().subscribe((result) => {});
    }

    async login(): Promise<void> {
        this.authService.login();
    }

    async logout(): Promise<void> {
        this.authService.logout();
    }

    ngOnDestroy(): void {
        // unsubscribe to ensure no memory leaks
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

}
