import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ILocation } from '../../models/ILocation';
import {MapInfoWindow, MapMarker} from '@angular/google-maps';

@Component({
    selector: 'app-google-map',
    templateUrl: './google-map.component.html',
    styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements OnInit {
    @ViewChild(MapInfoWindow, {static: false}) infoWindow: MapInfoWindow;

    center = {lat: 24, lng: 12};
    markerOptions = {draggable: false};
    markerPositions: google.maps.LatLngLiteral[] = [];
    zoom = 4;
    display?: google.maps.LatLngLiteral;

    @Input() latitude: number;
    @Input() longitude: number;
    @Input() mapTypeId: string;

    constructor() { }

    ngOnInit() {
        console.log(process.env.GOOGLE_API_KEY);
    }

    addMarker(event: google.maps.MouseEvent) {
        this.markerPositions.push(event.latLng.toJSON());
    }

    move(event: google.maps.MouseEvent) {
        this.display = event.latLng.toJSON();
    }

    openInfoWindow(marker: MapMarker) {
        this.infoWindow.open(marker);
    }

    removeLastMarker() {
        this.markerPositions.pop();
    }

}
