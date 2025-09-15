import { FeatureCollection, Geometry } from 'geojson';
import { SchoolDistrictFeature } from 'src/lib/appState';
import { SchoolDistrictProperties } from 'src/types';
import styles from 'src/features/Panel/Panel.module.css';
import { SchoolDistrictBarChart } from 'src/features/Panel/Screens/SchoolDistrict/Chart/BarChart';

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

    return (
        <section className={styles.chartWrapper}>
            <SchoolDistrictBarChart
                primary={primary}
                comparison={comparison}
                primaryFeatureCollection={primaryFeatureCollection}
            />
        </section>
    );
};

export default Chart;
