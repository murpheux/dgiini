import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileJson: string = null;

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.authService.userProfile$.subscribe(
      profile => this.profileJson = JSON.stringify(profile, null, 2)
    );
  }

}
