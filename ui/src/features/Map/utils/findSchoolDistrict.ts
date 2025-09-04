import { FeatureCollection, Geometry } from 'geojson';
import { SchoolDistrictFeature } from 'src/lib/appState';
import {
    Model,
    SchoolDistrictProperties,
    SchoolDistrVariable,
} from 'src/types';

const getPrimaryLookupProperty = (model: Model) => {
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

const getComparisonLookupProperty = (model: Model) => {
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

    return otherFeatureCollection.features.find(
        (otherFeature) =>
            otherFeature.properties[compLookupProperty] ===
            feature.feature.properties[lookupProperty]
    );
};
