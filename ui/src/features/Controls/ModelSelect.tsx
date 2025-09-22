import { ChangeEvent } from 'react';
import { Select } from 'src/components/Select';
import useAppStore from 'src/lib/appState';
import { getModelOptions } from 'src/features/Controls/utils';
import { Model } from 'src/types';
import { getTooltipContent } from 'src/utils/tooltip';

export const ModelSelect: React.FC = () => {
    const model = useAppStore((state) => state.model);
    const setModel = useAppStore((state) => state.setModel);

    const options = getModelOptions();

    const handleModelChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = String(e.target.value) as Model;
        setModel(value);
    };

    return (
        <Select
            id="model-select"
            label="Select Redistricting Model"
            placeholder="Select a Model"
            value={model}
            options={options}
            onChange={handleModelChange}
            tooltip
            getTooltipContent={() => getTooltipContent(model)}
        />
    );
};
