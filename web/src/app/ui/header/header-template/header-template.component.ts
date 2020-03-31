import { Component, OnInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { faUser, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { TaskCreateComponent } from 'src/app/views/tasks/components/task-create/task-create.component';
import { AuthService } from 'src/app/views/user/services/auth.service';
import { Constants } from 'src/app/shared/models/constants';
import { TaskService } from 'src/app/views/tasks/services/task.service';
import { Router, NavigationEnd } from '@angular/router';
import { IUserClaim } from 'src/app/views/user/models/user';

@Component({
    selector: 'app-header-template',
    templateUrl: './header-template.component.html',
    styleUrls: ['./header-template.component.scss']
})
export class HeaderTemplateComponent implements OnInit, OnDestroy, AfterViewChecked {
    selectedLanguage = 'en';
    subscription: Subscription;
    isCollapsed = true;
    categories: string[] = [];
    claim: IUserClaim;
    faImageMap = {
        Cleaning: 'sun', Gardening: 'tree', 'Handy Man': 'wrench',
        'Furniture Assembly': 'tools', 'Lawn Mowing': 'users', 'Snow Plowing': 'laptop',
        Childcare: 'baby-carriage', Moving: 'truck'
    };

    constructor(
        public authService: AuthService,
        public taskService: TaskService,
        private dialog: MatDialog,
        private router: Router,
        private ref: ChangeDetectorRef
    ) {
        ref.detach();
        setInterval(() => { this.ref.detectChanges(); }, 2000);

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

    ngOnInit() {
        this.getTaskCategories();
    }

    ngAfterViewChecked() {
        if (this.authService.loggedIn) {
            if (localStorage.getItem(Constants.AUTH_USER_CLAIM)) {
                const claim = JSON.parse(localStorage.getItem(Constants.AUTH_USER_CLAIM));
                this.claim = claim;
            }
        }
    }

    getTaskCategories() {
        this.taskService.getTaskCategories().subscribe(response => {
            this.categories = response.payload.data.slice(0, 8);
        });
    }

    openDialog() {
        const dialogRef = this.dialog.open(TaskCreateComponent, {});
        dialogRef.afterClosed().subscribe(result => { });
    }

    async logout() {
        this.clearStorageItems().then(_ => {
            this.authService.logout();
        });
    }

    clearStorageItems(): Promise<number> {
        localStorage.removeItem(Constants.AUTH_LOGGEDIN_USER);
        localStorage.removeItem(Constants.AUTH_USER_CLAIM);
        localStorage.removeItem(Constants.AUTH_USER_PROFILE);
        localStorage.removeItem(Constants.AUTH_LOCAL_PROFILE);

        return new Promise(resolve =>  resolve(0));
    }

    openRegisterDialog() {
        // const registerRef = this.dialog.open(RegisterComponent, {
        //     height: '600px',
        //     width: '800px',
        // });
        // registerRef.afterClosed().subscribe(result => { });
    }

    changeLang(lang: string) {
        if (lang === localStorage.getItem('locale')) {
            return;
        }
        if (lang === 'en') {
            localStorage.setItem('locale', 'en');
        } else if (lang === 'fr') {
            localStorage.setItem('locale', 'fr');
        } else {
            localStorage.setItem('locale', 'es');
        }
        window.location.reload();
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
