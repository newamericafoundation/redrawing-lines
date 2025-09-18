import styles from 'src/features/Logo/Logo.module.css';

const Logo: React.FC = () => {
    return (
        <div className={styles.logoWrapper}>
            <div className={styles.indicator}>
                <a href="https://cgsearth.org/" target="_blank">
                    <img
                        className={styles.image}
                        src="/assets/poweredbycgs_v2.png"
                        alt="Center for Geospatial Solutions Logo"
                    />
                </a>
            </div>
        </div>
    );
};

export default Logo;
