import { getFriendlyName } from 'src/utils/friendlyNames';
import {
    modelValues,
    schoolDistrDataVariableValues,
    SchoolDistrVariable,
    stateLevelDataVariableValues,
    StateLevelVariable,
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

export const isGradientReversed = (
    variable: StateLevelVariable | SchoolDistrVariable
) => {
    const reverseVariables: Array<StateLevelVariable | SchoolDistrVariable> = [
        StateLevelVariable.TheilEconomic,
        StateLevelVariable.TheilFunding,
        StateLevelVariable.ThielRacial,
    ];
    return reverseVariables.includes(variable);
};
