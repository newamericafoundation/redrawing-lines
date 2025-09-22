import { Feature, FeatureCollection, Geometry } from 'geojson';
import { SchoolDistrictFeature, StateFeature } from 'src/lib/appState';
import {
    Model,
    SchoolDistrictProperties,
    SchoolDistrVariable,
    StateLevelVariable,
    StateMetricProperties,
} from 'src/types';

export const getPrimaryLookupProperty = (model: Model) => {
    switch (model) {
        case Model.StatusQuo:
            return SchoolDistrVariable.GeoID;
        case Model.Optimized:
            return SchoolDistrVariable.OptimizedId;
        case Model.Consolidated:
            return SchoolDistrVariable.ConsolidatedId;
        case Model.CountyConsolidated:
            return SchoolDistrVariable.CountyGeoId;
    }
};

export const getComparisonLookupProperty = (model: Model) => {
    switch (model) {
        case Model.StatusQuo:
            return SchoolDistrVariable.GeoID;
        case Model.Optimized:
        case Model.Consolidated:
        case Model.CountyConsolidated:
            return SchoolDistrVariable.OptimizedId;
    }
};

export const findSchoolDistrict = (
    feature: SchoolDistrictFeature,
    model: Model,
    otherFeatureCollection: FeatureCollection<
        Geometry,
        SchoolDistrictProperties
    >
) => {
    const isPrimary = feature.which === 'primary';
    const lookupProperty = isPrimary
        ? getPrimaryLookupProperty(model)
        : getComparisonLookupProperty(model);
    const compLookupProperty = isPrimary
        ? getComparisonLookupProperty(model)
        : getPrimaryLookupProperty(model);

    return otherFeatureCollection.features.filter(
        (otherFeature) =>
            otherFeature.properties[compLookupProperty] ===
            feature.feature.properties[lookupProperty]
    );
};

export const confirmSchoolDistrict = (
    features: Feature<Geometry, SchoolDistrictProperties>[],
    schoolDistrict: SchoolDistrictFeature<Geometry> | null
) => {
    const currentId =
        schoolDistrict?.feature.id ?? schoolDistrict?.feature.properties['id'];

    return !features.some((feature) => {
        const id = feature.id ?? feature.properties['id'];
        return String(id) === String(currentId);
    });
};

export const confirmState = (
    feature: Feature<Geometry, StateMetricProperties> | undefined,
    state: StateFeature<Geometry> | null
) => {
    const otherId = feature?.id ?? feature?.properties?.[StateLevelVariable.Id];
    const currentId =
        state?.feature?.id ??
        state?.feature?.properties?.[StateLevelVariable.Id];
    const otherVersion = feature?.properties?.[StateLevelVariable.Version];
    const currentVersion =
        state?.feature?.properties?.[StateLevelVariable.Version];

    return (
        String(otherId) !== String(currentId) ||
        String(otherVersion) !== String(currentVersion)
    );
};
