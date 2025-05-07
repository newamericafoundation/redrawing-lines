import { FeatureCollection, Geometry } from 'geojson';
import { useState } from 'react';
import Doughnut from 'src/assets/Doughnut';
import IconButton from 'src/components/IconButton';
import { SchoolDistrictFeature } from 'src/lib/appState';
import { SchoolDistrictProperties } from 'src/types';
import { SchoolDistrictDoughnutChart } from './DoughnutChart';
import styles from 'src/features/Panel/Panel.module.css';
import { SchoolDistrictBarChart } from './BarChart';
import Bar from 'src/assets/Bar';

type Props = {
    primary: SchoolDistrictFeature;
    primaryFeatureCollection: FeatureCollection<
        Geometry,
        SchoolDistrictProperties
    >;
    comparison: SchoolDistrictFeature;
};

const Chart: React.FC<Props> = (props) => {
    const { primary, primaryFeatureCollection, comparison } = props;

    const [chart, setChart] = useState<'doughnut' | 'barchart'>('barchart');

    return (
        <section className={styles.chartWrapper}>
            {chart === 'doughnut' && (
                <SchoolDistrictDoughnutChart
                    primary={primary}
                    comparison={comparison}
                    primaryFeatureCollection={primaryFeatureCollection}
                />
            )}
            {chart === 'barchart' && (
                <SchoolDistrictBarChart
                    primary={primary}
                    comparison={comparison}
                    primaryFeatureCollection={primaryFeatureCollection}
                />
            )}
            <div className={styles.chartButtonWrapper}>
                <IconButton
                    label="Show bar chart"
                    onClick={() => setChart('barchart')}
                >
                    <Bar color={chart === 'barchart' ? '#005854' : '#000'} />
                </IconButton>
                <IconButton
                    label="Show doughnut chart"
                    onClick={() => setChart('doughnut')}
                >
                    <Doughnut
                        color={chart === 'doughnut' ? '#005854' : '#000'}
                    />
                </IconButton>
            </div>
        </section>
    );
};

export default Chart;
