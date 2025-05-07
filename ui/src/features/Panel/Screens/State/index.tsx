import { useEffect, useState } from 'react';
import Close from 'src/assets/Close';
import IconButton from 'src/components/IconButton';
import { Typography } from 'src/components/Typography';
import { useMap } from 'src/contexts/MapContexts';
import { PRIMARY_MAP_ID } from 'src/features/Map/Primary/config';
import styles from 'src/features/Panel/Panel.module.css';
import { useStateMetricData } from 'src/hooks/useStateMetricData';
import useAppStore, { StateFeature } from 'src/lib/appState';
import { StateLevelVariable } from 'src/types';
import Carousel from 'src/components/Carousel';
import { StudentsOfColor } from './Improvement/StudentsOfColor';
import { toWholeNumber } from 'src/utils/wholeNumber';
import { PropertyTax } from './Improvement/PropertyTax';
import { ChildPovertyRate } from './Improvement/ChildPovertyRate';

const State: React.FC = () => {
    const state = useAppStore((state) => state.state);
    const otherState = useAppStore((state) => state.otherState);
    const setState = useAppStore((state) => state.setState);
    const model = useAppStore((state) => state.model);

    const { fetchStates } = useStateMetricData('comparison');

    const { map } = useMap(PRIMARY_MAP_ID);

    const [primary, setPrimary] = useState<StateFeature>();
    const [comparison, setComparison] = useState<StateFeature>();

    const [segrImprovement, setSegrImprovement] = useState<number>();
    const [fundImprovement, setFundImprovement] = useState<number>();
    const [econImprovement, setEconImprovement] = useState<number>();

    useEffect(() => {
        void fetchStates();
    }, [model]);

    const handleClick = () => {
        if (!map) {
            return;
        }

        map.fitBounds(
            [
                [-125.0011, 24.9493], // Southwest corner [lng, lat]
                [-66.9326, 49.5904], // Northeast corner [lng, lat]
            ],
            {
                padding: { left: 50, right: 50 },
            }
        );
        setState(null);
    };

    useEffect(() => {
        if (!state || !otherState) {
            return;
        }

        const primary = state.which === 'primary' ? state : otherState;
        const comparison =
            otherState.which === 'comparison' ? otherState : state;

        setPrimary(primary);
        setComparison(comparison);
    }, [state, otherState]);

    useEffect(() => {
        if (!primary || !comparison) {
            return;
        }

        const statusQuoEcon = Number(
            primary.feature.properties[StateLevelVariable.TheilEconomic]
        );
        const modelEcon = Number(
            comparison.feature.properties[StateLevelVariable.TheilEconomic]
        );

        const econImprovement = toWholeNumber(
            (statusQuoEcon - modelEcon) / statusQuoEcon
        );

        const statusQuoSegr = Number(
            primary.feature.properties[StateLevelVariable.ThielRacial]
        );
        const modelSegr = Number(
            comparison.feature.properties[StateLevelVariable.ThielRacial]
        );

        const segrImprovement = toWholeNumber(
            (statusQuoSegr - modelSegr) / statusQuoSegr
        );

        const statusQuoFund = Number(
            primary.feature.properties[StateLevelVariable.TheilFunding]
        );
        const modelFund = Number(
            comparison.feature.properties[StateLevelVariable.TheilFunding]
        );

        const fundImprovement = toWholeNumber(
            (statusQuoFund - modelFund) / statusQuoFund
        );

        setEconImprovement(econImprovement);
        setSegrImprovement(segrImprovement);
        setFundImprovement(fundImprovement);
    }, [primary, comparison]);

    return (
        <>
            {state && otherState && (
                <>
                    <div className={`${styles.flex} ${styles.infoWrapper}`}>
                        <div className={`${styles.flex} ${styles.marginTop}`}>
                            <div>
                                <Typography
                                    variant="h3"
                                    className={styles.textTeal}
                                >
                                    {String(
                                        state.feature.properties[
                                            StateLevelVariable.Name
                                        ]
                                    )}
                                </Typography>
                            </div>

                            <IconButton
                                label="Leave State"
                                onClick={handleClick}
                                className={styles.marginLeftAuto}
                            >
                                <Close className={styles.closeIcon} />
                            </IconButton>
                        </div>

                        <hr />
                        <section className={styles.improvementWrapper}>
                            {fundImprovement && (
                                <Typography
                                    variant="body-large"
                                    className={styles.improvementText}
                                >
                                    {fundImprovement}% more tax-base equality
                                </Typography>
                            )}
                            {segrImprovement && (
                                <Typography
                                    variant="body-large"
                                    className={styles.improvementText}
                                >
                                    {segrImprovement}% greater racial
                                    integration
                                </Typography>
                            )}
                            {econImprovement && (
                                <Typography
                                    variant="body-large"
                                    className={styles.improvementText}
                                >
                                    {econImprovement}% greater economic
                                    integration
                                </Typography>
                            )}
                        </section>
                        {primary && comparison && (
                            <section className={styles.improvementWrapper}>
                                <Carousel
                                    id="state-improvement"
                                    slides={[
                                        <PropertyTax
                                            primary={primary}
                                            comparison={comparison}
                                        />,
                                        <StudentsOfColor
                                            primary={primary}
                                            comparison={comparison}
                                        />,
                                        <ChildPovertyRate
                                            primary={primary}
                                            comparison={comparison}
                                        />,
                                    ]}
                                />
                            </section>
                        )}
                    </div>
                </>
            )}
        </>
    );
};

export default State;
