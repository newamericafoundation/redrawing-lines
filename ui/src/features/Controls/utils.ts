import { getFriendlyName } from 'src/utils/friendlyNames';
import {
    modelValues,
    schoolDistrDataVariableValues,
    stateLevelDataVariableValues,
} from 'src/types';

export const getStateLevelOptions = () => {
    return stateLevelDataVariableValues.map((dataVariable) => ({
        value: dataVariable,
        label: getFriendlyName(dataVariable),
    }));
};

export const getSchoolDistrictOptions = () => {
    return schoolDistrDataVariableValues.map((dataVariable) => ({
        value: dataVariable,
        label: getFriendlyName(dataVariable),
    }));
};

export const getModelOptions = () => {
    return modelValues.map((model) => ({
        value: model,
        label: getFriendlyName(model),
    }));
};
