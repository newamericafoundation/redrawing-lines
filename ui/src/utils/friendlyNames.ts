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
    [SchoolDistrVariable.Asian]: 'Asian',
    [SchoolDistrVariable.Black]: 'Black',
    [SchoolDistrVariable.Latino]: 'Latino',
    [SchoolDistrVariable.White]: 'White',
    [SchoolDistrVariable.Native]: 'Native',
    [SchoolDistrVariable.NonWhite]: 'Non-White',
    [SchoolDistrVariable.AssessedValue]: 'Assessed Value',
    [SchoolDistrVariable.AssessedValuePerPupil]: 'Assessed Value per Pupil',
    [StateLevelVariable.TheilFunding]: 'Tax Base Inequality',
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
