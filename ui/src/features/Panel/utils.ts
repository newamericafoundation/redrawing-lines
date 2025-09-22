import { SchoolDistrictFeature, StateFeature } from 'src/lib/appState';
import { SchoolDistrVariable, StateLevelVariable } from 'src/types';
import { invalidCountyStates } from '../Map/utils/filter';

export const isInvalidStateFeature = (
    feature: StateFeature | null
): boolean => {
    if (!feature) {
        return false;
    }
    const stateAcronym =
        feature.feature.properties[
            StateLevelVariable.StateAcronym
        ].toUpperCase();

    return (
        feature.feature.properties[StateLevelVariable.Version] === 'County' &&
        invalidCountyStates.includes(stateAcronym)
    );
};

export const isInvalidSchoolDistrictFeature = (
    feature: SchoolDistrictFeature | null
): boolean => {
    if (!feature) {
        return false;
    }
    const stateAcronym =
        feature.feature.properties[SchoolDistrVariable.State].toUpperCase();

    return (
        feature.feature.properties?.[SchoolDistrVariable.Version] ===
            'County' && invalidCountyStates.includes(stateAcronym)
    );
};
