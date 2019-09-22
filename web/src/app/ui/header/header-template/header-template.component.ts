import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotifyHeaderService } from 'src/app/services/notify-header.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { faUser, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { TaskCreateComponent } from 'src/app/views/tasks/components/task-create/task-create.component';
import { LoginComponent } from 'src/app/views/user/components/login/login.component';
import { RegisterComponent } from 'src/app/views/user/components/register/register.component';
import { AuthService } from 'src/app/views/user/services/auth.service';

@Component({
    selector: 'app-header-template',
    templateUrl: './header-template.component.html',
    styleUrls: ['./header-template.component.scss']
})
export class HeaderTemplateComponent implements OnInit, OnDestroy {
    selectedLanguage = 'en';
    subscription: Subscription;
    isCollapsed = true;

    constructor(
        private notifyHeaderService: NotifyHeaderService,
        public authService: AuthService,
        private dialog: MatDialog
    ) { }

    ngOnInit() {
        this.authService.userToken$.subscribe(s => {
            // console.log(JSON.stringify(s));
        });
    }

    openDialog() {
        const dialogRef = this.dialog.open(TaskCreateComponent, {
            height: '600px',
            width: '800px',
        });

        dialogRef.afterClosed().subscribe(result => { });
    }

    login() {
        this.authService.login();
    }

    logout() {
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
