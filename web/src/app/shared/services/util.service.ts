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

    setWithExpiry(key: string, value: any, ttl: number) {
        const now = new Date();

        const item = {
            value,
            expiry: now.getTime() + ttl
        };

        localStorage.setItem(key, JSON.stringify(item));
    }

    getWithExpiry(key: string): any {
        const itemStr = localStorage.getItem(key);

        if (!itemStr) { return null; }

        const item = JSON.parse(itemStr);
        const now = new Date();

        if (now.getTime() > item.expiry) {
            localStorage.removeItem(key);
            return null;
        }

        return item.value;
    } 

    deleteExpiredLS() {
        for (let i = 0; i < localStorage.length; i++) {
            const eachitem = localStorage.getItem(localStorage.key(i));
            const eachkey = localStorage.key(i);
            if (eachitem.includes('expiry')) {
                this.getWithExpiry(eachkey);
            }
        }
    }
}
