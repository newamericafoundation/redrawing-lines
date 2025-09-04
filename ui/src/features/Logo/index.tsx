import useAppStore from 'src/lib/appState';
import styles from 'src/features/Logo/Logo.module.css';

const Logo: React.FC = () => {
    const infoPanelOpen = useAppStore((state) => state.infoPanelOpen);

    return (
        <div
            className={`${styles.logoWrapper} ${
                infoPanelOpen ? styles.infoPanelOpen : ''
            }`}
        >
            <div className={styles.outer}>
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
        </div>
    );
};

export default Logo;
