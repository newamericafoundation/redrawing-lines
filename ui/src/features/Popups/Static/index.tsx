import styles from 'src/features/Popups/Popups.module.css';
import useAppStore, { InteractiveFeature } from 'src/lib/appState';
import { State } from 'src/features/Popups/Static/State';
import { SchoolDistrict } from 'src/features/Popups/Static/SchoolDistrict';
import { NoDataPopup } from 'src/features/Popups/NoData';

type Props = {
    hoverFeature: InteractiveFeature | null;
    otherFeature: InteractiveFeature | null;
};

export const StaticPopup: React.FC<Props> = ({
    hoverFeature,
    otherFeature,
}) => {
    const infoPanelOpen = useAppStore((state) => state.infoPanelOpen);
    const showNoData = useAppStore((state) => state.showNoData);

    const containerClass = [
        styles.static,
        infoPanelOpen && styles.infoPanelOpen,
        showNoData ? styles.noData : styles.data,
    ]
        .filter(Boolean)
        .join(' ');

    const renderContent = () => {
        if (showNoData) return <NoDataPopup />;

        if (!hoverFeature || !otherFeature) return null;

        if (hoverFeature.level === 'state' && otherFeature.level === 'state') {
            return (
                <State
                    hoverFeature={hoverFeature}
                    otherFeature={otherFeature}
                />
            );
        }

        if (hoverFeature.level === 'school-district') {
            return <SchoolDistrict hoverFeature={hoverFeature} />;
        }

        return null;
    };

    return <div className={containerClass}>{renderContent()}</div>;
};
