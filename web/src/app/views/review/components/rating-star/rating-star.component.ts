import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-rating-star',
    templateUrl: './rating-star.component.html',
    styleUrls: ['./rating-star.component.scss']
})
export class RatingStarComponent implements OnInit {

    readonly maxNumber = 5;
    @Input() rating: number;

    constructor() { }

    ngOnInit(): void {
    }

    isExtra(i: number): boolean {
        return i - Math.floor(i) > 0;
    }

    counter(i: number): number[] {
        return new Array(Math.floor(i));
    }

}
