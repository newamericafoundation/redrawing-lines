import {
    FriendlyColorBrewerPalettes,
    ValidThresholdArray,
} from 'src/utils/colors/types';
import {
    SchoolDistrDataVariable,
    SchoolDistrVariable,
    StateLevelDataVariable,
    StateLevelVariable,
} from 'src/types';

//TODO: Restrict to SchoolDistrVariable, StateLevelVariable
export const PropertyColors: {
    [key in
        | SchoolDistrDataVariable
        | StateLevelDataVariable
        | string]?: FriendlyColorBrewerPalettes;
} = {
    [SchoolDistrVariable.Black]: FriendlyColorBrewerPalettes.BluePurple,
    [SchoolDistrVariable.Asian]: FriendlyColorBrewerPalettes.BluePurple,
    [SchoolDistrVariable.White]: FriendlyColorBrewerPalettes.BluePurple,
    [SchoolDistrVariable.Native]: FriendlyColorBrewerPalettes.BluePurple,
    [SchoolDistrVariable.Latino]: FriendlyColorBrewerPalettes.BluePurple,
    [SchoolDistrVariable.NonWhite]: FriendlyColorBrewerPalettes.BluePurple,
    [SchoolDistrVariable.PovertyRate]: FriendlyColorBrewerPalettes.Greens,
    [SchoolDistrVariable.AssessedValuePerPupil]:
        FriendlyColorBrewerPalettes.OrangeRed,

    [StateLevelVariable.TheilFunding]: FriendlyColorBrewerPalettes.OrangeRed,
    [StateLevelVariable.TheilEconomic]: FriendlyColorBrewerPalettes.Greens,
    [StateLevelVariable.ThielRacial]: FriendlyColorBrewerPalettes.BluePurple,
    [StateLevelVariable.NumberOfDistr]: FriendlyColorBrewerPalettes.OrangeRed,
};

export const validColorBrewerIndex = [3, 4, 5, 6, 7, 8, 9];

const PropertyColorThreshholds: {
    [key in SchoolDistrDataVariable | StateLevelDataVariable | string]?:
        | 'dynamic'
        | ValidThresholdArray;
} = {
    [SchoolDistrVariable.Black]: 'dynamic',
    [SchoolDistrVariable.Asian]: 'dynamic',
    [SchoolDistrVariable.White]: 'dynamic',
    [SchoolDistrVariable.Native]: 'dynamic',
    [SchoolDistrVariable.Latino]: 'dynamic',
    [SchoolDistrVariable.NonWhite]: 'dynamic',
    [SchoolDistrVariable.AssessedValue]: 'dynamic',
    [SchoolDistrVariable.AssessedValuePerPupil]: 'dynamic',
    [SchoolDistrVariable.PovertyRate]: 'dynamic',
    [StateLevelVariable.TheilFunding]: [0.1, 0.15, 0.2, 0.25, 0.3, 0.45],
    [StateLevelVariable.TheilEconomic]: [0.01, 0.03, 0.05, 0.07, 0.1],
    [StateLevelVariable.ThielRacial]: [0.1, 0.15, 0.2, 0.25, 0.3, 0.45],
    [StateLevelVariable.NumberOfDistr]: 'dynamic',
};

export const getPropertyColorThreshhold = (
    key: SchoolDistrDataVariable | StateLevelDataVariable | string
) => {
    return PropertyColorThreshholds[key] ?? null;
};
