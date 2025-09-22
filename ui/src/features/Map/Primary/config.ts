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
import { filteredStates, getStateFilter } from 'src/features/Map/utils/filter';
import { StateLevelVariable } from 'src/types';

export const PRIMARY_MAP_ID = 'primary-map';

export const BASEMAP = basemaps[BasemapId.Dark];

export enum LayerId {
    StateMetricsSQ = 'pri-state-metrics-status-quo',
    StatusQuoSchoolDistricts = 'pri-school-districts-status-quo',
    FilteredStates = 'pri-static-filtered-states',
    NegativeSpaceStates = 'pri-negative-space-states',
}

export enum SubLayerId {
    StateMetricsSQFill = 'pri-state-metrics-status-quo-fill',
    StateMetricsSQBoundary = 'pri-state-metrics-status-quo-boundary',
    SchoolDistrictsSQFill = 'pri-school-districts-status-quo-fill',
    SchoolDistrictsSQBoundary = 'pri-school-districts-status-quo-boundary',
    FilteredStatesFill = 'pri-static-filtered-states-fill',
    FilteredStatesBoundary = 'pri-static-filtered-states-boundary',
    NegativeSpaceStatesFill = 'pri-negative-space-states-fill',
    NegativeSpaceStatesBoundary = 'pri-negative-space-states-boundary',
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
                    'line-opacity': 1,
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
                        ],
                    });
                    if (features.length === 0) {
                        map.getCanvas().style.cursor = 'not-allowed';
                        const html = `
                            <span style="color:black;">
                              <strong>Area excluded due to missing property assessment data.</strong>
                            </span>
                            `;
                        hoverPopup.setLngLat(e.lngLat).setHTML(html).addTo(map);
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
            case SubLayerId.SchoolDistrictsSQFill:
                return () => {
                    map.getCanvas().style.cursor = 'pointer';
                };
            case SubLayerId.StateMetricsSQFill:
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
                // hoverFunction: getLayerHoverFunction(
                //     SubLayerId.NegativeSpaceStatesFill
                // ),
                // mouseMoveFunction: getLayerMouseMoveFunction(
                //     SubLayerId.NegativeSpaceStatesFill
                // ),
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
                mouseMoveFunction: getLayerHoverFunction(
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
        id: LayerId.StatusQuoSchoolDistricts,
        config: getLayerConfig(LayerId.StatusQuoSchoolDistricts),
        controllable: false,
        legend: false,
        subLayers: [
            {
                id: SubLayerId.SchoolDistrictsSQFill,
                config: getLayerConfig(SubLayerId.SchoolDistrictsSQFill),
                hoverFunction: getLayerHoverFunction(
                    SubLayerId.SchoolDistrictsSQFill
                ),
                mouseMoveFunction: getLayerHoverFunction(
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
    {
        id: LayerId.FilteredStates,
        config: getLayerConfig(LayerId.FilteredStates),
        controllable: false,
        legend: false,
        subLayers: [
            {
                id: SubLayerId.FilteredStatesFill,
                config: getLayerConfig(SubLayerId.FilteredStatesFill),
                hoverFunction: getLayerHoverFunction(
                    SubLayerId.FilteredStatesFill
                ),
                mouseMoveFunction: getLayerHoverFunction(
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
