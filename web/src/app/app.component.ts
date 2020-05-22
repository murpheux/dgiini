import { Component, OnInit } from '@angular/core';
import { AuthService } from './views/user/services/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'dgiini app';

    constructor(
        private authService: AuthService,
    ) { }

    ngOnInit(): void {
        // On initial load, check authentication state with authorization server
        // Set up local auth streams if user is already authenticated
        this.authService.localAuthSetup();
    }
}
