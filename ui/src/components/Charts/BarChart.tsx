import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import {
    GridComponent,
    ToolboxComponent,
    TooltipComponent,
    TitleComponent,
    LegendComponent,
    DatasetComponent,
} from 'echarts/components';

import { BarChart as _BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { useCallback, useMemo } from 'react';
import { ECElementEvent } from 'echarts/core';
import { getFriendlyName } from 'src/utils/friendlyNames';

echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    LegendComponent,
    ToolboxComponent,
    _BarChart,
    CanvasRenderer,
]);

type BarChartSeries = {
    name: string;
    data: number[];
};

type Props = {
    series: BarChartSeries[];
    properties: string[];
    title?: string;
    legend?: boolean;
    onChartClick?: (event: ECElementEvent) => void;
    onChartHover?: (event: ECElementEvent) => void;
};

const BarChart = (props: Props) => {
    const {
        title,
        series,
        properties,
        legend = false,
        onChartClick,
        onChartHover,
    } = props;

    const option: echarts.EChartsCoreOption = useMemo(
        () => ({
            title: title
                ? {
                      text: title,
                  }
                : undefined,
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow',
                },
                valueFormatter: (value: number) => `${value}%`,
            },
            grid: {
                left: '1%',
                right: '0%',
                bottom: '3%',
                containLabel: true,
            },
            legend: legend
                ? {

                  }
                : undefined,
            toolbox: {
                feature: {
                    saveAsImage: {},
                },
            },
            yAxis: {
                type: 'category',

                data: properties.map((property) => getFriendlyName(property)),
                axisLabel: {
                    hideOverlap: false,
                    width: 100,
                    overflow: 'truncate',
                    margin: 8,
                    textStyle: {
                        fontSize: 11,
                    },
                },
            },
            xAxis: {
                type: 'value',
                axisLabel: { interval: 0, rotate: -30 },
            },
            series: series.map((s) => ({
                type: 'bar',
                ...s,
            })),
        }),
        [series]
    );

    // TODO: this is a hack to allow click events without removing animations
    // if function changes even in metadata then chart full rerenders
    const _onChartClick = useCallback(
        onChartClick ? onChartClick : () => null,
        []
    );
    const _onChartHover = useCallback(
        onChartHover ? onChartHover : () => null,
        []
    );

    return (
        <ReactEChartsCore
            style={{
                height: '98%',
                width: '98%',
                marginLeft: '8px',
                // marginRight: '8px',
            }}
            echarts={echarts}
            option={option}
            lazyUpdate={true}
            onEvents={{
                click: _onChartClick,
                mouseover: _onChartHover,
            }}
        />
    );
};

export default BarChart;
