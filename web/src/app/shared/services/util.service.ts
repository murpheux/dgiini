import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilService {

  constructor() { }

  capitalize(word): string {
    return word.charAt(0).toUpperCase() + word.substring(1);
  }
  normalize(word): string {
    return this.capitalize(word.split(/(?=[A-Z])/).join(' '));
  }
  formatMoney(amount): string {
    return amount && `$${(amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
  }
}
