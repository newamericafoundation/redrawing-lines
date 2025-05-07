import styles from 'src/components/Toggle/Toggle.module.css';
import { ChangeEventHandler, ReactNode } from 'react';

type Props = {
    label: string | ReactNode;
    id: string;

    checked: boolean;
    onChange: ChangeEventHandler<HTMLInputElement> | (() => void);
};

export const Toggle: React.FC<Props> = (props) => {
    const { checked, onChange, id, label } = props;

    return (
        <div className={styles.toggleWrapper}>
            <label className={styles.switch}>
                <input
                    id={id}
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                />
                <span className={`${styles.slider} ${styles.round}`}></span>
            </label>
            <label htmlFor={id} className={styles.label}>
                {label}
            </label>
        </div>
    );
};
