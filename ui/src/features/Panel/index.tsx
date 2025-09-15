import styles from 'src/features/Panel/Panel.module.css';
import Controls from 'src/features/Controls';
import useAppStore from 'src/lib/appState';
import { Landing } from 'src/features/Panel/Screens/Landing';
import State from 'src/features/Panel/Screens/State';
import SchoolDistrict from './Screens/SchoolDistrict';

type Props = {
    showReportLayout: boolean;
};

const Panel: React.FC<Props> = (props) => {
    const { showReportLayout } = props;

    const schoolDistrict = useAppStore((state) => state.schoolDistrict);
    const state = useAppStore((state) => state.state);

    return (
        <div
            className={`${styles.infoPanel} ${
                showReportLayout ? '' : styles.headerOffset
            }`}
        >
            <div className={styles.section}>
                <Controls />
            </div>
            <div className={styles.section}>
                {schoolDistrict ? (
                    <SchoolDistrict />
                ) : state ? (
                    <State />
                ) : (
                    <Landing />
                )}
            </div>
        </div>
    );
};

export default Panel;
