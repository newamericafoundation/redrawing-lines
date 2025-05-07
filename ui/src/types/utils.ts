import {
    SchoolDistrictProperties,
    SchoolDistrVariable,
    StateLevelVariable,
    StateMetricProperties,
} from 'src/types';

export const isStateMetricProperty = (
    key: string
): key is keyof StateMetricProperties => {
    return Object.values(StateLevelVariable).includes(
        key as StateLevelVariable
    );
};

export const isSchoolDistrictProperty = (
    key: string
): key is keyof SchoolDistrictProperties => {
    return Object.values(SchoolDistrVariable).includes(
        key as SchoolDistrVariable
    );
};
