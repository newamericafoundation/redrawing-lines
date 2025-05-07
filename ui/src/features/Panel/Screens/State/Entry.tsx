import { Typography } from 'src/components/Typography';
import { StateLevelVariable } from 'src/types';
import { getFriendlyName } from 'src/utils/friendlyNames';
import { getOrdinalSuffix } from 'src/utils/ordinalSuffix';
import styles from 'src/features/Panel/Panel.module.css';

type Props = {
    value: number;
    variable: StateLevelVariable;
};

export const Entry: React.FC<Props> = (props) => {
    const { value, variable } = props;

    return (
        <div>
            <Typography variant="body-large" as="h5">
                {getFriendlyName(variable)}
            </Typography>
            <Typography variant="body-large" className={styles.indent}>
                {value}
                {getOrdinalSuffix(value)} highest in the nation.
            </Typography>
        </div>
    );
};
