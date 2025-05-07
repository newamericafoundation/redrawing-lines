import { GeoJsonProperties } from 'geojson';
import { Series } from 'src/components/Charts/types';

export const aggregateProperties = <T extends GeoJsonProperties>(
    series: Series<T>[],
    properties: Array<keyof T>
): { source: string; name: string; value: number }[] => {
    const aggregatedProperties: {
        source: string;
        name: string;
        value: number;
    }[] = [];

    properties.forEach((property) => {
        series.forEach((_series) => {
            const features = _series.data.features;
            const sum = features.reduce(
                (sum, feature) => sum + Number(feature.properties![property]),
                0
            );
            aggregatedProperties.push({
                source: _series.name,
                name: String(property),
                value: sum,
            });
        });
    });

    return aggregatedProperties;
};
