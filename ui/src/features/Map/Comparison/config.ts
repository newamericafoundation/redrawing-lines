import {
    BasemapId,
    CustomListenerFunction,
    LayerType,
    MainLayerDefinition,
} from 'components/Map/types';
import {
    DataDrivenPropertyValueSpecification,
    LayerSpecification,
    Map,
    Popup,
} from 'mapbox-gl';
import { basemaps } from 'components/Map/consts';
import { SourceId } from 'src/features/Map/sources';
import { Root } from 'react-dom/client';
import { filteredStates, getStateFilter } from '../utils/filter';
import { StateLevelVariable } from 'src/types';

export const COMPARISON_MAP_ID = 'comparison-map';

export const BASEMAP = basemaps[BasemapId.Dark];

export enum LayerId {
    StateMetricsSQ = 'com-state-metrics-status-quo',
    SchoolDistrictsSQ = 'com-school-districts-status-quo',
    StateMetricsOptim = 'com-state-metrics-optim',
    SchoolDistrictsOptim = 'com-school-districts-optim',
    StateMetricsConsol = 'com-state-metrics-consol',
    SchoolDistrictsConsol = 'com-school-districts-consol',
    StateMetricsCounty = 'com-state-metrics-county',
    SchoolDistrictsCounty = 'com-school-districts-county',
    Static_SchoolDistricts = 'com-static-school-districts-status-quo',
    Static_FilteredStates = 'com-static-filtered-states',
    NegativeSpaceStates = 'com-negative-space-states',
}

export enum SubLayerId {
    StateMetricsSQFill = 'com-state-metrics-status-quo-fill',
    StateMetricsSQBoundary = 'com-state-metrics-status-quo-boundary',
    SchoolDistrictsSQFill = 'com-school-districts-status-quo-fill',
    SchoolDistrictsSQBoundary = 'com-school-districts-status-quo-boundary',
    StateMetricsOptimFill = 'com-state-metrics-optim-fill',
    StateMetricsOptimBoundary = 'com-state-metrics-optim-boundary',
    SchoolDistrictsOptimFill = 'com-school-districts-optim-fill',
    SchoolDistrictsOptimBoundary = 'com-school-districts-optim-boundary',
    StateMetricsConsolFill = 'com-state-metrics-consol-fill',
    StateMetricsConsolBoundary = 'com-state-metrics-consol-boundary',
    SchoolDistrictsConsolFill = 'com-school-districts-consol-fill',
    SchoolDistrictsConsolBoundary = 'com-school-districts-consol-boundary',
    StateMetricsCountyFill = 'com-state-metrics-county-fill',
    StateMetricsCountyBoundary = 'com-state-metrics-county-boundary',
    SchoolDistrictsCountyFill = 'com-school-districts-county-fill',
    SchoolDistrictsCountyBoundary = 'com-school-districts-county-boundary',
    StaticSchoolDistrictsBoundary = 'com-static-school-districts-status-quo-boundary',
    FilteredStatesFill = 'com-static-filtered-states-fill',
    FilteredStatesBoundary = 'com-static-filtered-states-boundary',
    NegativeSpaceStatesFill = 'com-negative-space-states-fill',
    NegativeSpaceStatesBoundary = 'com-negative-space-states-boundary',
}
export const allLayerIds = [];

/**********************************************************************
 * Define the various datasources this map will use
 **********************************************************************/

/**********************************************************************
 * Create helper functions to group layer logic
 **********************************************************************/
/**
 * Returns the display name for a given layer or sublayer based on its identifier.
 *
 * Parameters:
 * - layerId: LayerId | SubLayerId - The identifier for the layer or sublayer.
 *
 * Returns:
 * - string - The display name for the specified layer or sublayer.
 *
 * @function
 */
export const getLayerName = (layerId: LayerId | SubLayerId): string => {
    switch (layerId) {
        default:
            return '';
    }
};

