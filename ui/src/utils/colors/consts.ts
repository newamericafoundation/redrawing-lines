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
    [SchoolDistrVariable.Black]: FriendlyColorBrewerPalettes.OrangeRed,
    [SchoolDistrVariable.Asian]: FriendlyColorBrewerPalettes.GreenBlue,
    [SchoolDistrVariable.White]: FriendlyColorBrewerPalettes.BlueGreen,
    [SchoolDistrVariable.Native]: FriendlyColorBrewerPalettes.PurpleBlueGreen,
    [SchoolDistrVariable.Latino]: FriendlyColorBrewerPalettes.PurpleRed,
    [SchoolDistrVariable.NonWhite]: FriendlyColorBrewerPalettes.Greens,
    [SchoolDistrVariable.AssessedValuePerPupil]:
        FriendlyColorBrewerPalettes.YellowGreenBlue,

    [StateLevelVariable.TheilFunding]: FriendlyColorBrewerPalettes.BlueGreen,
    [StateLevelVariable.TheilEconomic]: FriendlyColorBrewerPalettes.PurpleBlue,
    [StateLevelVariable.ThielRacial]: FriendlyColorBrewerPalettes.YellowGreen,
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
    [StateLevelVariable.TheilFunding]: 'dynamic',
    [StateLevelVariable.TheilEconomic]: 'dynamic',
    [StateLevelVariable.ThielRacial]: 'dynamic',
    [StateLevelVariable.NumberOfDistr]: 'dynamic',
};

export const getPropertyColorThreshhold = (
    key: SchoolDistrDataVariable | StateLevelDataVariable | string
) => {
    return PropertyColorThreshholds[key] ?? null;
};
