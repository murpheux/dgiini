import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifyHeaderService } from 'src/app/services/notify-header.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router, private notifyHeaderService: NotifyHeaderService) { }

  ngOnInit() {
      this.logout();
  }
  logout() {
    // remove user from local storage to log user out
    this.notifyHeaderService.loggedOut();
    localStorage.removeItem('currentBPMSUser');
    this.router.navigate(['/user/login']);
}
}
