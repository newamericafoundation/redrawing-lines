import { SchoolDistrictFeature } from 'src/lib/appState';
import styles from 'src/features/Panel/Panel.module.css';
import { Typography } from 'src/components/Typography';
import { SchoolDistrVariable } from 'src/types';

type Props = {
    comparison: SchoolDistrictFeature;
};

export const Redistricting: React.FC<Props> = (props) => {
    const { comparison } = props;

    const sqTaxPerPupil = Math.round(
        comparison.feature.properties[SchoolDistrVariable.StatusQuoTaxPerPupil]
    ).toLocaleString('en-us');

    const sqStatewideTaxPct =
        100 -
        comparison.feature.properties[
            SchoolDistrVariable.StatusQuoTaxPctStatewide
        ];

    const taxPerPupil = Math.round(
        comparison.feature.properties[SchoolDistrVariable.TaxPerPupil]
    ).toLocaleString('en-us');

    const statewideTaxPct =
        100 -
        comparison.feature.properties[SchoolDistrVariable.TaxPctStatewide];

    return (
        <section
            className={`${styles.improvementEntryWrapper} ${styles.marginTop}`}
        >
            <div className={styles.improvementEntry}>
                <Typography
                    variant="h6"
                    className={styles.improvementEntryTitle}
                >
                    <strong>Before redistricting,</strong>
                </Typography>
                <Typography variant="body">
                    this district would raise
                </Typography>
                <Typography variant="body-large">
                    ${sqTaxPerPupil} per pupil
                </Typography>
                <Typography variant="body">
                    from a 1% property tax, which is
                </Typography>
                <Typography variant="body-large">
                    {Math.abs(sqStatewideTaxPct).toFixed(1)}%{' '}
                    {sqStatewideTaxPct >= 0 ? 'more' : 'less'}
                </Typography>
                <Typography variant="body">
                    than what a statewide 1% property tax would raise per pupil.
                </Typography>
            </div>
            <div className={styles.improvementEntry}>
                <Typography
                    variant="h6"
                    className={styles.improvementEntryTitle}
                >
                    <strong>After redistricting,</strong>
                </Typography>
                <Typography variant="body">
                    this district would raise
                </Typography>
                <Typography variant="body-large">
                    ${taxPerPupil} per pupil
                </Typography>
                <Typography variant="body">
                    from a 1% property tax, which is
                </Typography>
                <Typography variant="body-large">
                    {Math.abs(statewideTaxPct).toFixed(1)}%{' '}
                    {statewideTaxPct >= 0 ? 'more' : 'less'}
                </Typography>
                <Typography variant="body">
                    than what a statewide 1% property tax would raise per pupil.
                </Typography>
            </div>
        </section>
    );
};
