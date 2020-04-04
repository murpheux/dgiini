import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/views/user/services/auth.service';

@Component({
  selector: 'app-howworks',
  templateUrl: './howworks.component.html',
  styleUrls: ['./howworks.component.scss']
})
export class HowworksComponent implements OnInit {

  constructor(
      public authService: AuthService,
  ) { }

  ngOnInit() {
  }

}
