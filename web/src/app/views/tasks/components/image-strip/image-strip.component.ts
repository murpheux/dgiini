import { Component, Input, OnInit } from '@angular/core';
import {
    Gallery,

    GalleryItem, GalleryRef,

    ImageItem,

    ImageSize, ThumbnailsPosition
} from 'ng-gallery';
import { Lightbox } from 'ng-gallery/lightbox';
import { IPhoto } from '../../models/photo';

@Component({
    selector: 'app-image-strip',
    templateUrl: './image-strip.component.html',
    styleUrls: ['./image-strip.component.scss'],
})
export class ImageStripComponent implements OnInit {
    // tslint:disable-next-line: variable-name
    private _photos: IPhoto[];
    items: GalleryItem[] = [];
    lightboxRef: GalleryRef;

    @Input()
    set photos(photos: IPhoto[]) {
        this._photos = photos;
        if (photos) {
            this.items = photos.map(
                (item) => new ImageItem({ src: item.photo, thumb: item.photo })
            );
            // this.lightboxRef.load(this.items);

            this.init();
        }
    }

    constructor(public gallery: Gallery, public lightbox: Lightbox) {}

    ngOnInit(): void {
        this.init();
    }

    init(): void {
        if (!this.lightboxRef) {
            this.lightboxRef = this.gallery.ref('lightbox');

            this.lightboxRef.setConfig({
                imageSize: ImageSize.Cover,
                thumbPosition: ThumbnailsPosition.Top,
            });
        }

        this.lightboxRef.load(this.items);
    }

    loadGallery(): void {
        this.lightbox.open(0);
    }
}
