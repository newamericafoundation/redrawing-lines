import { Typography } from 'src/components/Typography';
import { StateLevelVariable } from 'src/types';
import { getFriendlyName } from 'src/utils/friendlyNames';
import styles from 'src/features/Panel/Panel.module.css';

type Props = {
    value: number;
    variable: StateLevelVariable;
};

export const Improvement: React.FC<Props> = (props) => {
    const { value, variable } = props;

    return (
        <div>
            <Typography variant="body-large" className={styles.improvementText}>
                {Math.round(value * 100)}% improvement in{' '}
                {getFriendlyName(variable)}
            </Typography>
        </div>
    );
};
