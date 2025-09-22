import { useEffect, useState } from 'react';
import { Typography } from 'src/components/Typography';
import useAppStore, { StateFeature } from 'src/lib/appState';
import { Model, StateLevelVariable } from 'src/types';
import styles from 'src/features/Popups/Popups.module.css';
import { invalidCountyStates } from 'src/features/Map/utils/filter';

type Props = {
    hoverFeature: StateFeature;
    otherFeature: StateFeature;
};

export const State: React.FC<Props> = (props) => {
    const { hoverFeature, otherFeature } = props;

    const model = useAppStore((state) => state.model);

    const [segrImprovement, setSegrImprovement] = useState<number>();
    const [fundImprovement, setFundImprovement] = useState<number>();
    const [econImprovement, setEconImprovement] = useState<number>();

    const [isInvalidState, setIsInvalidState] = useState<boolean>(false);

    useEffect(() => {
        if (!hoverFeature || !otherFeature) {
            return;
        }

        const primary =
            hoverFeature.which === 'primary' ? hoverFeature : otherFeature;
        const comparison =
            otherFeature.which === 'comparison' ? otherFeature : hoverFeature;

        const statusQuoEcon = Number(
            primary.feature.properties[StateLevelVariable.TheilEconomic]
        );
        const modelEcon = Number(
            comparison.feature.properties[StateLevelVariable.TheilEconomic]
        );

        const econImprovement = Math.round(
            ((statusQuoEcon - modelEcon) / statusQuoEcon) * 100
        );

        const statusQuoSegr = Number(
            primary.feature.properties[StateLevelVariable.ThielRacial]
        );
        const modelSegr = Number(
            comparison.feature.properties[StateLevelVariable.ThielRacial]
        );

        const segrImprovement = Math.round(
            ((statusQuoSegr - modelSegr) / statusQuoSegr) * 100
        );

        const statusQuoFund = Number(
            primary.feature.properties[StateLevelVariable.TheilFunding]
        );
        const modelFund = Number(
            comparison.feature.properties[StateLevelVariable.TheilFunding]
        );

        const fundImprovement = Math.round(
            ((statusQuoFund - modelFund) / statusQuoFund) * 100
        );

        setEconImprovement(econImprovement);
        setSegrImprovement(segrImprovement);
        setFundImprovement(fundImprovement);
    }, [hoverFeature, otherFeature]);

    useEffect(() => {
        if (!hoverFeature || !otherFeature) {
            return;
        }

        if (model !== Model.CountyConsolidated) {
            setIsInvalidState(false);
        } else {
            const feature =
                hoverFeature.which === 'primary'
                    ? hoverFeature.feature
                    : otherFeature.feature;

            const stateAcronym =
                feature.properties[
                    StateLevelVariable.StateAcronym
                ].toUpperCase();

            setIsInvalidState(invalidCountyStates.includes(stateAcronym));
        }
    }, [hoverFeature, otherFeature, model]);

    return (
        <>
            {isInvalidState ? (
                <>
                    <div className={styles.statePopupHeaderWrapper}>
                        <Typography variant="h5">
                            {
                                hoverFeature.feature.properties[
                                    StateLevelVariable.Name
                                ]
                            }
                        </Typography>
                    </div>

                    <hr />
                    <div>
                        <Typography variant="body-large">
                            District borders in{' '}
                            {
                                hoverFeature.feature.properties[
                                    StateLevelVariable.Name
                                ]
                            }{' '}
                            would not change from county-based redistricting.
                        </Typography>
                    </div>
                </>
            ) : (
                <>
                    <div className={styles.statePopupHeaderWrapper}>
                        <Typography variant="h5">
                            After redistricting,{' '}
                            {String(
                                hoverFeature.feature.properties[
                                    StateLevelVariable.Name
                                ]
                            )}{' '}
                            would have:
                        </Typography>
                    </div>

                    <hr />
                    <div>
                        {fundImprovement && (
                            <Typography variant="body-large">
                                {fundImprovement}% more tax-base equality
                            </Typography>
                        )}
                        {segrImprovement && (
                            <Typography variant="body-large">
                                {segrImprovement}% greater racial integration
                            </Typography>
                        )}
                        {econImprovement && (
                            <Typography variant="body-large">
                                {econImprovement}% greater economic integration
                            </Typography>
                        )}
                    </div>
                </>
            )}
        </>
    );
};
