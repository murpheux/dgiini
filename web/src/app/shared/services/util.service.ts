import { Injectable } from '@angular/core';
import { IUser } from 'src/app/views/user/models/user';

@Injectable({
    providedIn: 'root',
})
export class UtilService {
    constructor() {}

    capitalize(word): string {
        return word.charAt(0).toUpperCase() + word.substring(1);
    }

    normalize(word): string {
        return this.capitalize(word.split(/(?=[A-Z])/).join(' '));
    }

    formatMoney(amount): string {
        return (
            amount &&
            `$${amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`
        );
    }

    setWithExpiry(key: string, value: any, ttl: number): void {
        const now = new Date();

        const item = {
            value,
            expiry: now.getTime() + ttl,
        };

        localStorage.setItem(key, JSON.stringify(item));
    }

    getUserFromProfile(profile: any, appUser: any): IUser {
        const user: IUser = {
            _id: appUser._id,
            username: profile.email,
            name: profile.name,
            role: appUser.role,
            picture: profile.picture,

            created: appUser.created,
            lastLogin: appUser.lastLogin,
        };

        return user;
    }

    getWithExpiry(key: string): any {
        const itemStr = localStorage.getItem(key);

        if (!itemStr) {
            return null;
        }

        const item = JSON.parse(itemStr);
        const now = new Date();

        if (now.getTime() > item.expiry) {
            localStorage.removeItem(key);
            return null;
        }

        return item.value;
    }

}
