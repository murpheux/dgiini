import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskCreateComponent } from 'src/app/views/tasks/components/task-create/task-create.component';

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

    constructor(
        private dialog: MatDialog
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
        this.clientSteps.nativeElement.classList.remove('d-block');
        this.clientSteps.nativeElement.classList.add('d-none');

        this.taskerSteps.nativeElement.classList.remove('d-none');
        this.taskerSteps.nativeElement.classList.add('d-block');

        document.querySelector('#howItWorks').scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }

    showClientSteps() {
        this.clientSteps.nativeElement.classList.remove('d-none');
        this.clientSteps.nativeElement.classList.add('d-block');

        this.taskerSteps.nativeElement.classList.remove('d-block');
        this.taskerSteps.nativeElement.classList.add('d-none');

        document.querySelector('#howItWorks').scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }

}
