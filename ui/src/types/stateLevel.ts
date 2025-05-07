export enum StateLevelVariable {
    TheilFunding = 'theil_funding',
    TheilEconomic = 'theil_economic',
    ThielRacial = 'theil_racial',
    NumberOfDistr = 'num_districts',

    Name = 'name',
    AFFGeoId = 'affgeoid',
    LandArea = 'aland',
    WaterArea = 'awater',
    GeoId = 'geoid',
    LegalDescriptionCode = 'lsad',
    StateFips = 'statefp',
    GNISCode = 'statens',
    StateAcronym = 'stusps',

    Q1PropertyTax = 'q1_prop_tax',
    Q4PropertyTax = 'q4_prop_tax',
    Q1StudentsOfColor = 'q1_students_color',
    Q4StudentsOfColor = 'q4_students_color',
    Q1ChildPoverty = 'q1_child_poverty',
    Q4ChildPoverty = 'q4_child_poverty',
}

/**
 * Enum representing various state-level variables used in district analysis.
 * - Variance: Variance in assessed value per pupil.
 * - VariationCoeff: Coefficient of Variation, a measure of dispersion for assessed value per pupil.
 * - GiniCoeff: Gini coefficient measuring economic inequality.
 * - RacialSegr: Dissimilarity index, a measure of racial segregation.
 * - Compactness: Geographical compactness of district shapes.
 * - NumberOfDistr: Total number of districts in the plan.
 * @enum {string}
 */
export type StateLevelDataVariable = Extract<
    StateLevelVariable,
    | StateLevelVariable.TheilFunding
    | StateLevelVariable.TheilEconomic
    | StateLevelVariable.ThielRacial
    | StateLevelVariable.NumberOfDistr
>;

export const stateLevelDataVariableValues: StateLevelVariable[] = [
    StateLevelVariable.TheilFunding,
    StateLevelVariable.TheilEconomic,
    StateLevelVariable.ThielRacial,
];

export type StateMetricProperties = {
    [StateLevelVariable.Name]: string;
    [StateLevelVariable.AFFGeoId]: string;
    [StateLevelVariable.LandArea]: number;
    [StateLevelVariable.WaterArea]: number;
    [StateLevelVariable.GeoId]: string;
    [StateLevelVariable.LegalDescriptionCode]: string;
    [StateLevelVariable.StateFips]: string;
    [StateLevelVariable.GNISCode]: string;
    [StateLevelVariable.StateAcronym]: string;

    [StateLevelVariable.TheilFunding]: string;
    [StateLevelVariable.TheilEconomic]: number;
    [StateLevelVariable.ThielRacial]: number;
    [StateLevelVariable.NumberOfDistr]: number;

    [StateLevelVariable.Q1PropertyTax]: number;
    [StateLevelVariable.Q4PropertyTax]: number;
    [StateLevelVariable.Q1StudentsOfColor]: number;
    [StateLevelVariable.Q4StudentsOfColor]: number;
    [StateLevelVariable.Q1ChildPoverty]: number;
    [StateLevelVariable.Q4ChildPoverty]: number;
};
