import { Typography } from 'src/components/Typography';
import styles from 'src/features/Panel/Panel.module.css';
import { StateFeature } from 'src/lib/appState';
import { StateLevelVariable } from 'src/types';

type Props = {
    primary: StateFeature;
    comparison: StateFeature;
};

export const PropertyTax: React.FC<Props> = (props) => {
    const { primary, comparison } = props;

    const q1Primary = Math.round(
        primary.feature.properties[StateLevelVariable.Q1PropertyTax]
    ).toLocaleString('en-us');

    const q4Primary = Math.round(
        primary.feature.properties[StateLevelVariable.Q4PropertyTax]
    ).toLocaleString('en-us');

    const q1Comparison = Math.round(
        comparison.feature.properties[StateLevelVariable.Q1PropertyTax]
    ).toLocaleString('en-us');

    const q4Comparison = Math.round(
        comparison.feature.properties[StateLevelVariable.Q4PropertyTax]
    ).toLocaleString('en-us');

    return (
        <div className={styles.improvementEntryWrapper}>
            <div className={styles.improvementEntry}>
                <Typography
                    variant="h6"
                    className={styles.improvementEntryTitle}
                >
                    <strong>Before redistricting:</strong>
                </Typography>
                <div className={styles.improvementSubEntryWrapper}>
                    <div className={styles.improvementSubEntry}>
                        <Typography variant="body">
                            The 25% of districts with the <strong>least</strong>{' '}
                            property wealth would raise{' '}
                        </Typography>
                        <Typography variant="body-large">
                            ${q1Primary}
                        </Typography>
                        <Typography variant="body">on average</Typography>
                    </div>
                    <div className={styles.improvementSubEntry}>
                        <Typography variant="body">
                            The 25% of districts with the <strong>most</strong>{' '}
                            property wealth would raise{' '}
                        </Typography>
                        <Typography variant="body-large">
                            ${q4Primary}
                        </Typography>
                        <Typography variant="body">on average</Typography>
                    </div>
                </div>
                <Typography
                    variant="body-large"
                    className={styles.improvementEntryTitle}
                >
                    <strong>per pupil from a 1% property tax</strong>
                </Typography>
            </div>
            <div className={styles.improvementEntry}>
                <Typography
                    variant="h6"
                    className={styles.improvementEntryTitle}
                >
                    <strong>After redistricting:</strong>
                </Typography>
                <div className={styles.improvementSubEntryWrapper}>
                    <div className={styles.improvementSubEntry}>
                        <Typography variant="body">
                            The 25% of districts with the <strong>least</strong>{' '}
                            property wealth would raise{' '}
                        </Typography>
                        <Typography variant="body-large">
                            ${q1Comparison}
                        </Typography>
                        <Typography variant="body">on average</Typography>
                    </div>
                    <div className={styles.improvementSubEntry}>
                        <Typography variant="body">
                            The 25% of districts with the <strong>most</strong>{' '}
                            property wealth would raise{' '}
                        </Typography>
                        <Typography variant="body-large">
                            ${q4Comparison}
                        </Typography>
                        <Typography variant="body">on average</Typography>
                    </div>
                </div>
                <Typography
                    variant="body-large"
                    className={styles.improvementEntryTitle}
                >
                    <strong>per pupil from a 1% property tax</strong>
                </Typography>
            </div>
        </div>
    );
};
