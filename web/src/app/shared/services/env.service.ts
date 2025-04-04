import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class EnvService {

    // The values that are defined here are the default values that can
    // be overridden by env.js

    // API url
    public apiUrl = '';

    // Whether or not to enable debug mode
    public enableDebug = true;

    // whether file is loaded
    public envFileLoaded = false;

    constructor() { }
}
