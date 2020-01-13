import { Component, OnInit } from '@angular/core';
import { ILocation } from '../../models/ILocation';

@Component({
    selector: 'app-google-map',
    templateUrl: './google-map.component.html',
    styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements OnInit {
    location: ILocation;

    constructor() { }

    ngOnInit() {
        this.location = {
            latitude: -28.68352,
            longitude: -147.20785,
            mapType: 'normal',
            zoom: 5
        };
    }

}
