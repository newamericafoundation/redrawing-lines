export enum SchoolDistrVariable {
    AssessedValue = 'av',
    Native = 'native',
    Black = 'black',
    White = 'white',
    Asian = 'asian',
    Latino = 'latino',
    NonWhite = 'non_wht',
    ChildrenInPoverty = 'chldr__',
    TotalChildren = 'childrn',
    AssessedValuePerPupil = 'av_pp',

    StatewideTaxPerPupil = 'sttw___',
    StatusQuoTaxPerPupil = 'sq_tx__',
    StatusQuoTaxPctStatewide = 'sq_t___',
    TaxPerPupil = 'tx_pr_p',
    TaxPctStatewide = 'tx_pc__',
    StatusQuoPovertyRate = 'sq_pvr_',
    StatusQuoPctNonWhite = 'sq_pc__',
    PctNonWhite = 'pct_nn_',

    State = 'state',
    ID = 'id',
    Name = 'name',
    Population = 'popultn',

    GeoID = 'geoid', // COUNTY ONLY
    Entity = 'entity', // COUNTY, OPTIM, CONSOL  ONLY

    CountyGeoId = 'cnty_gd', // SQ ONLY
    OptimizedId = 'optmz__', // SQ, OPTIM ONLY
    ConsolidatedId = 'cnsld__', // SQ, CONSOL ONLY
    Version = 'version',
}

/**
 * Enum representing various school district-level variables.
 * - State: State abbreviation.
 * - AssessedValue: Total assessed value.
 * - Native: Number of Native American residents.
 * - Black: Number of Black residents.
 * - White: Number of White residents.
 * - Asian: Number of Asian residents.
 * - Latino: Number of Latino residents.
 * - NonWhite: Total non-White population.
 * - ChildrenInPoverty: Number of children living in poverty.
 * - TotalChildren: Total number of children.
 * @type {string}
 */
export type SchoolDistrDataVariable = Extract<
    SchoolDistrVariable,
    | SchoolDistrVariable.AssessedValuePerPupil
    | SchoolDistrVariable.Native
    | SchoolDistrVariable.Black
    | SchoolDistrVariable.White
    | SchoolDistrVariable.Asian
    | SchoolDistrVariable.Latino
    | SchoolDistrVariable.NonWhite
    | SchoolDistrVariable.ChildrenInPoverty
    | SchoolDistrVariable.TotalChildren
>;

export const schoolDistrDataVariableValues: SchoolDistrVariable[] = [
    SchoolDistrVariable.AssessedValuePerPupil,
    SchoolDistrVariable.Native,
    SchoolDistrVariable.Black,
    SchoolDistrVariable.White,
    SchoolDistrVariable.Asian,
    SchoolDistrVariable.Latino,
    SchoolDistrVariable.NonWhite,
];

export type SchoolDistrictProperties = {
    [SchoolDistrVariable.State]: string;
    [SchoolDistrVariable.AssessedValue]: number;
    [SchoolDistrVariable.AssessedValuePerPupil]: number;
    [SchoolDistrVariable.Native]: number;
    [SchoolDistrVariable.Black]: number;
    [SchoolDistrVariable.White]: number;
    [SchoolDistrVariable.Asian]: number;
    [SchoolDistrVariable.Latino]: number;
    [SchoolDistrVariable.NonWhite]: number;
    [SchoolDistrVariable.ChildrenInPoverty]: number;
    [SchoolDistrVariable.TotalChildren]: number;

    [SchoolDistrVariable.StatewideTaxPerPupil]: number;
    [SchoolDistrVariable.StatusQuoTaxPerPupil]: number;
    [SchoolDistrVariable.StatusQuoTaxPctStatewide]: number;
    [SchoolDistrVariable.TaxPerPupil]: number;
    [SchoolDistrVariable.TaxPctStatewide]: number;
    [SchoolDistrVariable.StatusQuoPovertyRate]: number;
    [SchoolDistrVariable.StatusQuoPctNonWhite]: number;
    [SchoolDistrVariable.PctNonWhite]: number;

    [SchoolDistrVariable.ID]: number;
    [SchoolDistrVariable.Name]: string;
    [SchoolDistrVariable.Population]: number;
    [SchoolDistrVariable.GeoID]?: string;
    [SchoolDistrVariable.Entity]?: string;

    [SchoolDistrVariable.CountyGeoId]?: string;
    [SchoolDistrVariable.OptimizedId]?: string;
    [SchoolDistrVariable.ConsolidatedId]?: string;
    [SchoolDistrVariable.Version]?: string;
};
