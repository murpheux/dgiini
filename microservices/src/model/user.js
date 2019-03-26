'use strict';

export class User {
    ratings = []

    constructor(username) {
        this.username = username
    }

    get_username() {
        return this.username;
    }

    get_password() {
        return this.password
    }
}