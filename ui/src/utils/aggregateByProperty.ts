import { FeatureCollection, Geometry } from 'geojson';

export const aggregateByProperties = <
    T extends Record<string, string | number>
>(
    featureCollection: FeatureCollection<Geometry, T>,
    properties: Array<keyof T>
): Partial<Record<keyof T, number>> => {
    const aggregates: Partial<Record<keyof T, number>> = {};

    properties.forEach((property) => {
        aggregates[property] = 0;
    });

    featureCollection.features.forEach((feature) => {
        properties.forEach((property) => {
            const value = Number(feature.properties[property]);
            if (!isNaN(value)) {
                aggregates[property]! += value;
            }
        });
    });

    return aggregates;
};
