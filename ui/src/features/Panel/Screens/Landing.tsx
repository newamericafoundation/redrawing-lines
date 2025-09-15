import styles from 'src/features/Panel/Panel.module.css';
import { Typography } from 'src/components/Typography';

export const Landing: React.FC = () => {
    return (
        <div className={`${styles.flex} ${styles.infoWrapper}`}>
            <section className={styles.marginTop}>
                <Typography variant="body-large" className={styles.textGray}>
                    This interactive map compares current school district
                    boundaries with new lines from proposed redistricting models
                    across states. Explore the data to see how redrawing school
                    district boundaries could provide more diverse student
                    populations with fairer access to local school funding.
                </Typography>
            </section>
            <section className={styles.marginTop}>
                <Typography variant="h4" as="h3">
                    Getting Started
                </Typography>
                <Typography variant="body-large" className={styles.textGray}>
                    Click on a <strong>state</strong> to explore{' '}
                    <strong>individual school districts</strong>, or select a{' '}
                    <strong>state</strong> from the list above and then select a{' '}
                    <strong>school district</strong> from the dropdown menu.
                </Typography>
                <br />
                <Typography variant="body-large" className={styles.textGray}>
                    Use the <strong>search box</strong> above to find a
                    particular place. Try searching for your town or home
                    address—the tool will automatically select your{' '}
                    <strong>school district</strong>.
                </Typography>
            </section>
        </div>
    );
};