/**
 * Returns the color for a given layer or sublayer based on its identifier.
 * It defines the color values for each layer, including special cases for data-driven properties.
 *
 * Parameters:
 * - id: LayerId | SubLayerId - The identifier for the layer or sublayer.
 *
 * Returns:
 * - DataDrivenPropertyValueSpecification<string> - The color value or expression for the specified layer or sublayer.
 *
 * @function
 */
export const getLayerColor = (
    id: LayerId | SubLayerId
): DataDrivenPropertyValueSpecification<string> => {
    switch (id) {
        default:
            return '#FFF';
    }
};

/**
 * Returns the configuration for a given layer or sublayer in the map.
 * It defines the properties such as id, type, source, layout, filter, and paint for each layer.
 *
 * Parameters:
 * - id: LayerId | SubLayerId - The identifier for the layer or sublayer.
 *
 * Returns:
 * - LayerSpecification | null - The configuration object for the specified layer or sublayer, or null if no configuration is needed.
 *
 * @function
 */
export const getLayerConfig = (
    id: LayerId | SubLayerId
): null | LayerSpecification => {
    switch (id) {
        // Status Quo
        case SubLayerId.StateMetricsSQFill:
            return {
                id: SubLayerId.StateMetricsSQFill,
                type: LayerType.Fill,
                source: SourceId.StateMetrics_StatusQuo,
                'source-layer': SourceId.StateMetrics_StatusQuo,
                filter: getStateFilter(),
                layout: {},
                paint: {
                    'fill-color': '#088',
                    'fill-opacity': 0.7,
                },
            };
        case SubLayerId.StateMetricsSQBoundary:
            return {
                id: SubLayerId.StateMetricsSQBoundary,
                type: LayerType.Line,
                source: SourceId.StateMetrics_StatusQuo,
                'source-layer': SourceId.StateMetrics_StatusQuo,
                filter: getStateFilter(),
                layout: {},
                paint: {
                    'line-color': '#000',
                    'line-width': 1,
                },
            };
        case SubLayerId.SchoolDistrictsSQFill:
            return {
                id: SubLayerId.SchoolDistrictsSQFill,
                type: LayerType.Fill,
                source: SourceId.SchoolDistricts_StatusQuo,
                'source-layer': SourceId.SchoolDistricts_StatusQuo,
                layout: {
                    visibility: 'none',
                },
                paint: {
                    'fill-color': '#088',
                    'fill-opacity': 0.7,
                },
            };
        case SubLayerId.SchoolDistrictsSQBoundary:
            return {
                id: SubLayerId.SchoolDistrictsSQBoundary,
                type: LayerType.Line,
                source: SourceId.SchoolDistricts_StatusQuo,
                'source-layer': SourceId.SchoolDistricts_StatusQuo,
                layout: {
                    visibility: 'none',
                },
                paint: {
                    'line-color': '#000',
                    'line-width': 1,
                },
            };

        // Blank Slate / Optimized
        case SubLayerId.StateMetricsOptimFill:
            return {
                id: SubLayerId.StateMetricsOptimFill,
                type: LayerType.Fill,
                source: SourceId.StateMetrics_Optimized,
                'source-layer': SourceId.StateMetrics_Optimized,
                filter: getStateFilter(),
                layout: { visibility: 'none' },
                paint: {
                    'fill-color': '#088',
                    'fill-opacity': 0.7,
                },
            };
        case SubLayerId.StateMetricsOptimBoundary:
            return {
                id: SubLayerId.StateMetricsOptimBoundary,
                type: LayerType.Line,
                source: SourceId.StateMetrics_Optimized,
                'source-layer': SourceId.StateMetrics_Optimized,
                filter: getStateFilter(),
                layout: { visibility: 'none' },
                paint: {
                    'line-color': '#000',
                    'line-width': 1,
                },
            };
        case SubLayerId.SchoolDistrictsOptimFill:
            return {
                id: SubLayerId.SchoolDistrictsOptimFill,
                type: LayerType.Fill,
                source: SourceId.SchoolDistricts_Optimized,
                'source-layer': SourceId.SchoolDistricts_Optimized,
                layout: {
                    visibility: 'none',
                },
                paint: {
                    'fill-color': '#088',
                    'fill-opacity': 0.7,
                },
            };
        case SubLayerId.SchoolDistrictsOptimBoundary:
            return {
                id: SubLayerId.SchoolDistrictsOptimBoundary,
                type: LayerType.Line,
                source: SourceId.SchoolDistricts_Optimized,
                'source-layer': SourceId.SchoolDistricts_Optimized,
                layout: {
                    visibility: 'none',
                },
                paint: {
                    'line-color': '#000',
                    'line-width': 1,
                },
            };

        // Consolidated
        case SubLayerId.StateMetricsConsolFill:
            return {
                id: SubLayerId.StateMetricsConsolFill,
                type: LayerType.Fill,
                source: SourceId.StateMetrics_Consolidated,
                'source-layer': SourceId.StateMetrics_Consolidated,
                filter: getStateFilter(),
                layout: { visibility: 'none' },
                paint: {
                    'fill-color': '#088',
                    'fill-opacity': 0.7,
                },
            };
        case SubLayerId.StateMetricsConsolBoundary:
            return {
                id: SubLayerId.StateMetricsConsolBoundary,
                type: LayerType.Line,
                source: SourceId.StateMetrics_Consolidated,
                'source-layer': SourceId.StateMetrics_Consolidated,
                filter: getStateFilter(),
                layout: { visibility: 'none' },
                paint: {
                    'line-color': '#000',
                    'line-width': 1,
                },
            };
        case SubLayerId.SchoolDistrictsConsolFill:
            return {
                id: SubLayerId.SchoolDistrictsConsolFill,
                type: LayerType.Fill,
                source: SourceId.SchoolDistricts_Consolidated,
                'source-layer': SourceId.SchoolDistricts_Consolidated,
                layout: {
                    visibility: 'none',
                },
                paint: {
                    'fill-color': '#088',
                    'fill-opacity': 0.7,
                },
            };
        case SubLayerId.SchoolDistrictsConsolBoundary:
            return {
                id: SubLayerId.SchoolDistrictsConsolBoundary,
                type: LayerType.Line,
                source: SourceId.SchoolDistricts_Consolidated,
                'source-layer': SourceId.SchoolDistricts_Consolidated,
                layout: {
                    visibility: 'none',
                },
                paint: {
                    'line-color': '#000',
                    'line-width': 1,
                },
            };

        // County Consolidated
        case SubLayerId.StateMetricsCountyFill:
            return {
                id: SubLayerId.StateMetricsCountyFill,
                type: LayerType.Fill,
                source: SourceId.StateMetrics_CountyConsolidated,
                'source-layer': SourceId.StateMetrics_CountyConsolidated,
                filter: getStateFilter(),
                layout: { visibility: 'none' },
                paint: {
                    'fill-color': '#088',
                    'fill-opacity': 0.7,
                },
            };
        case SubLayerId.StateMetricsCountyBoundary:
            return {
                id: SubLayerId.StateMetricsCountyBoundary,
                type: LayerType.Line,
                source: SourceId.StateMetrics_CountyConsolidated,
                'source-layer': SourceId.StateMetrics_CountyConsolidated,
                filter: getStateFilter(),
                layout: { visibility: 'none' },
                paint: {
                    'line-color': '#000',
                    'line-width': 1,
                },
            };
        case SubLayerId.SchoolDistrictsCountyFill:
            return {
                id: SubLayerId.SchoolDistrictsCountyFill,
                type: LayerType.Fill,
                source: SourceId.SchoolDistricts_CountyConsolidated,
                'source-layer': SourceId.SchoolDistricts_CountyConsolidated,
                layout: {
                    visibility: 'none',
                },
                paint: {
                    'fill-color': '#088',
                    'fill-opacity': 0.7,
                },
            };
        case SubLayerId.SchoolDistrictsCountyBoundary:
            return {
                id: SubLayerId.SchoolDistrictsCountyBoundary,
                type: LayerType.Line,
                source: SourceId.SchoolDistricts_CountyConsolidated,
                'source-layer': SourceId.SchoolDistricts_CountyConsolidated,
                layout: {
                    visibility: 'none',
                },
                paint: {
                    'line-color': '#000',
                    'line-width': 1,
                },
            };

        case SubLayerId.StaticSchoolDistrictsBoundary:
            return {
                id: SubLayerId.StaticSchoolDistrictsBoundary,
                type: LayerType.Line,
                source: SourceId.SchoolDistricts_StatusQuo,
                'source-layer': SourceId.SchoolDistricts_StatusQuo,
                layout: { visibility: 'none' },
                paint: {
                    'line-color': '#000',
                    'line-width': 1,
                },
            };

        case SubLayerId.FilteredStatesFill:
            return {
                id: SubLayerId.FilteredStatesFill,
                type: LayerType.Fill,
                source: SourceId.StateMetrics_StatusQuo,
                'source-layer': SourceId.StateMetrics_StatusQuo,
                filter: [
                    'in',
                    ['get', StateLevelVariable.StateAcronym],
                    ['literal', filteredStates],
                ],
                paint: {
                    'fill-color': '#515151',
                    'fill-opacity': 0.7,
                },
            };
        case SubLayerId.FilteredStatesBoundary:
            return {
                id: SubLayerId.FilteredStatesBoundary,
                type: LayerType.Line,
                source: SourceId.StateMetrics_StatusQuo,
                'source-layer': SourceId.StateMetrics_StatusQuo,
                filter: [
                    'in',
                    ['get', StateLevelVariable.StateAcronym],
                    ['literal', filteredStates],
                ],
                paint: {
                    'line-color': '#000',
                    'line-width': 1,
                },
            };
        case SubLayerId.NegativeSpaceStatesFill:
            return {
                id: SubLayerId.NegativeSpaceStatesFill,
                type: LayerType.Fill,
                source: SourceId.StateMetrics_StatusQuo,
                'source-layer': SourceId.StateMetrics_StatusQuo,
                layout: {
                    visibility: 'none',
                },
                paint: {
                    'fill-color': '#515151',
                    'fill-opacity': 0.001,
                },
            };
        case SubLayerId.NegativeSpaceStatesBoundary:
            return {
                id: SubLayerId.NegativeSpaceStatesBoundary,
                type: LayerType.Line,
                source: SourceId.StateMetrics_StatusQuo,
                'source-layer': SourceId.StateMetrics_StatusQuo,
                layout: {
                    visibility: 'none',
                },
                paint: {
                    'line-color': '#000',
                    'line-width': 1,
                },
            };

        default:
            return null;
    }
};

