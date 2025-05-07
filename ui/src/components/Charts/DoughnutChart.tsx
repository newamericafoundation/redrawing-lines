import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import {
    GridComponent,
    TooltipComponent,
    TitleComponent,
    DatasetComponent,
    LegendComponent,
} from 'echarts/components';
import { PieChart, PieSeriesOption } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { GeoJsonProperties } from 'geojson';
import { Series } from 'src/components/Charts/types';
import { aggregateProperties } from 'src/components/Charts/utils';
import { useMemo } from 'react';
import { getFriendlyName } from 'src/utils/friendlyNames';

echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    LegendComponent,
    PieChart,
    CanvasRenderer,
]);

type Props<T extends GeoJsonProperties> = {
    series: Series<T>[];
    seriesOptions?: PieSeriesOption;
    properties: Array<keyof T>;
    title?: string;
    legend?: boolean;
};

const DoughnutChart = <T extends GeoJsonProperties>(props: Props<T>) => {
    const { title, series, properties, seriesOptions, legend = false } = props;

    const aggregatedSeries = useMemo(() => {
        return series.map((s) => aggregateProperties([s], properties));
    }, [series, properties]);

    const totals = aggregatedSeries.map((agg) =>
        agg.reduce((sum, p) => sum + p.value, 0)
    );

    const chartSeries = aggregatedSeries.map((agg, index) => {
        const radiusStep = 20;
        const innerRadius = 30 + index * radiusStep;
        const outerRadius = innerRadius + 20;

        return {
            type: 'pie',
            radius: [`${innerRadius}%`, `${outerRadius}%`],
            itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2,
            },
            name: series[index].name,
            ...seriesOptions,
            data: agg.map((p) => ({
                name: `${getFriendlyName(p.name)} (${Math.round(
                    (p.value / totals[index]) * 100
                )}%)`,
                value: p.value,
            })),
        };
    });

    const option: echarts.EChartsCoreOption = useMemo(
        () => ({
            title: title ? { text: title } : undefined,
            legend: legend
                ? {
                      orient: 'vertical',
                      left: 'left',
                      bottom: '15%',
                      textStyle: {
                          fontSize: 12,
                          fontWeight: 'bold',
                          textBorderColor: '#fff',
                          textBorderWidth: 2,
                      },
                      padding: [5, 20, 5, 0],
                  }
                : undefined,
            tooltip: {
                trigger: 'item',
                axisPointer: { type: 'shadow' },
            },
            toolbox: {
                feature: {
                    saveAsImage: {},
                },
            },
            series: chartSeries,
        }),
        [chartSeries, title, legend]
    );

    return (
        <ReactEChartsCore
            style={{ height: '100%', width: '100%' }}
            echarts={echarts}
            option={option}
            lazyUpdate={true}
            showLoading={series.some(
                (_series) => _series.data.features.length === 0
            )}
        />
    );
};

export default DoughnutChart;
