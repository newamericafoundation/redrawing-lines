import { PieSeriesOption } from 'echarts/charts';
import { Feature, FeatureCollection, Geometry } from 'geojson';
import { useMemo } from 'react';
import _DoughnutChart from 'src/components/Charts/DoughnutChart';
import {
    Model,
    SchoolDistrictProperties,
    StateMetricProperties,
} from 'src/types';
import { getFriendlyName } from 'src/utils/friendlyNames';

type Props<T extends StateMetricProperties | SchoolDistrictProperties> = {
    features: { model: Model; feature: Feature<Geometry, T> }[];
    chartProperties: Array<keyof T>;
    options?: PieSeriesOption;
    legend?: boolean;
    title?: string;
};

export const DoughnutChart = <
    T extends StateMetricProperties | SchoolDistrictProperties
>(
    props: Props<T>
) => {
    const { features, chartProperties, options, title, legend = false } = props;

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

    return (
        <_DoughnutChart
            title={title}
            properties={chartProperties}
            series={series}
            seriesOptions={options}
            legend={legend}
        />
    );
};
