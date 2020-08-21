import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
    selector: 'app-howworks',
    templateUrl: './howworks.component.html',
    styleUrls: ['./howworks.component.scss'],
})
export class HowworksComponent implements OnInit {
    @Input() state: string;
    isloggedIn: boolean;

    constructor(private authService: AuthService) {}

    async ngOnInit(): Promise<void> {
        this.isloggedIn = await this.authService.isLoggedIn$.toPromise();
    }

    login(): void {
        this.authService.login();
    }
}
