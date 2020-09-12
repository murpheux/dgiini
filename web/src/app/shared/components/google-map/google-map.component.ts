import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { ILocation } from '../../models/location';

@Component({
    selector: 'app-google-map',
    templateUrl: './google-map.component.html',
    styleUrls: ['./google-map.component.scss'],
})
export class GoogleMapComponent implements OnInit {
    @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow;

    @Input()
    set location(location: ILocation) {
        this.center = { lat: location.latitude, lng: location.longitude };

        this.addMarker({
            lat: this.center.lat + ((Math.random() - 0.5) * 2) / 10,
            lng: this.center.lng + ((Math.random() - 0.5) * 2) / 10,
          });
    }

    center = { lat: 51.049999, lng: -114.066666 }; // calgary
    markerOptions = { draggable: false };
    options = { minZoom: 3,  maxZoom: 10};
    markerPosition: google.maps.LatLngLiteral;
    zoom = 12;
    display?: google.maps.LatLngLiteral;

    constructor() {}

    ngOnInit(): void {
        this.addMarker({
              lat: this.center.lat + ((Math.random() - 0.5) * 2) / 10,
              lng: this.center.lng + ((Math.random() - 0.5) * 2) / 10,
            });
    }

    addMarker(marker): void {
        this.markerPosition = marker;
    }

    move(event: google.maps.MouseEvent): void {
        this.display = event.latLng.toJSON();
    }

    openInfoWindow(marker: MapMarker): void {
        this.infoWindow.open(marker);
    }

    zoomIn(): void {
        if (this.zoom < this.options.maxZoom) { this.zoom++; }
    }

    zoomOut(): void {
        if (this.zoom > this.options.minZoom) { this.zoom--; }
    }

}
