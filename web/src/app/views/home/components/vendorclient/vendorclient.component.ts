import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskCreateComponent } from 'src/app/views/tasks/components/task-create/task-create.component';
import { AuthService } from 'src/app/views/user/services/auth.service';

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

    private CLIENT_STATE = 'client';
    private TASKER_STATE = 'tasker';

    private currentState = this.CLIENT_STATE; // default

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
        if (this.currentState !== this.TASKER_STATE) {
            this.currentState = this.TASKER_STATE;

            this.stateChanged.emit(this.currentState);
        }
    }

    showClientSteps() {
        if (this.currentState !== this.CLIENT_STATE) {
            this.currentState = this.CLIENT_STATE;

            this.stateChanged.emit(this.currentState);
        }
    }

}
