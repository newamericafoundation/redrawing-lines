import { FeatureCollection, Geometry } from 'geojson';
import { ExpressionSpecification, FilterSpecification, Map } from 'mapbox-gl';
import {
    Model,
    SchoolDistrDataVariable,
    SchoolDistrictProperties,
    SchoolDistrVariable,
    StateLevelDataVariable,
    StateLevelVariable,
    StateMetricProperties,
} from 'src/types';
import {
    createDynamicStepExpression,
    createStaticStepExpression,
} from 'src/utils/colors';
import { getPropertyColorThreshhold } from 'src/utils/colors/consts';
import { SubLayerId as PrimaryLayerId } from 'src/features/Map/Primary/config';
import { SubLayerId as ComparisonLayerId } from 'src/features/Map/Comparison/config';
import { InteractiveFeature, Which } from 'src/lib/appState';
import { getLayerIds } from 'src/features/Map/utils/layerId';

const modifyPrimarySchoolDistrictLayers = (
    map: Map,
    stateAcronym: string,
    expression: ExpressionSpecification
) => {
    map.setFilter(PrimaryLayerId.SchoolDistrictsSQFill, [
        '==',
        ['get', SchoolDistrVariable.State],
        stateAcronym,
    ]);
    map.setFilter(PrimaryLayerId.SchoolDistictsSQBoundary, [
        '==',
        ['get', SchoolDistrVariable.State],
        stateAcronym,
    ]);
    map.setPaintProperty(
        PrimaryLayerId.SchoolDistrictsSQFill,
        'fill-color',
        expression
    );
    map.setLayoutProperty(
        PrimaryLayerId.StateMetricsSQFill,
        'visibility',
        'none'
    );
    map.setLayoutProperty(
        PrimaryLayerId.StateMetricsSQBoundary,
        'visibility',
        'none'
    );
    map.setLayoutProperty(
        PrimaryLayerId.Static_FilteredStatesFill,
        'visibility',
        'none'
    );
    map.setLayoutProperty(
        PrimaryLayerId.Static_FilteredStatesBoundary,
        'visibility',
        'none'
    );
    map.setLayoutProperty(
        PrimaryLayerId.SchoolDistrictsSQFill,
        'visibility',
        'visible'
    );
    map.setLayoutProperty(
        PrimaryLayerId.SchoolDistictsSQBoundary,
        'visibility',
        'visible'
    );
};

const modifyComparisonSchoolDistrictLayers = (
    map: Map,
    stateAcronym: string,
    expression: ExpressionSpecification,
    model: Model
) => {
    const fillLayerMap = {
        [Model.StatusQuo]: ComparisonLayerId.SchoolDistrictsSQFill,
        [Model.Optimized]: ComparisonLayerId.SchoolDistrictsOptimFill,
        [Model.Consolidated]: ComparisonLayerId.SchoolDistrictsConsolFill,
        [Model.CountyConsolidated]: ComparisonLayerId.SchoolDistrictsCountyFill,
    };

    const boundaryLayerMap = {
        [Model.StatusQuo]: ComparisonLayerId.SchoolDistrictsSQBoundary,
        [Model.Optimized]: ComparisonLayerId.SchoolDistrictsOptimBoundary,
        [Model.Consolidated]: ComparisonLayerId.SchoolDistrictsConsolBoundary,
        [Model.CountyConsolidated]:
            ComparisonLayerId.SchoolDistrictsCountyBoundary,
    };

    const sdFillLayerId = fillLayerMap[model];
    const sdBoundaryLayerId = boundaryLayerMap[model];

    const stateFilter: FilterSpecification = [
        '==',
        ['get', SchoolDistrVariable.State],
        stateAcronym,
    ];
    map.setFilter(sdFillLayerId, stateFilter);
    map.setFilter(sdBoundaryLayerId, stateFilter);
    map.setFilter(
        ComparisonLayerId.Static_SchoolDistrictsBoundary,
        stateFilter
    );

    map.setPaintProperty(sdFillLayerId, 'fill-color', expression);

    const { fill: stateFillLayers, line: stateLineLayers } = getLayerIds(
        'comparison',
        'state'
    );

    // Hide all state metrics layers
    [...stateFillLayers, ...stateLineLayers].forEach((layerId) =>
        map.setLayoutProperty(layerId, 'visibility', 'none')
    );
    map.setLayoutProperty(
        ComparisonLayerId.Static_FilteredStatesFill,
        'visibility',
        'none'
    );
    map.setLayoutProperty(
        ComparisonLayerId.Static_FilteredStatesBoundary,
        'visibility',
        'none'
    );

    const { fill: schoolDistrictFillLayers, line: schoolDistrictLineLayers } =
        getLayerIds('comparison', 'school-district');

    // Hide all school district layers
    [...schoolDistrictFillLayers, ...schoolDistrictLineLayers].forEach(
        (layerId) => map.setLayoutProperty(layerId, 'visibility', 'none')
    );

    // Show selected model layers
    map.setLayoutProperty(sdFillLayerId, 'visibility', 'visible');
    map.setLayoutProperty(sdBoundaryLayerId, 'visibility', 'visible');

    // // Always show static boundary
    // map.setLayoutProperty(
    //     ComparisonLayerId.Static_SchoolDistrictsBoundary,
    //     'visibility',
    //     'visible'
    // );
};

