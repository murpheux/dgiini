import { Component, OnInit, Input } from '@angular/core';
import { ILocation } from '../../models/ILocation';

@Component({
    selector: 'app-google-map',
    templateUrl: './google-map.component.html',
    styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements OnInit {

    @Input() latitude: number;
    @Input() longitude: number;
    @Input() mapTypeId: string;

    constructor() { }

    ngOnInit() {
    }

}
