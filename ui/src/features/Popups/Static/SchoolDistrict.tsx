import { Typography } from 'src/components/Typography';
import useAppStore, { SchoolDistrictFeature } from 'src/lib/appState';
import { Model, SchoolDistrVariable, StateLevelVariable } from 'src/types';
import { useEffect, useState } from 'react';
import { createCleanLabelFunction } from 'src/utils/cleanLabels';
import { getFriendlyName } from 'src/utils/friendlyNames';
import styles from 'src/features/Popups/Popups.module.css';

type Props = {
    hoverFeature: SchoolDistrictFeature;
};

export const SchoolDistrict: React.FC<Props> = (props) => {
    const { hoverFeature } = props;

    const state = useAppStore((state) => state.state);
    const model = useAppStore((state) => state.model);

    const [title, setTitle] = useState('');

    useEffect(() => {
        if (!state) {
            return;
        }

        if (state) {
            const title = createCleanLabelFunction(
                state.feature.properties[StateLevelVariable.StateAcronym]
            )(hoverFeature.feature.properties[SchoolDistrVariable.Name] ?? '');

            setTitle(title);
        }
    }, [hoverFeature, state]);

    return (
        <>
            <div className={styles.schoolDistrictPopupHeaderWrapper}>
                <Typography variant="h5">{title}</Typography>
                <Typography variant="h6">
                    {hoverFeature.which === 'primary'
                        ? getFriendlyName(Model.StatusQuo)
                        : getFriendlyName(model)}
                </Typography>
            </div>
        </>
    );
};
