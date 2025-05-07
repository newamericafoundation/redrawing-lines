import { useEffect, useState } from 'react';
import useAppStore, { SchoolDistrictFeature } from 'src/lib/appState';
import { Redistricting } from './Redistricting';
import styles from 'src/features/Panel/Panel.module.css';
import Close from 'src/assets/Close';
import IconButton from 'src/components/IconButton';
import { Typography } from 'src/components/Typography';
import { useStateMetricData } from 'src/hooks/useStateMetricData';
import { StateLevelVariable, SchoolDistrVariable } from 'src/types';
import { createCleanLabelFunction } from 'src/utils/cleanLabels';
import { useSchoolDistrictData } from 'src/hooks/useSchoolDistrictData';
import { StudentsInPoverty } from './StudentsInPoverty';
import Chart from './Chart';

const SchoolDistrict: React.FC = () => {
    const schoolDistrict = useAppStore((state) => state.schoolDistrict);
    const otherSchoolDistrict = useAppStore(
        (state) => state.otherSchoolDistrict
    );
    const setSchoolDistrict = useAppStore((state) => state.setSchoolDistrict);
    const state = useAppStore((state) => state.state);

    const [primary, setPrimary] = useState<SchoolDistrictFeature>();
    const [comparison, setComparison] = useState<SchoolDistrictFeature>();
    const [title, setTitle] = useState('');

    const { featureCollection } = useSchoolDistrictData('primary');
    const { goToState } = useStateMetricData('primary');

    useEffect(() => {
        if (!schoolDistrict || !otherSchoolDistrict) {
            return;
        }

        const primary =
            schoolDistrict.which === 'primary'
                ? schoolDistrict
                : otherSchoolDistrict;
        const comparison =
            otherSchoolDistrict.which === 'comparison'
                ? otherSchoolDistrict
                : schoolDistrict;

        setPrimary(primary);
        setComparison(comparison);
    }, [schoolDistrict, otherSchoolDistrict]);

    useEffect(() => {
        if (!primary || !state) {
            return;
        }

        if (state) {
            const title = createCleanLabelFunction(
                state.feature.properties[StateLevelVariable.StateAcronym]
            )(primary.feature.properties[SchoolDistrVariable.Name] ?? '');

            setTitle(title);
        }
    }, [primary, state]);

    const handleClick = () => {
        if (!state) {
            return;
        }
        goToState(state.feature.properties[StateLevelVariable.StateAcronym]);
        setSchoolDistrict(null);
    };

    return (
        <div className={`${styles.flex} ${styles.infoWrapper}`}>
            <section
                className={`${styles.flex} ${styles.marginTop} ${styles.justifyBetween}`}
            >
                <div>
                    <Typography variant="h3" className={styles.textTeal}>
                        {title}
                    </Typography>
                    <Typography variant="h4">Status Quo</Typography>
                </div>
                <IconButton label="Leave State" onClick={handleClick}>
                    <Close className={styles.closeIcon} />
                </IconButton>
            </section>
            {primary && comparison && (
                <>
                    <Redistricting comparison={comparison} />
                    <StudentsInPoverty
                        primary={primary}
                        comparison={comparison}
                        primaryFeatureCollection={featureCollection}
                    />
                    <Chart
                        primary={primary}
                        comparison={comparison}
                        primaryFeatureCollection={featureCollection}
                    />
                </>
            )}
        </div>
    );
};

export default SchoolDistrict;
