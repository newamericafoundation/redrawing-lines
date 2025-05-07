import { SubLayerId as PrimaryLayerId } from 'src/features/Map/Primary/config';
import { SubLayerId as ComparisonLayerId } from 'src/features/Map/Comparison/config';
import { Which } from 'src/lib/appState';

export const getLayerIds = (
    which: Which,
    level: 'state' | 'school-district' | undefined
): { fill: string[]; line: string[] } => {
    const isPrimary = which === 'primary';
    if (level) {
        const isState = level === 'state';

        const Primary = {
            state: {
                fill: [PrimaryLayerId.StateMetricsSQFill],
                line: [PrimaryLayerId.StateMetricsSQBoundary],
            },
            district: {
                fill: [PrimaryLayerId.SchoolDistrictsSQFill],
                line: [PrimaryLayerId.SchoolDistictsSQBoundary],
            },
        };

        const Comparison = {
            state: {
                fill: [
                    ComparisonLayerId.StateMetricsSQFill,
                    ComparisonLayerId.StateMetricsOptimFill,
                    ComparisonLayerId.StateMetricsConsolFill,
                    ComparisonLayerId.StateMetricsCountyFill,
                ],
                line: [
                    ComparisonLayerId.StateMetricsSQBoundary,
                    ComparisonLayerId.StateMetricsOptimBoundary,
                    ComparisonLayerId.StateMetricsConsolBoundary,
                    ComparisonLayerId.StateMetricsCountyBoundary,
                ],
            },
            district: {
                fill: [
                    ComparisonLayerId.SchoolDistrictsSQFill,
                    ComparisonLayerId.SchoolDistrictsOptimFill,
                    ComparisonLayerId.SchoolDistrictsConsolFill,
                    ComparisonLayerId.SchoolDistrictsCountyFill,
                ],
                line: [
                    ComparisonLayerId.SchoolDistrictsSQBoundary,
                    ComparisonLayerId.SchoolDistrictsOptimBoundary,
                    ComparisonLayerId.SchoolDistrictsConsolBoundary,
                    ComparisonLayerId.SchoolDistrictsCountyBoundary,
                ],
            },
        };

        if (isPrimary) {
            return isState ? Primary.state : Primary.district;
        } else {
            return isState ? Comparison.state : Comparison.district;
        }
    } else {
        const Primary = {
            fill: [
                PrimaryLayerId.StateMetricsSQFill,
                PrimaryLayerId.SchoolDistrictsSQFill,
            ],
            line: [
                PrimaryLayerId.StateMetricsSQBoundary,
                PrimaryLayerId.SchoolDistictsSQBoundary,
            ],
        };

        const Comparison = {
            fill: [
                ComparisonLayerId.StateMetricsSQFill,
                ComparisonLayerId.StateMetricsOptimFill,
                ComparisonLayerId.StateMetricsConsolFill,
                ComparisonLayerId.StateMetricsCountyFill,
                ComparisonLayerId.SchoolDistrictsSQFill,
                ComparisonLayerId.SchoolDistrictsOptimFill,
                ComparisonLayerId.SchoolDistrictsConsolFill,
                ComparisonLayerId.SchoolDistrictsCountyFill,
            ],
            line: [
                ComparisonLayerId.StateMetricsSQBoundary,
                ComparisonLayerId.StateMetricsOptimBoundary,
                ComparisonLayerId.StateMetricsConsolBoundary,
                ComparisonLayerId.StateMetricsCountyBoundary,
                ComparisonLayerId.SchoolDistrictsSQBoundary,
                ComparisonLayerId.SchoolDistrictsOptimBoundary,
                ComparisonLayerId.SchoolDistrictsConsolBoundary,
                ComparisonLayerId.SchoolDistrictsCountyBoundary,
            ],
        };

        if (isPrimary) {
            return Primary;
        } else {
            return Comparison;
        }
    }
};
