import { Feature, FeatureCollection, Geometry } from 'geojson';
import { useMemo } from 'react';
import _RadarChart from 'src/components/Charts/RadarChart';
import {
    Model,
    SchoolDistrictProperties,
    StateMetricProperties,
} from 'src/types';
import { getFriendlyName } from 'src/utils/friendlyNames';

type Props<T extends StateMetricProperties | SchoolDistrictProperties> = {
    features: { model: Model; feature: Feature<Geometry, T> }[];
    chartProperties: Array<keyof T>;
};

export const RadarChart = <
    T extends StateMetricProperties | SchoolDistrictProperties
>(
    props: Props<T>
) => {
    const { features, chartProperties } = props;

    const series: {
        name: string;
        data: FeatureCollection<Geometry, T>;
    }[] = useMemo(
        () =>
            features.map(({ model, feature }) => ({
                name: getFriendlyName(model),
                data: {
                    type: 'FeatureCollection',
                    features: feature ? [feature] : [],
                },
            })),
        [features]
    );

    return <_RadarChart properties={chartProperties} series={series} />;
};
