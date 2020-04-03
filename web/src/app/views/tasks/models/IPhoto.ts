export class IPhoto {
    photo: string;
    filename: string;
    filetype: ImageFilType;
}


export enum ImageFilType {
    'image/png',
    'image/jpeg',
    'image/gif',
    'image/tiff',
    'image/bmp',
}