// Define and hover functions with curry-ed map and popup objects
export const getLayerHoverFunction = (
    id: LayerId | SubLayerId
): CustomListenerFunction => {
    return (
        map: Map,
        hoverPopup: Popup,
        persistentPopup: Popup,
        root: Root,
        container: HTMLDivElement
    ) => {
        switch (id) {
            case SubLayerId.SchoolDistrictsSQFill:
                return () => {
                    map.getCanvas().style.cursor = 'pointer';
                };
            case SubLayerId.StateMetricsSQFill:
                return () => {
                    map.getCanvas().style.cursor = 'pointer';
                };
            case SubLayerId.SchoolDistrictsOptimFill:
                return () => {
                    map.getCanvas().style.cursor = 'pointer';
                };
            case SubLayerId.StateMetricsOptimFill:
                return () => {
                    map.getCanvas().style.cursor = 'pointer';
                };
            case SubLayerId.SchoolDistrictsConsolFill:
                return () => {
                    map.getCanvas().style.cursor = 'pointer';
                };
            case SubLayerId.StateMetricsConsolFill:
                return () => {
                    map.getCanvas().style.cursor = 'pointer';
                };
            case SubLayerId.SchoolDistrictsCountyFill:
                return () => {
                    map.getCanvas().style.cursor = 'pointer';
                };
            case SubLayerId.StateMetricsCountyFill:
                return () => {
                    map.getCanvas().style.cursor = 'pointer';
                };
            case SubLayerId.FilteredStatesFill:
                return () => {
                    map.getCanvas().style.cursor = 'not-allowed';
                };
            case SubLayerId.NegativeSpaceStatesFill:
                return (e) => {
                    const features = map.queryRenderedFeatures(e.point, {
                        layers: [
                            SubLayerId.SchoolDistrictsSQFill,
                            SubLayerId.SchoolDistrictsSQBoundary,
                            SubLayerId.SchoolDistrictsOptimFill,
                            SubLayerId.SchoolDistrictsOptimBoundary,
                            SubLayerId.SchoolDistrictsConsolFill,
                            SubLayerId.SchoolDistrictsConsolBoundary,
                            SubLayerId.SchoolDistrictsCountyFill,
                            SubLayerId.SchoolDistrictsCountyBoundary,
                        ],
                    });
                    if (features.length === 0) {
                        map.getCanvas().style.cursor = 'not-allowed';
                        const html = `
                                        <span style="color:black;">
                                        <strong>Area excluded due to missing property assessment data.</strong>
                                        </span>
                                        `;
                        hoverPopup
                            .setLngLat(e.lngLat)
                            .setHTML(html)
                            .addTo(map!);
                    }
                };
            default:
                return (e) => {
                    console.log('Hover Event Triggered: ', e);
                    console.log('The map: ', map);
                    console.log('Available Popups: ');
                    console.log('Hover: ', hoverPopup);
                    console.log('Persistent: ', persistentPopup);
                    console.log('Content Root: ', root);
                    console.log('Content Container: ', container);

                    map.getCanvas().style.cursor = 'pointer';
                };
        }
    };
};

