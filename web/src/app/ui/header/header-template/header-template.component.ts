import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotifyHeaderService } from 'src/app/services/notify-header.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { faUser, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { TaskCreateComponent } from 'src/app/views/tasks/components/task-create/task-create.component';
import { RegisterComponent } from 'src/app/views/user/components/register/register.component';
import { AuthService } from 'src/app/views/user/services/auth.service';
import { Constants } from 'src/app/shared/models/constants';
import { TaskService } from 'src/app/views/tasks/services/task.service';

@Component({
    selector: 'app-header-template',
    templateUrl: './header-template.component.html',
    styleUrls: ['./header-template.component.scss']
})
export class HeaderTemplateComponent implements OnInit, OnDestroy {
    selectedLanguage = 'en';
    subscription: Subscription;
    isCollapsed = true;
    categories: string[] = [];
    fa_imageMap = { 'Cleaning': 'sun', 'Gardening': 'tree', 'Handy Man': 'wrench',
        'Furniture Assembly': 'tools', 'Lawn Mowing': 'users', 'Snow Plowing': 'laptop',
        'Childcare': 'baby-carriage', 'Moving': 'truck' };

    constructor(
        private notifyHeaderService: NotifyHeaderService,
        public authService: AuthService,
        public taskService: TaskService,
        private dialog: MatDialog
    ) { }

    ngOnInit() {
        this.getTaskCategories();
    }

    getTaskCategories() {
        this.taskService.getTaskCategories().subscribe(response => {
            this.categories = response.payload.slice(0, 8);
        });
    }

    openDialog() {
        const dialogRef = this.dialog.open(TaskCreateComponent, {
            height: '620px',
            width: '800px',
        });

        dialogRef.afterClosed().subscribe(result => { });
    }

    logout() {
        // clear loggedin storage
        localStorage.removeItem(Constants.AUTH_LOGGEDIN_USER);
        localStorage.removeItem(Constants.AUTH_USER_CLAIM);
        localStorage.removeItem(Constants.AUTH_USER_PROFILE);
        localStorage.removeItem(Constants.AUTH_LOCAL_PROFILE);

        this.authService.logout();
    }

    openRegisterDialog() {
        const registerRef = this.dialog.open(RegisterComponent, {
            height: '600px',
            width: '800px',
        });
        registerRef.afterClosed().subscribe(result => {});
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
        this.subscription.unsubscribe();
    }
}