export const updateSchoolDistricts = async (
    which: Which,
    map: Map,
    state: InteractiveFeature<Geometry>,
    variable: SchoolDistrDataVariable,
    model: Model,
    isMounted: boolean,
    fetchSchoolDistricts: (
        stateAcronym: string
    ) => Promise<
        FeatureCollection<Geometry, SchoolDistrictProperties> | undefined
    >,
    callback: () => void
) => {
    const propertyThreshold = getPropertyColorThreshhold(variable);
    const stateAcronym =
        state.level === 'state'
            ? state.feature.properties[StateLevelVariable.StateAcronym]
            : '';

    let expression: ExpressionSpecification | null = null;
    if (propertyThreshold) {
        if (propertyThreshold === 'dynamic') {
            const featureCollection = await fetchSchoolDistricts(stateAcronym);

            if (featureCollection) {
                const features = featureCollection.features.filter(
                    (feature) => feature.properties[variable]
                );

                expression = createDynamicStepExpression(features, variable, 6);
            }
        } else {
            expression = createStaticStepExpression(
                variable,
                propertyThreshold
            );
            // fetchSchoolDistricts sets the current state, fallback if not called
        }

        if (expression && isMounted) {
            if (which === 'primary') {
                modifyPrimarySchoolDistrictLayers(
                    map,
                    stateAcronym,
                    expression
                );
            } else {
                modifyComparisonSchoolDistrictLayers(
                    map,
                    stateAcronym,
                    expression,
                    model
                );
            }
            callback();
        }
    } else {
        console.error('Missing property threshhold for: ', variable);
    }
};

export const updateStateMetrics = async (
    which: Which,
    map: Map,
    variable: StateLevelDataVariable,
    model: Model,
    isMounted: boolean,
    fetchStates: () => Promise<
        FeatureCollection<Geometry, StateMetricProperties> | undefined
    >,
    callback: () => void
) => {
    const propertyThreshold = getPropertyColorThreshhold(variable);

    let expression: ExpressionSpecification | null = null;
    if (propertyThreshold) {
        if (propertyThreshold === 'dynamic') {
            const featureCollection = await fetchStates();

            if (featureCollection) {
                const features = featureCollection.features.filter(
                    (feature) => feature.properties[variable]
                );

                expression = createDynamicStepExpression(features, variable, 6);
            }
        } else {
            expression = createStaticStepExpression(
                variable,
                propertyThreshold
            );
        }

        if (expression && isMounted) {
            if (which === 'primary') {
                map.setPaintProperty(
                    PrimaryLayerId.StateMetricsSQFill,
                    'fill-color',
                    expression
                );

                map.setLayoutProperty(
                    PrimaryLayerId.SchoolDistrictsSQFill,
                    'visibility',
                    'none'
                );
                map.setLayoutProperty(
                    PrimaryLayerId.SchoolDistictsSQBoundary,
                    'visibility',
                    'none'
                );

                map.setLayoutProperty(
                    PrimaryLayerId.StateMetricsSQFill,
                    'visibility',
                    'visible'
                );
                map.setLayoutProperty(
                    PrimaryLayerId.StateMetricsSQBoundary,
                    'visibility',
                    'visible'
                );
                map.setLayoutProperty(
                    PrimaryLayerId.Static_FilteredStatesFill,
                    'visibility',
                    'visible'
                );
                map.setLayoutProperty(
                    PrimaryLayerId.Static_FilteredStatesBoundary,
                    'visibility',
                    'visible'
                );
            } else {
                const fillLayerMap = {
                    [Model.StatusQuo]: ComparisonLayerId.StateMetricsSQFill,
                    [Model.Optimized]: ComparisonLayerId.StateMetricsOptimFill,
                    [Model.Consolidated]:
                        ComparisonLayerId.StateMetricsConsolFill,
                    [Model.CountyConsolidated]:
                        ComparisonLayerId.StateMetricsCountyFill,
                };

                const boundaryLayerMap = {
                    [Model.StatusQuo]: ComparisonLayerId.StateMetricsSQBoundary,
                    [Model.Optimized]:
                        ComparisonLayerId.StateMetricsOptimBoundary,
                    [Model.Consolidated]:
                        ComparisonLayerId.StateMetricsConsolBoundary,
                    [Model.CountyConsolidated]:
                        ComparisonLayerId.StateMetricsCountyBoundary,
                };

                const smFillLayerId = fillLayerMap[model];
                const smBoundaryLayerId = boundaryLayerMap[model];

                const { fill: stateFillLayers, line: stateLineLayers } =
                    getLayerIds('comparison', 'state');

                [...stateFillLayers, ...stateLineLayers].forEach((layerId) =>
                    map.setLayoutProperty(layerId, 'visibility', 'none')
                );
                map.setLayoutProperty(
                    ComparisonLayerId.Static_FilteredStatesFill,
                    'visibility',
                    'visible'
                );
                map.setLayoutProperty(
                    ComparisonLayerId.Static_FilteredStatesBoundary,
                    'visibility',
                    'visible'
                );

                const {
                    fill: schoolDistrictFillLayers,
                    line: schoolDistrictLineLayers,
                } = getLayerIds('comparison', 'school-district');

                [
                    ...schoolDistrictFillLayers,
                    ...schoolDistrictLineLayers,
                ].forEach((layerId) =>
                    map.setLayoutProperty(layerId, 'visibility', 'none')
                );

                map.setPaintProperty(smFillLayerId, 'fill-color', expression);

                map.setLayoutProperty(smFillLayerId, 'visibility', 'visible');
                map.setLayoutProperty(
                    smBoundaryLayerId,
                    'visibility',
                    'visible'
                );
            }
            callback();
        }
    } else {
        console.error('Missing property threshhold for: ', variable);
    }
};
