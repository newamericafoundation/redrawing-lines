import { ChangeEvent } from 'react';
import { Select } from 'src/components/Select';
import useAppStore from 'src/lib/appState';
import { StateLevelDataVariable, SchoolDistrDataVariable } from 'src/types';
import {
    getSchoolDistrictOptions,
    getStateLevelOptions,
} from 'src/features/Controls/utils';

export const VariableSelect: React.FC = () => {
    const variable = useAppStore((state) => state.variable);
    const setVariable = useAppStore((state) => state.setVariable);
    const state = useAppStore((state) => state.state);

    const variableOptions = state
        ? getSchoolDistrictOptions()
        : getStateLevelOptions();

    const handleVariableChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = String(e.target.value) as
            | StateLevelDataVariable
            | SchoolDistrDataVariable;
        setVariable(value);
    };
    return (
        <Select
            id="variable-select"
            label="Select Map Variable"
            placeholder="Select a Variable"
            value={variable}
            options={variableOptions}
            onChange={handleVariableChange}
        />
    );
};
