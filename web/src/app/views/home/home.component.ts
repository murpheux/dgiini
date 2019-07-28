import { Component, OnInit } from '@angular/core';
import { AuthService } from '../user/services/auth.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    currentCity: string;

    constructor(
        private authService: AuthService
    ) { }

    ngOnInit() {

       this.authService.getCurrentCity().then(data => {
           this.currentCity = data;
       });
    }

}