/**
 * Custom functionality for when the `mouseleave` event fires on this layer.
 * If not defined, defaults to unsetting the cursor and removing the hoverpopup
 *
 * Parameters:
 * - id: LayerId | SubLayerId - The identifier for the layer or sublayer.
 *
 * Returns:
 * - CustomListenerFunction - A function that handles the hover exit event for the specified layer or sublayer.
 *
 * @function
 */
export const getLayerCustomHoverExitFunction = (
    id: LayerId | SubLayerId
): CustomListenerFunction => {
    return (
        map: Map,
        hoverPopup: Popup,
        persistentPopup: Popup,
        root: Root,
        container: HTMLDivElement
    ) => {
        switch (id) {
            default:
                return (e) => {
                    console.log('Hover Exit Event Triggered: ', e);
                    console.log('The map: ', map);
                    console.log('Available Popups: ');
                    console.log('Hover: ', hoverPopup);
                    console.log('Persistent: ', persistentPopup);
                    console.log('Content Root: ', root);
                    console.log('Content Container: ', container);
                };
        }
    };
};

/**
 * Custom functionality for when the `mousemove` event fires on this layer. This event is triggered when
 * hovering over features without the cursor leaving the layer.
 *
 * Parameters:
 * - id: LayerId | SubLayerId - The identifier for the layer or sublayer.
 *
 * Returns:
 * - CustomListenerFunction - A function that handles the mouse move event for the specified layer or sublayer.
 *
 * @function
 */
