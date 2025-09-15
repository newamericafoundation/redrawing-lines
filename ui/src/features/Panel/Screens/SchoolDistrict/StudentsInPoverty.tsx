import { FeatureCollection, Geometry } from 'geojson';
import useAppStore, { SchoolDistrictFeature } from 'src/lib/appState';
import {
    Model,
    RD_MODEL_COLOR,
    SchoolDistrictProperties,
    SchoolDistrVariable,
    STATEWIDE_COLOR,
    STATUS_QUO_COLOR,
} from 'src/types';
import { aggregateByProperties } from 'src/utils/aggregateByProperty';
import { toWholeNumber } from 'src/utils/wholeNumber';
import styles from 'src/features/Panel/Panel.module.css';
import { Typography } from 'src/components/Typography';
import { getFriendlyName } from 'src/utils/friendlyNames';

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
    const model = useAppStore((state) => state.model);

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
                    <strong>Status Quo District:</strong>
                </Typography>
                <Typography
                    variant="body-large"
                    className={styles.boldText}
                    style={{ color: STATUS_QUO_COLOR }}
                >
                    {sqPctStudentsInPoverty}%
                </Typography>
                <Typography variant="body">students in poverty</Typography>
            </div>
            <div className={styles.improvementEntry}>
                <Typography variant="body">
                    <strong>Statewide:</strong>
                </Typography>
                <Typography
                    variant="body-large"
                    className={styles.boldText}
                    style={{ color: STATEWIDE_COLOR }}
                >
                    {statePctStudentsInPoverty}%
                </Typography>
                <Typography variant="body">students in poverty</Typography>
            </div>
            <div className={styles.improvementEntry}>
                <Typography variant="body">
                    <strong>
                        {model === Model.Optimized
                            ? getFriendlyName(model)
                            : 'Merged'}{' '}
                        District:
                    </strong>
                </Typography>
                <Typography
                    variant="body-large"
                    className={styles.boldText}
                    style={{ color: RD_MODEL_COLOR }}
                >
                    {pctStudentsInPoverty}%
                </Typography>
                <Typography variant="body">students in poverty</Typography>
            </div>
        </section>
    );
};
