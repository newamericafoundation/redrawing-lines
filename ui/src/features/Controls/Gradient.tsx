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
import { isGradientReversed } from 'src/features/Controls/utils';

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

    const isReverse = isGradientReversed(variable);

    const leftLabel = isReverse
        ? getMoreLabel(variable)
        : getLessLabel(variable);
    const rightLabel = isReverse
        ? getLessLabel(variable)
        : getMoreLabel(variable);

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
                            background: `linear-gradient(${
                                isReverse ? 'to left' : 'to right'
                            }, ${coloration.join(', ')})`,
                        }}
                    ></div>
                    <div className={styles.gradientLabelContainer}>
                        <Typography variant="body">{leftLabel}</Typography>
                        <Typography variant="body">{rightLabel}</Typography>
                    </div>
                </div>
            )}
        </>
    );
};
