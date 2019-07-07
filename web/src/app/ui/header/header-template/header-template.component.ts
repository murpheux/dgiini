import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotifyHeaderService } from 'src/app/services/notify-header.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { TaskCreateComponent } from 'src/app/views/tasks/components/task-create/task-create.component';
import { LoginComponent } from 'src/app/views/user/login/login.component';

@Component({
    selector: 'app-header-template',
    templateUrl: './header-template.component.html',
    styleUrls: ['./header-template.component.scss']
})
export class HeaderTemplateComponent implements OnInit, OnDestroy {
    selectedLanguage = 'en';
    subscription: Subscription;
    isLoggedIn = false;
    currentUser: any;

    constructor(
        private notifyHeaderService: NotifyHeaderService,
        public dialog: MatDialog
    ) {
        this.subscription = this.notifyHeaderService.getSignInStatus().subscribe(isLoggedIn => {
            this.isLoggedIn = isLoggedIn;
        });
    }

    ngOnInit() {
        this.selectedLanguage = localStorage.getItem('locale');
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

        if (this.currentUser) {
            this.isLoggedIn = true;
        } else {
            this.isLoggedIn = false;
        }
    }

    openDialog() {
        const dialogRef = this.dialog.open(TaskCreateComponent, {
            height: '600px',
            width: '800px',
          });

        dialogRef.afterClosed().subscribe(result => {
           // show notice if necessary
        });
    }

    openLoginDialog() {
        const logingRef = this.dialog.open(LoginComponent);

        logingRef.afterClosed().subscribe(result => {
           // show notice if necessary
        });
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
