import React from 'react';
import styles from './Linear.module.css';

export const Linear: React.FC = () => {
    return (
        <div
            className={styles.container}
            aria-label="Linear progress indicator"
        >
            <div className={styles.bar}></div>
        </div>
    );
};
