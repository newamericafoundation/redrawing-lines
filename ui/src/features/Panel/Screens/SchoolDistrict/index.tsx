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
import Tippy from '@tippyjs/react';
import { PRIMARY_MAP_ID } from 'src/features/Map/Primary/config';
import { useMap } from 'src/contexts/MapContexts';

const SchoolDistrict: React.FC = () => {
    const schoolDistrict = useAppStore((state) => state.schoolDistrict);
    const otherSchoolDistrict = useAppStore(
        (state) => state.otherSchoolDistrict
    );
    const setSchoolDistrict = useAppStore((state) => state.setSchoolDistrict);
    const setOtherSchoolDistrict = useAppStore(
        (state) => state.setOtherSchoolDistrict
    );
    const state = useAppStore((state) => state.state);

    const [primary, setPrimary] = useState<SchoolDistrictFeature>();
    const [comparison, setComparison] = useState<SchoolDistrictFeature>();
    const [title, setTitle] = useState('');

    const { featureCollection } = useSchoolDistrictData('primary');
    const { goToState } = useStateMetricData('primary');

    const { geocoder } = useMap(PRIMARY_MAP_ID);

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
        setOtherSchoolDistrict(null);

        if (geocoder) {
            geocoder.setInput('');
        }
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
                </div>
                <Tippy content="Return to state view">
                    <div>
                        <IconButton
                            ariaLabel="Leave School District"
                            onClick={handleClick}
                        >
                            <Close className={styles.closeIcon} />
                        </IconButton>
                    </div>
                </Tippy>
            </section>
            {primary && comparison && (
                <>
                    <Redistricting primary={primary} comparison={comparison} />
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
