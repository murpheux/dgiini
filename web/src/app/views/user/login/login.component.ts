import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from 'src/app/shared/models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifyHeaderService } from 'src/app/services/notify-header.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  model = new User();
  loading = false;
  returnUrl: string;
  inCorrectCredintials: boolean;
  loginMessage = '';
  loginForm: FormGroup;
  submitted = false;
  constructor(private authService: AuthService,
        private route: ActivatedRoute,
        private router: Router,
        private notifyHeaderService: NotifyHeaderService,
        private fb: FormBuilder
    ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.authService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    this.loading = true;
    this.authService.login(this.model).subscribe(
            result => {
              if ( result.data.statusCode === 200) {
                this.notifyHeaderService.loggedIn();
                this.router.navigate([this.returnUrl]);
              } else {
                  this.loginMessage = result.data.errorMessage;
                  this.inCorrectCredintials = true;
              }
              this.loading = false;
            });
  }

  fakeSignIn() {
    this.loading = true;
    this.authService.login({username: 'empty', password: 'empty', domain: 'debugdomain' }).subscribe(
            result => {
              if ( result.statusCode === 200) {
                this.notifyHeaderService.loggedIn();
                this.router.navigate([this.returnUrl]);
              } else {
                  this.loginMessage = result.data.errorMessage;
                  this.inCorrectCredintials = true;
              }
              this.loading = false;
            });
  }
  get formControls() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.loading = true;

    if (this.loginForm.invalid) {
      return;
    }
    this.model = this.loginForm.value;
    this.model.domain = 'nodomain';

    this.authService.login(this.model).subscribe(
            result => {
              if ( result.accessToken !== undefined) {
                this.notifyHeaderService.loggedIn();
                this.router.navigate([this.returnUrl]);
              } else {
                  this.loginMessage = result.data.errorMessage;
                  this.inCorrectCredintials = true;
              }
              this.loading = false;
            });
    // stop here if form is invalid


  }
}
