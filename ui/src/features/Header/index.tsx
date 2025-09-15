import { Typography } from 'src/components/Typography';
import styles from 'src/features/Header/Header.module.css';

type Props = {
    showReportLayout: boolean;
};

const Header: React.FC<Props> = (props) => {
    const { showReportLayout } = props;

    return (
        <>
            {!showReportLayout && (
                <header className={styles.headerWrapper}>
                    <a href="https://www.newamerica.org/" target="_blank">
                        <img
                            className={styles.image}
                            src="/assets/New-America-logo.png"
                            alt="New America Logo"
                        />
                    </a>
                    <Typography variant="h2" as="h1">
                        Redrawing the Lines
                    </Typography>
                </header>
            )}
        </>
    );
};

export default Header;
