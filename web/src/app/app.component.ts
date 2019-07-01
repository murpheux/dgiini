import { Component } from '@angular/core';

export class Message {
    constructor(
        public sender: string,
        public content: string,
        public isBroadcast = false,
    ) { }
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'dginni app';
}
