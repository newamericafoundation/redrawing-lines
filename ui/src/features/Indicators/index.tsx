import useAppStore from 'src/lib/appState';
import styles from 'src/features/Indicators/Indicators.module.css';
import { Typography } from 'src/components/Typography';
import { getFriendlyName } from 'src/utils/friendlyNames';
import { Model } from 'src/types';
import Info from 'src/assets/Info';
import Tippy from '@tippyjs/react';
import { getTooltipContent } from 'src/features/Indicators/utils';

type Props = {
    showReportLayout: boolean;
};

const Indicators: React.FC<Props> = (props) => {
    const { showReportLayout } = props;

    const model = useAppStore((state) => state.model);
    const infoPanelOpen = useAppStore((state) => state.infoPanelOpen);

    return (
        <div
            className={`${styles.indicatorsWrapper} ${
                infoPanelOpen ? styles.infoPanelOpen : ''
            }
            ${showReportLayout ? '' : styles.headerOffset}
            `}
        >
            <Tippy content={getTooltipContent(Model.StatusQuo)}>
                <div className={styles.outer}>
                    <div className={styles.indicator}>
                        <Typography variant="h4" as="h6">
                            {getFriendlyName(Model.StatusQuo)}
                        </Typography>
                        <Info />
                    </div>
                </div>
            </Tippy>
            <Tippy content={getTooltipContent(model)}>
                <div className={styles.outer}>
                    <div className={styles.indicator}>
                        <Typography variant="h4" as="h6">
                            {getFriendlyName(model)}
                        </Typography>
                        <Info />
                    </div>
                </div>
            </Tippy>
        </div>
    );
};

export default Indicators;
