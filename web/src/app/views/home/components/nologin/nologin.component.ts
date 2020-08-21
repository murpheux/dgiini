import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
    selector: 'app-nologin',
    templateUrl: './nologin.component.html',
    styleUrls: ['./nologin.component.scss'],
})
export class NologinComponent implements OnInit {
    constructor(public authService: AuthService) {}

    ngOnInit(): void {}
}
