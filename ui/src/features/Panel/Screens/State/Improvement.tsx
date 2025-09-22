import { Typography } from 'src/components/Typography';
import styles from 'src/features/Panel/Panel.module.css';
import Tippy from '@tippyjs/react';
import Info from 'src/assets/Info';

type Props = {
    fundImprovement: number;
    segrImprovement: number;
    econImprovement: number;
};

export const Improvement: React.FC<Props> = (props) => {
    const { fundImprovement, segrImprovement, econImprovement } = props;

    return (
        <section className={styles.improvementWrapper}>
            <Tippy content="New districts have a more equal amount of assessed property valuation per pupil">
                <div className={styles.improvementGroup}>
                    <Typography
                        variant="body-large"
                        className={styles.improvementText}
                    >
                        {fundImprovement}% more tax-base equality
                    </Typography>
                    <Info />
                </div>
            </Tippy>
            <Tippy content="Student populations in new districts are more reflective of state racial demographics">
                <div className={styles.improvementGroup}>
                    <Typography
                        variant="body-large"
                        className={styles.improvementText}
                    >
                        {segrImprovement}% greater racial integration
                    </Typography>
                    <Info />
                </div>
            </Tippy>
            <Tippy content="Student poverty rates in new districts more closely match the state poverty rate">
                <div className={styles.improvementGroup}>
                    <Typography
                        variant="body-large"
                        className={styles.improvementText}
                    >
                        {econImprovement}% greater economic integration
                    </Typography>
                    <Info />
                </div>
            </Tippy>
        </section>
    );
};
