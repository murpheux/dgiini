import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NotifyHeaderService {

  private SigningInChanged = new Subject<boolean>();
  isLoggedIn = false;
  loggedIn() {
    this.isLoggedIn = true;
    this.SigningInChanged.next( this.isLoggedIn);
  }
  loggedOut() {
    this.isLoggedIn = false;
    this.SigningInChanged.next(this.isLoggedIn);
  }
  getSignInStatus(): Observable<boolean> {
    return this.SigningInChanged;
  }
}
