import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ILocation } from '../../models/ILocation';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';

@Component({
    selector: 'app-google-map',
    templateUrl: './google-map.component.html',
    styleUrls: ['./google-map.component.scss'],
})
export class GoogleMapComponent implements OnInit {
    @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow;

    @Input() latitude: number;
    @Input() longitude: number;
    @Input() mapTypeId: string;

    center = { lat: 51.049999, lng: -114.066666 }; // calgary
    markerOptions = { draggable: false };
    markerPositions: google.maps.LatLngLiteral[] = [];
    zoom = 4;
    display?: google.maps.LatLngLiteral;

    constructor() {}

    ngOnInit(): void {
        this.center = { lat: this.latitude, lng: this.longitude };
    }

    addMarker(event: google.maps.MouseEvent): void {
        this.markerPositions.push(event.latLng.toJSON());
    }

    move(event: google.maps.MouseEvent): void {
        this.display = event.latLng.toJSON();
    }

    openInfoWindow(marker: MapMarker): void {
        this.infoWindow.open(marker);
    }

    removeLastMarker(): void {
        this.markerPositions.pop();
    }
}
