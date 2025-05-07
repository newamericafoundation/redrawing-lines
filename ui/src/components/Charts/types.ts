import { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';

export type Series<T extends GeoJsonProperties> = {
    name: string;
    data: FeatureCollection<Geometry, T>;
};