export const getLayerMouseMoveFunction = (
    id: LayerId | SubLayerId
): CustomListenerFunction => {
    return (
        map: Map,
        hoverPopup: Popup,
        persistentPopup: Popup,
        root: Root,
        container: HTMLDivElement
    ) => {
        switch (id) {
            case SubLayerId.NegativeSpaceStatesFill:
                return (e) => {
                    const features = map.queryRenderedFeatures(e.point, {
                        layers: [
                            SubLayerId.SchoolDistrictsSQFill,
                            SubLayerId.SchoolDistrictsSQBoundary,
                            SubLayerId.SchoolDistrictsOptimFill,
                            SubLayerId.SchoolDistrictsOptimBoundary,
                            SubLayerId.SchoolDistrictsConsolFill,
                            SubLayerId.SchoolDistrictsConsolBoundary,
                            SubLayerId.SchoolDistrictsCountyFill,
                            SubLayerId.SchoolDistrictsCountyBoundary,
                        ],
                    });
                    if (features.length === 0) {
                        map.getCanvas().style.cursor = 'not-allowed';
                        const html = `
                                        <span style="color:black;">
                                        <strong>Area excluded due to missing property assessment data.</strong>
                                        </span>
                                        `;
                        hoverPopup
                            .setLngLat(e.lngLat)
                            .setHTML(html)
                            .addTo(map!);
                    }
                };
            default:
                return (e) => {
                    console.log('Hover Exit Event Triggered: ', e);
                    console.log('The map: ', map);
                    console.log('Available Popups: ');
                    console.log('Hover: ', hoverPopup);
                    console.log('Persistent: ', persistentPopup);
                    console.log('Content Root: ', root);
                    console.log('Content Container: ', container);
                };
        }
    };
};

