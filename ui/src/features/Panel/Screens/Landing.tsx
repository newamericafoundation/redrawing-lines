import styles from 'src/features/Panel/Panel.module.css';
import { Typography } from 'src/components/Typography';

export const Landing: React.FC = () => {
    return (
        <div className={`${styles.flex} ${styles.infoWrapper}`}>
            <section className={styles.marginTop}>
                <Typography variant="body" className={styles.textGray}>
                    <strong>Redrawing The Lines</strong> explores ... lorem
                    ipsum dolor sit amet, consectetur{' '}
                    <strong>adipiscing</strong> elit. Cras mattis, enim eu
                    placerat sagittis, risus augue porta dui, non{' '}
                    <strong>maximus</strong> nulla ante nec diam.{' '}
                    <strong>Integer</strong> in sagittis massa. In et lacinia
                    felis. <strong>Donec</strong> sit amet turpis ac ante
                    efficitur scelerisque.
                </Typography>
            </section>
            <section className={styles.marginTop}>
                <Typography variant="h4" as="h3">
                    Getting Started
                </Typography>
                <div className={styles.indent}>
                    <div>
                        <Typography
                            variant="body-large"
                            className={styles.textGray}
                        >
                            <strong>Hover</strong> over a <strong>State</strong>{' '}
                            to <strong>learn</strong> more
                        </Typography>
                        <Typography
                            variant="body-large"
                            className={styles.textGray}
                        >
                            <strong>Click</strong> on a <strong>State</strong>{' '}
                            to <strong>explore</strong> individual{' '}
                            <strong>School Districts</strong>!
                        </Typography>
                    </div>
                    <Typography
                        variant="body-large"
                        className={`${styles.textCenter} ${styles.textGray}`}
                    >
                        <strong>
                            <i>OR</i>
                        </strong>
                    </Typography>
                    <div className={styles.textRight}>
                        <Typography
                            variant="body-large"
                            className={styles.textGray}
                        >
                            <strong>Select</strong> a <strong>State</strong>{' '}
                            from the <strong>list</strong>
                        </Typography>
                        <Typography
                            variant="body-large"
                            className={styles.textGray}
                        >
                            <strong>
                                <i>Then,</i>
                            </strong>{' '}
                            select a <strong>School District</strong> from the
                            available options!
                        </Typography>
                    </div>
                    <hr />
                    <Typography
                        variant="body-large"
                        className={styles.textGray}
                    >
                        Use the <strong>location search box</strong> to find a
                        particular place
                    </Typography>
                    <Typography
                        variant="body-small"
                        className={`${styles.textGray} ${styles.indent}`}
                    >
                        <i>
                            Try searching for your <strong>town</strong> or{' '}
                            <strong>home address</strong>. This app will
                            automatically <strong>select</strong> your{' '}
                            <strong>School District</strong>!
                        </i>
                    </Typography>
                </div>
            </section>

            <section className={styles.marginTop}>
                <Typography variant="h4" as="h3">
                    Compare
                </Typography>
                <Typography
                    variant="body"
                    className={`${styles.textGray} ${styles.indent}`}
                >
                    Use the <strong>"Compare"</strong> toggle to activate{' '}
                    <strong>comparison mode</strong>, allowing you to visualize{' '}
                    <strong>new possiblities</strong> for School District
                    boundaries!
                </Typography>
                <div className={`${styles.indent}`}>
                    <ul
                        className={`${styles.demographicList} ${styles.textGray} ${styles.indent}`}
                    >
                        <li>
                            <Typography variant="body-small">
                                <strong>Status Quo:</strong> things as they
                                currently are, this will always be on the left
                                side of the screen and what you see when not in
                                comparison mode
                            </Typography>
                        </li>
                        <li>
                            <Typography variant="body-small">
                                <strong>County Consolidated:</strong> Lorem
                                ipsum dolor sit amet, consectetur adipiscing
                                elit.
                            </Typography>
                        </li>
                        <li>
                            <Typography variant="body-small">
                                <strong>Consolidated:</strong> Lorem ipsum dolor
                                sit amet, consectetur adipiscing elit.
                            </Typography>
                        </li>
                        <li>
                            <Typography variant="body-small">
                                <strong>Optimized:</strong> Lorem ipsum dolor
                                sit amet, consectetur adipiscing elit.
                            </Typography>
                        </li>
                    </ul>
                </div>
            </section>
        </div>
    );
};
