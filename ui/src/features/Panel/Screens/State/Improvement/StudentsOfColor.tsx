import { Typography } from 'src/components/Typography';
import styles from 'src/features/Panel/Panel.module.css';
import { StateFeature } from 'src/lib/appState';
import { StateLevelVariable } from 'src/types';

type Props = {
    primary: StateFeature;
    comparison: StateFeature;
};

export const StudentsOfColor: React.FC<Props> = (props) => {
    const { primary, comparison } = props;

    const q1Primary = Number(
        primary.feature.properties[StateLevelVariable.Q1StudentsOfColor]
    ).toFixed(1);

    const q4Primary = Number(
        primary.feature.properties[StateLevelVariable.Q4StudentsOfColor]
    ).toFixed(1);

    const q1Comparison = Number(
        comparison.feature.properties[StateLevelVariable.Q1StudentsOfColor]
    ).toFixed(1);

    const q4Comparison = Number(
        comparison.feature.properties[StateLevelVariable.Q4StudentsOfColor]
    ).toFixed(1);

    return (
        <>
            <Typography variant="h5" className={styles.improvementEntryTitle}>
                <strong>Changes in Racial Composition</strong>
            </Typography>
            <div className={styles.improvementEntryWrapper}>
                <div className={styles.improvementEntry}>
                    <Typography variant="h6">
                        <strong>Before redistricting:</strong>
                    </Typography>
                    <div className={styles.improvementSubEntryWrapper}>
                        <div className={styles.improvementSubEntry}>
                            <Typography variant="body">There were</Typography>
                            <Typography variant="body-large">
                                {q1Primary}% students of color
                            </Typography>
                            <Typography variant="body">
                                on average in the 25% of districts serving the{' '}
                                <strong>fewest</strong>.
                            </Typography>
                        </div>
                        <div className={styles.improvementSubEntry}>
                            <Typography variant="body">There were</Typography>
                            <Typography variant="body-large">
                                {q4Primary}% students of color
                            </Typography>
                            <Typography variant="body">
                                on average in the 25% of districts serving the{' '}
                                <strong>most</strong>.
                            </Typography>
                        </div>
                    </div>
                </div>
                <div className={styles.improvementEntry}>
                    <Typography variant="h6">
                        <strong>After redistricting:</strong>
                    </Typography>
                    <div className={styles.improvementSubEntryWrapper}>
                        <div className={styles.improvementSubEntry}>
                            <Typography variant="body">There were</Typography>
                            <Typography variant="body-large">
                                {q1Comparison}% students of color
                            </Typography>
                            <Typography variant="body">
                                on average in the 25% of districts serving the{' '}
                                <strong>fewest</strong>.
                            </Typography>
                        </div>
                        <div className={styles.improvementSubEntry}>
                            <Typography variant="body">There were</Typography>
                            <Typography variant="body-large">
                                {q4Comparison}% students of color
                            </Typography>
                            <Typography variant="body">
                                on average in the 25% of districts serving the{' '}
                                <strong>most</strong>.
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
