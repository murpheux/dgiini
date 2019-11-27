import { Component, OnInit } from '@angular/core';
import { AuthService } from './views/user/services/auth.service';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

export class Message {
    constructor(
        public sender: string,
        public content: string,
        public isBroadcast = false,
    ) { }
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'dgiini app';
    faCoffee = faCoffee;

    constructor(
        private authService: AuthService,
    ) { }

    ngOnInit(): void {
        // On initial load, check authentication state with authorization server
        // Set up local auth streams if user is already authenticated
        this.authService.localAuthSetup();
    }
}
