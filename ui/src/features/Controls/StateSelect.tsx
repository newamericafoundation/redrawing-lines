import { ChangeEvent, useEffect, useState } from 'react';
import { Select } from 'src/components/Select';
import useAppStore from 'src/lib/appState';
import { StateLevelVariable } from 'src/types';
import { useStateMetricData } from 'src/hooks/useStateMetricData';
import { useMap } from 'src/contexts/MapContexts';
import { PRIMARY_MAP_ID } from '../Map/Primary/config';
import { clearGeocoder } from '../Map/utils/geocoder';

export const StateSelect: React.FC = () => {
    const [options, setOptions] = useState<
        Array<{
            value: string | number;
            label: string;
        }>
    >([]);

    const state = useAppStore((state) => state.state);
    const otherState = useAppStore((state) => state.otherState);
    const setState = useAppStore((state) => state.setState);
    const setSchoolDistrict = useAppStore((state) => state.setSchoolDistrict);
    const setOtherSchoolDistrict = useAppStore(
        (state) => state.setOtherSchoolDistrict
    );

    const { featureCollection, goToState, findState } =
        useStateMetricData('primary');

    const { geocoder } = useMap(PRIMARY_MAP_ID);

    useEffect(() => {
        if (featureCollection.features.length > 0) {
            const options = featureCollection.features
                .map((feature) => {
                    const value =
                        feature.properties[StateLevelVariable.StateAcronym];
                    const label = feature.properties[StateLevelVariable.Name];

                    return {
                        value,
                        label,
                    };
                })
                .sort((a, b) => a.label.localeCompare(b.label));
            setOptions(options);
        }
    }, [featureCollection]);

    const handleStateChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const id = e.target.value;

        if (
            !state ||
            id !== state.feature.properties[StateLevelVariable.StateAcronym]
        ) {
            const state = findState(id);
            if (state) {
                setState({
                    which: 'primary',
                    level: 'state',
                    feature: state,
                });
                setSchoolDistrict(null);
                setOtherSchoolDistrict(null);
                void goToState(id);

                if (geocoder) {
                    clearGeocoder(geocoder);
                }
            }
        }
    };

    const stateAcronym =
        state?.which === 'primary'
            ? state?.feature?.properties?.[StateLevelVariable.StateAcronym]
            : otherState?.feature?.properties?.[
                  StateLevelVariable.StateAcronym
              ];

    return (
        <Select
            id="state-select"
            label="State"
            placeholder="Select a State"
            value={stateAcronym ?? ''}
            options={options}
            onChange={handleStateChange}
            disabled={options.length === 0}
        />
    );
};
