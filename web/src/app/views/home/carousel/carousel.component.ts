import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-carousel',
    templateUrl: './carousel.component.html',
    styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

    carousel_images = ['carousel-img-1.jpg', 'carousel-img-2.jpg', 'carousel-img-3.jpg' ];

    constructor() { }

    ngOnInit() {
    }

}
