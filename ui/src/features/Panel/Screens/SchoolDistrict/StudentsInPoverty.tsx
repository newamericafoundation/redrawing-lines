import { FeatureCollection, Geometry } from 'geojson';
import { SchoolDistrictFeature } from 'src/lib/appState';
import { SchoolDistrictProperties, SchoolDistrVariable } from 'src/types';
import { aggregateByProperties } from 'src/utils/aggregateByProperty';
import { toWholeNumber } from 'src/utils/wholeNumber';
import styles from 'src/features/Panel/Panel.module.css';
import { Typography } from 'src/components/Typography';

type Props = {
    primary: SchoolDistrictFeature;
    primaryFeatureCollection: FeatureCollection<
        Geometry,
        SchoolDistrictProperties
    >;
    comparison: SchoolDistrictFeature;
};

const getPovertyPercentage = (props: SchoolDistrictProperties): number => {
    const total = props[SchoolDistrVariable.TotalChildren];
    const poverty = props[SchoolDistrVariable.ChildrenInPoverty];
    return total > 0 ? toWholeNumber(poverty / total) : 0;
};

export const StudentsInPoverty: React.FC<Props> = ({
    primary,
    primaryFeatureCollection,
    comparison,
}) => {
    const sqPctStudentsInPoverty = getPovertyPercentage(
        primary.feature.properties
    );
    const pctStudentsInPoverty = getPovertyPercentage(
        comparison.feature.properties
    );

    const stateAggregates = aggregateByProperties(primaryFeatureCollection, [
        SchoolDistrVariable.ChildrenInPoverty,
        SchoolDistrVariable.TotalChildren,
    ]);

    const stateTotalChildren =
        stateAggregates[SchoolDistrVariable.TotalChildren] ?? 0;
    const stateChildrenInPoverty =
        stateAggregates[SchoolDistrVariable.ChildrenInPoverty] ?? 0;

    const statePctStudentsInPoverty =
        stateTotalChildren > 0
            ? toWholeNumber(stateChildrenInPoverty / stateTotalChildren)
            : 0;

    return (
        <section
            className={`${styles.improvementEntryWrapper}  ${styles.marginTop} ${styles.marginBottom}`}
        >
            <div className={styles.improvementEntry}>
                <Typography variant="body">
                    <strong>Current District:</strong>
                </Typography>
                <Typography variant="body-large">
                    {sqPctStudentsInPoverty}%
                </Typography>
                <Typography variant="body">students in poverty</Typography>
            </div>
            <div className={styles.improvementEntry}>
                <Typography variant="body">
                    <strong>State:</strong>
                </Typography>
                <Typography variant="body-large">
                    {statePctStudentsInPoverty}%
                </Typography>
                <Typography variant="body">students in poverty</Typography>
            </div>
            <div className={styles.improvementEntry}>
                <Typography variant="body">
                    <strong>Proposed District:</strong>
                </Typography>
                <Typography variant="body-large">
                    {pctStudentsInPoverty}%
                </Typography>
                <Typography variant="body">students in poverty</Typography>
            </div>
        </section>
    );
};