/**
 * Custom functionality for when the `click` event fires on this layer.
 *
 * Parameters:
 * - id: LayerId | SubLayerId - The identifier for the layer or sublayer.
 *
 * Returns:
 * - CustomListenerFunction - A function that handles the click event for the specified layer or sublayer.
 *
 * @function
 */
export const getLayerClickFunction = (
    id: LayerId | SubLayerId
): CustomListenerFunction => {
    return (
        map: Map,
        hoverPopup: Popup,
        persistentPopup: Popup,
        root: Root,
        container: HTMLDivElement
    ) => {
        switch (id) {
            default:
                return (e) => {
                    console.log('Click Event Triggered: ', e);
                    console.log('The map: ', map);
                    console.log('Available Popups: ');
                    console.log('Hover: ', hoverPopup);
                    console.log('Persistent: ', persistentPopup);
                    console.log('Content Root: ', root);
                    console.log('Content Container: ', container);
                };
        }
    };
};

/**
 * Contains the definitions for main layers and sublayers in the map.
 * Each layer definition includes properties such as id, controllable, legend, config, and optional event handler functions.
 *
 * LayerDefinition Type:
 * - id: string - The identifier for the layer or sublayer.
 * - controllable: boolean - Whether the layers visibility can be toggled by the user.
 * - legend: boolean - Whether the layer should be displayed in the legend.
 * - config: LayerSpecification | null - The configuration object for the layer or sublayer.
 * - hoverFunction?: CustomListenerFunction - Optional function to handle hover events.
 * - customHoverExitFunction?: CustomListenerFunction - Optional function to handle hover exit events.
 * - clickFunction?: CustomListenerFunction - Optional function to handle click events.
 * - mouseMoveFunction?: CustomListenerFunction - Optional function to handle mouse move events.
 *
 * MainLayerDefinition Type:
 * Contains the above type values and an additional optional array
 * - subLayers?: LayerDefinition[] - Optional array of sublayer definitions.
 *
 *
 * @constant
 */
