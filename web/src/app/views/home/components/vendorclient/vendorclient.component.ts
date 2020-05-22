import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskCreateComponent } from 'src/app/views/tasks/components/task-create/task-create.component';
import { AuthService } from 'src/app/views/user/services/auth.service';
import { Constants } from 'src/app/shared/models/constants';

@Component({
    selector: 'app-vendorclient',
    templateUrl: './vendorclient.component.html',
    styleUrls: ['./vendorclient.component.scss']
})
export class VendorclientComponent implements OnInit, AfterViewInit {

    @ViewChild('tasker', { static: true }) tasker: ElementRef;
    @ViewChild('clientSteps', { static: true }) clientSteps: ElementRef;
    @ViewChild('taskerSteps', { static: true }) taskerSteps: ElementRef;
    @ViewChild('howItWorks', { static: true }) howItWorks: ElementRef;

    @Output() stateChanged = new EventEmitter<string>();

    private currentState = Constants.USER_ROLE_CLIENT; // default

    constructor(
        private dialog: MatDialog,
        public authService: AuthService,
    ) { }

    ngOnInit() {
    }

    ngAfterViewInit() {
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

    openDialog() {
        const dialogRef = this.dialog.open(TaskCreateComponent, {
            height: '600px',
            width: '800px',
        });

        dialogRef.afterClosed().subscribe(result => { });
    }


    showTaskerSteps() {
        if (this.currentState !== Constants.USER_ROLE_TASKER) {
            this.currentState = Constants.USER_ROLE_TASKER;

            this.stateChanged.emit(this.currentState);
        }
    }

    showClientSteps() {
        if (this.currentState !== Constants.USER_ROLE_CLIENT) {
            this.currentState = Constants.USER_ROLE_CLIENT;

            this.stateChanged.emit(this.currentState);
        }
    }

}
