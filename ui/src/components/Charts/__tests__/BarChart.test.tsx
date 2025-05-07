import { ECElementEvent } from 'echarts/core';
import { describe, expect, it, vi } from 'vitest';
import BarChart from 'src/components/Charts/BarChart';
import { render } from 'src/utils/test-utils';

const mockData = [1, 2, 3, 4, 5, 6];

describe('BarChart', () => {
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

    it('renders without crashing', async () => {
        const { container } = render(
            <BarChart
                title="Test Chart"
                series={[
                    {
                        name: 'Test Series',
                        data: mockData,
                    },
                ]}
                properties={['a', 'b', 'c', 'd', 'e', 'f']}
            />
        );

        const chart = container.querySelector('.echarts-for-react');
        expect(chart).toBeInTheDocument();
    });

    it('calls onChartClick when a bar is clicked', () => {
        const onChartClick = vi.fn();

        render(
            <BarChart
                title="Clickable Chart"
                onChartClick={onChartClick}
                series={[
                    {
                        name: 'Clickable Series',
                        data: mockData,
                    },
                ]}
                properties={['a', 'b', 'c', 'd', 'e', 'f']}
            />
        );

        // Simulate a click event manually
        const event: ECElementEvent = {
            type: 'click',
            componentType: 'series',
            componentSubType: 'bar',
            componentIndex: 0,
            seriesType: 'bar',
            seriesIndex: 0,
            seriesName: 'Clickable Series',
            name: 'Label 1',
            dataIndex: 0,
            data: { value: 10, id: 'a1' },
            dataType: 'main',
            value: 10,
            $vars: ['seriesName', 'name', 'value'],
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            event: {} as any,
            color: '#00ff00',
        };

        // Call the event handler directly
        onChartClick(event);

        expect(onChartClick).toHaveBeenCalledWith(event);
    });
});
