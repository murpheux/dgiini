export interface ILocation {
    latitude: number;
    longitude: number;
    mapType?: string;
    zoom?: number;
}


export enum MapType {
    roadmap = 'roadmap',
    satellite = 'satellite',
    hybrid = 'hybrid',
    terrain = 'terrain'
}
