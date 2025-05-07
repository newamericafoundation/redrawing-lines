import { SubLayerId as PrimaryLayerId } from 'src/features/Map/Primary/config';
import { SubLayerId as ComparisonLayerId } from 'src/features/Map/Comparison/config';
import { Model } from 'src/types';
import { SourceId } from 'src/features/Map/sources';
import { Map, MapSourceDataEvent } from 'mapbox-gl';
import { Which } from 'src/lib/appState';

const getStateMetricsComparisonLayer = (model: Model) => {
    switch (model) {
        case Model.StatusQuo:
            return ComparisonLayerId.StateMetricsSQFill;
        case Model.Optimized:
            return ComparisonLayerId.StateMetricsOptimFill;
        case Model.Consolidated:
            return ComparisonLayerId.StateMetricsConsolFill;
        case Model.CountyConsolidated:
            return ComparisonLayerId.StateMetricsCountyFill;
    }
};

export const getStateMetricsLayer = (which: Which, model: Model) => {
    return which === 'primary'
        ? PrimaryLayerId.StateMetricsSQBoundary
        : getStateMetricsComparisonLayer(model);
};

const getSchoolDistrictsComparisonLayer = (model: Model) => {
    switch (model) {
        case Model.StatusQuo:
            return ComparisonLayerId.SchoolDistrictsSQFill;
        case Model.Optimized:
            return ComparisonLayerId.SchoolDistrictsOptimFill;
        case Model.Consolidated:
            return ComparisonLayerId.SchoolDistrictsConsolFill;
        case Model.CountyConsolidated:
            return ComparisonLayerId.SchoolDistrictsCountyFill;
    }
};

export const getSchoolDistrictsLayer = (which: Which, model: Model) => {
    return which === 'primary'
        ? PrimaryLayerId.SchoolDistictsSQBoundary
        : getSchoolDistrictsComparisonLayer(model);
};

const getStateMetricsComparisonSource = (model: Model) => {
    switch (model) {
        case Model.StatusQuo:
            return SourceId.StateMetrics_StatusQuo;
        case Model.Optimized:
            return SourceId.StateMetrics_Optimized;
        case Model.Consolidated:
            return SourceId.StateMetrics_Consolidated;
        case Model.CountyConsolidated:
            return SourceId.StateMetrics_CountyConsolidated;
    }
};

export const getStateMetricsSource = (which: Which, model: Model) => {
    return which === 'primary'
        ? SourceId.StateMetrics_StatusQuo
        : getStateMetricsComparisonSource(model);
};

const getSchoolDistrictsComparisonSource = (model: Model) => {
    switch (model) {
        case Model.StatusQuo:
            return SourceId.SchoolDistricts_StatusQuo;
        case Model.Optimized:
            return SourceId.SchoolDistricts_Optimized;
        case Model.Consolidated:
            return SourceId.SchoolDistricts_Consolidated;
        case Model.CountyConsolidated:
            return SourceId.SchoolDistricts_CountyConsolidated;
    }
};

export const getSchoolDistrictsSource = (which: Which, model: Model) => {
    return which === 'primary'
        ? SourceId.SchoolDistricts_StatusQuo
        : getSchoolDistrictsComparisonSource(model);
};

export type SourceDataEvent = {
    type: 'sourcedata';
    target: Map;
} & MapSourceDataEvent;

export const isSourceLoaded = (
    map: Map,
    sourceId: SourceId,
    event: SourceDataEvent
): boolean => {
    return Boolean(
        event.sourceId === sourceId &&
            map.getSource(sourceId) &&
            map.isSourceLoaded(sourceId) &&
            map.querySourceFeatures(sourceId, { sourceLayer: sourceId }).length
    );
};
