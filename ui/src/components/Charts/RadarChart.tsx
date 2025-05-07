import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import {
    GridComponent,
    TooltipComponent,
    TitleComponent,
    DatasetComponent,
    LegendComponent,
} from 'echarts/components';

import { RadarChart as _RadarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { GeoJsonProperties } from 'geojson';
import { Series } from 'src/components/Charts/types';
import { aggregateProperties } from 'src/components/Charts/utils';
import { getFriendlyName } from 'src/utils/friendlyNames';
import { useMemo } from 'react';

echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    LegendComponent,
    _RadarChart,
    CanvasRenderer,
]);

type Props<T extends GeoJsonProperties> = {
    series: Series<T>[];
    properties: Array<keyof T>;
    title?: string;
    legend?: boolean;
};

const RadarChart = <T extends GeoJsonProperties>(props: Props<T>) => {
    const { title, series, properties, legend = false } = props;

    const aggregatedProperties = useMemo(
        () => aggregateProperties(series, properties),
        [series, properties]
    );

    const option: echarts.EChartsCoreOption = useMemo(
        () => ({
            title: title
                ? {
                      text: title,
                  }
                : undefined,
            legend: legend
                ? {
                      data: ['PLACEHOLDER'],
                  }
                : undefined,
            tooltip: {
                trigger: 'item',
                axisPointer: {
                    type: 'shadow',
                },
            },
            grid: {
                left: '1%',
                right: '0%',
                bottom: '3%',
                containLabel: true,
            },
            radar: {
                // shape: 'circle',
                indicator: properties
                    .sort((a, b) => String(a).localeCompare(String(b)))
                    .map((property) => ({
                        name: getFriendlyName(String(property)),
                        max:
                            Math.max(
                                ...aggregatedProperties
                                    .filter(
                                        (_aggregatedProperties) =>
                                            _aggregatedProperties.name ===
                                            property
                                    )
                                    .map((_aggregatedProperties) =>
                                        Number(
                                            _aggregatedProperties.value.toFixed(
                                                2
                                            )
                                        )
                                    )
                            ) + 1000,
                    })),

                name: {
                    formatter: (name: string) =>
                        name
                            .split(' ')
                            .map((word, i) =>
                                i % 2 === 0 ? word + '\n' : word
                            )
                            .join(' '),
                    textStyle: {
                        fontSize: 11,
                        color: '#444',
                    },
                },
                radius: '75%',
            },
            series: [
                {
                    name: 'Test',
                    type: 'radar',
                    data: series.map((_series) => ({
                        name: _series.name,
                        value: aggregatedProperties
                            .filter(
                                (_aggregatedProperties) =>
                                    _aggregatedProperties.source ===
                                    _series.name
                            )
                            .sort((a, b) =>
                                String(a.name).localeCompare(String(b.name))
                            )
                            .map((_aggregatedProperties) =>
                                Number(_aggregatedProperties.value.toFixed(2))
                            ),
                    })),
                    label: {
                        show: true,
                        formatter: function (params: { value: number }) {
                            return Math.round(params.value).toLocaleString(
                                'en-us'
                            );
                        },
                    },
                },
            ],
        }),
        [aggregatedProperties, title, series]
    );

    return (
        <ReactEChartsCore
            style={{
                height: '100%',
                width: '100%',
                margin: '0 auto',
            }}
            echarts={echarts}
            option={option}
            lazyUpdate={true}
            showLoading={series.some(
                (_series) => _series.data.features.length === 0
            )}
        />
    );
};

export default RadarChart;
