import useAppStore from 'src/lib/appState';
import styles from 'src/features/Controls/Controls.module.css';
import { useEffect, useState } from 'react';
import { getGradient } from 'src/utils/colors';
import {
    getFriendlyName,
    getLessLabel,
    getMoreLabel,
} from 'src/utils/friendlyNames';
import { Typography } from 'src/components/Typography';

export const Gradient: React.FC = () => {
    const variable = useAppStore((state) => state.variable);

    const [colors, setColors] = useState<string[]>([]);

    useEffect(() => {
        const colors = getGradient(variable);

        setColors(colors);
    }, [variable]);

    const stepLength = 100 / colors.length;
    const coloration = colors.map(
        (color, index) =>
            `${color} ${stepLength * index}% ${stepLength * (index + 1)}%`
    );

    return (
        <>
            {colors.length > 0 && (
                <div className={styles.gradientContainer}>
                    <Typography variant="body-large">
                        {getFriendlyName(variable)}
                    </Typography>
                    <div
                        className={styles.gradient}
                        style={{
                            background: `linear-gradient(to right, ${coloration.join(
                                ', '
                            )})`,
                        }}
                    ></div>
                    <div className={styles.gradientLabelContainer}>
                        <Typography variant="body">
                            {getLessLabel(variable)}
                        </Typography>
                        <Typography variant="body">
                            {getMoreLabel(variable)}
                        </Typography>
                    </div>
                </div>
            )}
        </>
    );
};