export const layerDefinitions: MainLayerDefinition[] = [
    // Use this as the master object to define layer hierarchies. Sublayers are nested layer definitions,
    // meaning they have their own click and hover listeners. The order of layers and sublayers dictates the draw
    // order on the map.

    {
        id: LayerId.NegativeSpaceStates,
        config: getLayerConfig(LayerId.NegativeSpaceStates),
        controllable: false,
        legend: false,
        subLayers: [
            {
                id: SubLayerId.NegativeSpaceStatesFill,
                config: getLayerConfig(SubLayerId.NegativeSpaceStatesFill),
                hoverFunction: getLayerHoverFunction(
                    SubLayerId.NegativeSpaceStatesFill
                ),
                mouseMoveFunction: getLayerMouseMoveFunction(
                    SubLayerId.NegativeSpaceStatesFill
                ),
                controllable: false,
                legend: false,
            },
            {
                id: SubLayerId.NegativeSpaceStatesBoundary,
                config: getLayerConfig(SubLayerId.NegativeSpaceStatesBoundary),
                controllable: false,
                legend: false,
            },
        ],
    },
    // Status Quo
    {
        id: LayerId.StateMetricsSQ,
        config: getLayerConfig(LayerId.StateMetricsSQ),
        controllable: false,
        legend: false,
        subLayers: [
            {
                id: SubLayerId.StateMetricsSQFill,
                config: getLayerConfig(SubLayerId.StateMetricsSQFill),
                hoverFunction: getLayerHoverFunction(
                    SubLayerId.StateMetricsSQFill
                ),
                controllable: false,
                legend: false,
            },
            {
                id: SubLayerId.StateMetricsSQBoundary,
                config: getLayerConfig(SubLayerId.StateMetricsSQBoundary),
                controllable: false,
                legend: false,
            },
        ],
    },
    {
        id: LayerId.SchoolDistrictsSQ,
        config: getLayerConfig(LayerId.SchoolDistrictsSQ),
        controllable: false,
        legend: false,
        subLayers: [
            {
                id: SubLayerId.SchoolDistrictsSQFill,
                config: getLayerConfig(SubLayerId.SchoolDistrictsSQFill),
                hoverFunction: getLayerHoverFunction(
                    SubLayerId.SchoolDistrictsSQFill
                ),
                controllable: false,
                legend: false,
            },
            {
                id: SubLayerId.SchoolDistrictsSQBoundary,
                config: getLayerConfig(SubLayerId.SchoolDistrictsSQBoundary),
                controllable: false,
                legend: false,
            },
        ],
    },

    // Optimized
    {
        id: LayerId.StateMetricsOptim,
        config: getLayerConfig(LayerId.StateMetricsOptim),
        controllable: false,
        legend: false,
        subLayers: [
            {
                id: SubLayerId.StateMetricsOptimFill,
                config: getLayerConfig(SubLayerId.StateMetricsOptimFill),
                hoverFunction: getLayerHoverFunction(
                    SubLayerId.StateMetricsOptimFill
                ),
                controllable: false,
                legend: false,
            },
            {
                id: SubLayerId.StateMetricsOptimBoundary,
                config: getLayerConfig(SubLayerId.StateMetricsOptimBoundary),

                controllable: false,
                legend: false,
            },
        ],
    },
    {
        id: LayerId.SchoolDistrictsOptim,
        config: getLayerConfig(LayerId.SchoolDistrictsOptim),
        controllable: false,
        legend: false,
        subLayers: [
            {
                id: SubLayerId.SchoolDistrictsOptimFill,
                config: getLayerConfig(SubLayerId.SchoolDistrictsOptimFill),
                hoverFunction: getLayerHoverFunction(
                    SubLayerId.SchoolDistrictsOptimFill
                ),
                controllable: false,
                legend: false,
            },
            {
                id: SubLayerId.SchoolDistrictsOptimBoundary,
                config: getLayerConfig(SubLayerId.SchoolDistrictsOptimBoundary),
                controllable: false,
                legend: false,
            },
        ],
    },

    // Consolidated
    {
        id: LayerId.StateMetricsConsol,
        config: getLayerConfig(LayerId.StateMetricsConsol),
        controllable: false,
        legend: false,
        subLayers: [
            {
                id: SubLayerId.StateMetricsConsolFill,
                config: getLayerConfig(SubLayerId.StateMetricsConsolFill),
                hoverFunction: getLayerHoverFunction(
                    SubLayerId.StateMetricsConsolFill
                ),
                controllable: false,
                legend: false,
            },
            {
                id: SubLayerId.StateMetricsConsolBoundary,
                config: getLayerConfig(SubLayerId.StateMetricsConsolBoundary),
                controllable: false,
                legend: false,
            },
        ],
    },
    {
        id: LayerId.SchoolDistrictsConsol,
        config: getLayerConfig(LayerId.SchoolDistrictsConsol),
        controllable: false,
        legend: false,
        subLayers: [
            {
                id: SubLayerId.SchoolDistrictsConsolFill,
                config: getLayerConfig(SubLayerId.SchoolDistrictsConsolFill),
                hoverFunction: getLayerHoverFunction(
                    SubLayerId.SchoolDistrictsConsolFill
                ),
                controllable: false,
                legend: false,
            },
            {
                id: SubLayerId.SchoolDistrictsConsolBoundary,
                config: getLayerConfig(
                    SubLayerId.SchoolDistrictsConsolBoundary
                ),
                controllable: false,
                legend: false,
            },
        ],
    },

    // County Consolidated
    {
        id: LayerId.StateMetricsCounty,
        config: getLayerConfig(LayerId.StateMetricsCounty),
        controllable: false,
        legend: false,
        subLayers: [
            {
                id: SubLayerId.FilteredStatesFill,
                config: getLayerConfig(SubLayerId.StateMetricsCountyFill),
                hoverFunction: getLayerHoverFunction(
                    SubLayerId.FilteredStatesFill
                ),
                controllable: false,
                legend: false,
            },
            {
                id: SubLayerId.StateMetricsCountyBoundary,
                config: getLayerConfig(SubLayerId.StateMetricsCountyBoundary),
                controllable: false,
                legend: false,
            },
        ],
    },
    {
        id: LayerId.SchoolDistrictsCounty,
        config: getLayerConfig(LayerId.SchoolDistrictsCounty),
        controllable: false,
        legend: false,
        subLayers: [
            {
                id: SubLayerId.SchoolDistrictsCountyFill,
                config: getLayerConfig(SubLayerId.SchoolDistrictsCountyFill),
                hoverFunction: getLayerHoverFunction(
                    SubLayerId.SchoolDistrictsCountyFill
                ),
                controllable: false,
                legend: false,
            },
            {
                id: SubLayerId.SchoolDistrictsCountyBoundary,
                config: getLayerConfig(
                    SubLayerId.SchoolDistrictsCountyBoundary
                ),
                controllable: false,
                legend: false,
            },
        ],
    },

    {
        id: LayerId.Static_SchoolDistricts,
        config: getLayerConfig(LayerId.Static_SchoolDistricts),
        controllable: false,
        legend: false,
        subLayers: [
            {
                id: SubLayerId.StaticSchoolDistrictsBoundary,
                config: getLayerConfig(
                    SubLayerId.StaticSchoolDistrictsBoundary
                ),
                controllable: false,
                legend: false,
            },
        ],
    },
    {
        id: LayerId.Static_FilteredStates,
        config: getLayerConfig(LayerId.Static_FilteredStates),
        controllable: false,
        legend: false,
        subLayers: [
            {
                id: SubLayerId.FilteredStatesFill,
                config: getLayerConfig(SubLayerId.FilteredStatesFill),
                hoverFunction: getLayerHoverFunction(
                    SubLayerId.FilteredStatesFill
                ),
                controllable: false,
                legend: false,
            },
            {
                id: SubLayerId.FilteredStatesBoundary,
                config: getLayerConfig(SubLayerId.FilteredStatesBoundary),
                controllable: false,
                legend: false,
            },
        ],
    },
];
