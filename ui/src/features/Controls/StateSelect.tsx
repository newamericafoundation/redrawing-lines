import { ChangeEvent, useEffect, useState } from 'react';
import { Select } from 'src/components/Select';
import useAppStore from 'src/lib/appState';
import { StateLevelVariable } from 'src/types';
import { useStateMetricData } from 'src/hooks/useStateMetricData';

export const StateSelect: React.FC = () => {
    const [options, setOptions] = useState<
        Array<{
            value: string | number;
            label: string;
        }>
    >([]);

    const state = useAppStore((state) => state.state);
    const setState = useAppStore((state) => state.setState);
    const setSchoolDistrict = useAppStore((state) => state.setSchoolDistrict);

    // const { fetchSchoolDistricts } = useSchoolDistrictData('primary');
    const { featureCollection, goToState, findState } =
        useStateMetricData('primary');

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
                goToState(id);
            }
        }
    };

    const stateAcronym =
        state?.feature?.properties?.[StateLevelVariable.StateAcronym];

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
