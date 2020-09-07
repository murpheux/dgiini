import {
    AfterViewInit, Component,


    ElementRef,


    EventEmitter,
    Input, OnInit,



    Output, ViewChild
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Constants } from 'src/app/shared/models/constants';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TaskCreateComponent } from 'src/app/views/tasks/components/task-create/task-create.component';
import { BecometaskerComponent } from 'src/app/views/user/components/becometasker/becometasker.component';
import { NologinComponent } from '../nologin/nologin.component';

@Component({
    selector: 'app-taskerclient',
    templateUrl: './taskerclient.component.html',
    styleUrls: ['./taskerclient.component.scss'],
})
export class VendorclientComponent implements OnInit, AfterViewInit {
    @ViewChild('tasker', { static: true }) tasker: ElementRef;
    @ViewChild('clientSteps', { static: true }) clientSteps: ElementRef;
    @ViewChild('taskerSteps', { static: true }) taskerSteps: ElementRef;
    @ViewChild('howItWorks', { static: true }) howItWorks: ElementRef;

    @Input() role: string[];
    @Output() stateChanged = new EventEmitter<string>();

    private currentState = Constants.USER_ROLE_CLIENT; // default

    constructor(
        private dialog: MatDialog,
        public authService: AuthService
    ) {}

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        this.tasker.nativeElement.addEventListener('mouseover', () => {
            const box = document.getElementById('clientTaskerBox');
            box.classList.add('tasker-active');
            box.classList.add('client-fade');
        });

        this.tasker.nativeElement.addEventListener('mouseleave', () => {
            const box = document.getElementById('clientTaskerBox');
            box.classList.remove('tasker-active');
            box.classList.remove('client-fade');
        });
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(TaskCreateComponent, {
            height: '600px',
            width: '800px',
        });

        dialogRef.afterClosed().subscribe((result) => {});
    }

    showTaskerSteps(): void {
        if (this.currentState !== Constants.USER_ROLE_TASKER) {
            this.currentState = Constants.USER_ROLE_TASKER;

            this.stateChanged.emit(this.currentState);
        }
    }

    showClientSteps(): void {
        if (this.currentState !== Constants.USER_ROLE_CLIENT) {
            this.currentState = Constants.USER_ROLE_CLIENT;

            this.stateChanged.emit(this.currentState);
        }
    }

    async upgradeToVendor(): Promise<void> {
        let dialogRef;

        this.authService.isLoggedIn$.subscribe(state => {
            if (state) {
                dialogRef = this.dialog.open(BecometaskerComponent, {
                    height: '570px',
                    width: '800px',
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
}
