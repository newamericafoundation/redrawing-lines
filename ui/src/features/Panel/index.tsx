import styles from 'src/features/Panel/Panel.module.css';
import Controls from 'src/features/Controls';
import useAppStore from 'src/lib/appState';
import { Landing } from 'src/features/Panel/Screens/Landing';
import State from 'src/features/Panel/Screens/State';
import SchoolDistrict from './Screens/SchoolDistrict';

const Panel: React.FC = () => {
    const schoolDistrict = useAppStore((state) => state.schoolDistrict);
    const state = useAppStore((state) => state.state);

    return (
        <div className={styles.infoPanel}>
            <div className={styles.section} style={{ minHeight: 'unset' }}>
                <Controls />
            </div>
            {schoolDistrict ? (
                <SchoolDistrict />
            ) : state ? (
                <State />
            ) : (
                <Landing />
            )}
        </div>
    );
};

export default Panel;
