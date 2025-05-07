import styles from 'src/features/Controls/Controls.module.css';
import { Geocoder } from 'src/features/Controls/Geocoder';
import { VariableSelect } from 'src/features/Controls/VariableSelect';
import { ModelSelect } from 'src/features/Controls/ModelSelect';
import { SchoolDistrictSelect } from 'src/features/Controls/SchoolDistrictSelect';
import { StateSelect } from 'src/features/Controls/StateSelect';
import { Gradient } from 'src/features/Controls/Gradient';

const Controls: React.FC = () => {
    return (
        <>
            <div className={styles.selectGroup}>
                <StateSelect />
                <SchoolDistrictSelect />
            </div>
            <hr />
            <div className={styles.selectGroup}>
                <VariableSelect />
                <ModelSelect />
            </div>
            <hr />
            <div className={styles.selectGroup}>
                <Gradient />
                <Geocoder />
            </div>
        </>
    );
};

export default Controls;
