import useAppStore from 'src/lib/appState';
import styles from 'src/features/Indicators/Indicators.module.css';
import { Typography } from 'src/components/Typography';
import { getFriendlyName } from 'src/utils/friendlyNames';
import { Model } from 'src/types';

const Indicators: React.FC = () => {
    const model = useAppStore((state) => state.model);
    const infoPanelOpen = useAppStore((state) => state.infoPanelOpen);

    return (
        <div
            className={`${styles.indicatorsWrapper} ${
                infoPanelOpen ? styles.infoPanelOpen : ''
            }`}
        >
            <div className={styles.outer}>
                <div className={styles.indicator}>
                    <Typography variant="h4" as="h6">
                        {getFriendlyName(Model.StatusQuo)}
                    </Typography>
                </div>
            </div>
            <div className={styles.outer}>
                <div className={styles.indicator}>
                    <Typography variant="h4" as="h6">
                        {getFriendlyName(model)}
                    </Typography>
                </div>
            </div>
        </div>
    );
};

export default Indicators;
