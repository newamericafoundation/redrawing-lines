import {
    SchoolDistrDataVariable,
    SchoolDistrVariable,
    StateLevelDataVariable,
    StateLevelVariable,
    Model,
} from 'src/types';

const FriendlyNames: {
    [key in
        | SchoolDistrDataVariable
        | StateLevelDataVariable
        | Model
        | string]?: string;
} = {
    [SchoolDistrVariable.Asian]: 'Asian (%)',
    [SchoolDistrVariable.Black]: 'Black (%)',
    [SchoolDistrVariable.Latino]: 'Latino (%)',
    [SchoolDistrVariable.White]: 'White (%)',
    [SchoolDistrVariable.Native]: 'Native (%)',
    [SchoolDistrVariable.NonWhite]: 'Non-White (%)',
    [SchoolDistrVariable.AssessedValue]: 'Assessed Value',
    [SchoolDistrVariable.AssessedValuePerPupil]: 'Assessed Value per Pupil',
    [SchoolDistrVariable.PovertyRate]: 'Poverty Rate',
    [StateLevelVariable.TheilFunding]: 'Tax-Base Inequality',
    [StateLevelVariable.TheilEconomic]: 'Economic Segregation',
    [StateLevelVariable.ThielRacial]: 'Racial Segregation',
    [StateLevelVariable.NumberOfDistr]: 'Number of Districts',
    [Model.StatusQuo]: 'Status Quo',
    [Model.Optimized]: 'Blank Slate',
    [Model.Consolidated]: 'Merger',
    [Model.CountyConsolidated]: 'County',
};

export const getFriendlyName = (
    property: SchoolDistrDataVariable | StateLevelDataVariable | Model | string
): string => {
    return FriendlyNames[property] ?? '';
};

export const getLessLabel = (
    variable: SchoolDistrDataVariable | StateLevelDataVariable
) => {
    switch (variable) {
        case StateLevelVariable.TheilFunding:
            return 'Less Inequality';
        case StateLevelVariable.TheilEconomic:
            return 'Less Segregation';
        case StateLevelVariable.ThielRacial:
            return 'Less Segregation';
        default:
            return 'Less';
    }
};

export const getMoreLabel = (
    variable: SchoolDistrDataVariable | StateLevelDataVariable
) => {
    switch (variable) {
        case StateLevelVariable.TheilFunding:
            return 'More Inequality';
        case StateLevelVariable.TheilEconomic:
            return 'More Segregation';
        case StateLevelVariable.ThielRacial:
            return 'More Segregation';
        default:
            return 'More';
    }
};
