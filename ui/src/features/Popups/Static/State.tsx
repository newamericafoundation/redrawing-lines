import { useEffect, useState } from 'react';
import { Typography } from 'src/components/Typography';
import { StateFeature } from 'src/lib/appState';
import { StateLevelVariable } from 'src/types';
import styles from 'src/features/Popups/Popups.module.css';

type Props = {
    hoverFeature: StateFeature;
    otherFeature: StateFeature;
};

export const State: React.FC<Props> = (props) => {
    const { hoverFeature, otherFeature } = props;

    const [segrImprovement, setSegrImprovement] = useState<number>();
    const [fundImprovement, setFundImprovement] = useState<number>();
    const [econImprovement, setEconImprovement] = useState<number>();

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

    return (
        <>
            <div className={styles.statePopupHeaderWrapper}>
                <Typography variant="h5">
                    After redistricting,{' '}
                    {String(
                        hoverFeature.feature.properties[StateLevelVariable.Name]
                    )}{' '}
                    would have:
                </Typography>
            </div>

            <hr />
            <div className={styles.statePopupContentWrapper}>
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
    );
};
