import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { VERSION } from 'src/environments/version';

@Component({
    selector: 'app-footer-template',
    templateUrl: './footer-template.component.html',
    styleUrls: ['./footer-template.component.scss']
})
export class FooterTemplateComponent implements OnInit {

    version: any;

    constructor() { }

    ngOnInit() {
        this.version = VERSION;
    }

}
