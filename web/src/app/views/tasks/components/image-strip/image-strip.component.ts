import { Component, OnInit, Input } from '@angular/core';
import { IPhoto } from '../../models/IPhoto';
import {
    Gallery,
    GalleryRef,
    GalleryItem,
    ImageItem,
    ThumbnailsPosition,
    ImageSize,
} from 'ng-gallery';
import { Lightbox } from 'ng-gallery/lightbox';

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
