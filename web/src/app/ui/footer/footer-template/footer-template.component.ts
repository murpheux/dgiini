import { Component, OnInit } from '@angular/core';
import { VERSION } from 'src/environments/version';

@Component({
    selector: 'app-footer-template',
    templateUrl: './footer-template.component.html',
    styleUrls: ['./footer-template.component.scss'],
})
export class FooterTemplateComponent implements OnInit {
    // tslint:disable-next-line: no-any
    version: any;

    constructor() {}

    ngOnInit(): void {
        this.version = VERSION;
    }
}
