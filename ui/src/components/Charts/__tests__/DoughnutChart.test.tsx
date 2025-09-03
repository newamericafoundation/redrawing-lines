import { GeoJsonProperties } from 'geojson';
import { describe, expect, it } from 'vitest';
import { Series } from 'src/components/Charts/types';
import { render } from 'src/utils/test-utils';
import DoughnutChart from 'src/components/Charts/DoughnutChart';

type TestProps = GeoJsonProperties & {
    name: string;
    a: number;
    b: number;
};

const mockSeries: Series<TestProps>[] = [
    {
        name: 'Series A',
        data: {
            type: 'FeatureCollection',
            features: [
                {
                    type: 'Feature',
                    properties: { name: 'Item 1', a: 100, b: 200 },
                    geometry: { type: 'Point', coordinates: [0, 0] },
                },
                {
                    type: 'Feature',
                    properties: { name: 'Item 2', a: 150, b: 250 },
                    geometry: { type: 'Point', coordinates: [0, 0] },
                },
            ],
        },
    },
    {
        name: 'Series B',
        data: {
            type: 'FeatureCollection',
            features: [
                {
                    type: 'Feature',
                    properties: { name: 'Item 1', a: 200, b: 300 },
                    geometry: { type: 'Point', coordinates: [0, 0] },
                },
                {
                    type: 'Feature',
                    properties: { name: 'Item 2', a: 250, b: 350 },
                    geometry: { type: 'Point', coordinates: [0, 0] },
                },
            ],
        },
    },
];

describe('RadarChart', () => {
    beforeEach(() => {
        Object.defineProperty(HTMLElement.prototype, 'clientWidth', {
            configurable: true,
            value: 800,
        });
        Object.defineProperty(HTMLElement.prototype, 'clientHeight', {
            configurable: true,
            value: 600,
        });
    });

    it('renders the radar chart container', () => {
        const { container } = render(
            <DoughnutChart
                series={mockSeries}
                properties={['a', 'b']}
                title="Test Radar"
            />
        );

        const chart = container.querySelector('.echarts-for-react');
        expect(chart).toBeInTheDocument();
    });
});
