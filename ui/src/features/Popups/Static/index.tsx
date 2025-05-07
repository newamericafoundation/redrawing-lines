import styles from 'src/features/Popups/Popups.module.css';
import { InteractiveFeature } from 'src/lib/appState';
import { State } from 'src/features/Popups/Static/State';
import { SchoolDistrict } from 'src/features/Popups/Static/SchoolDistrict';

type Props = {
    hoverFeature: InteractiveFeature;
    otherFeature: InteractiveFeature;
};
export const StaticPopup: React.FC<Props> = (props) => {
    const { hoverFeature, otherFeature } = props;

    return (
        <div className={styles.static}>
            <div className={styles.border}>
                {hoverFeature.level === 'state' &&
                    otherFeature.level === 'state' && (
                        <State
                            hoverFeature={hoverFeature}
                            otherFeature={otherFeature}
                        />
                    )}
                {hoverFeature.level === 'school-district' && (
                    <SchoolDistrict hoverFeature={hoverFeature} />
                )}
            </div>
        </div>
    );
};
