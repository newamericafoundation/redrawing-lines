'use client';

import Map from 'components/Map';
import React, { useEffect, useMemo, useRef } from 'react';
import { useMap } from 'src/contexts/MapContexts';
import { basemaps } from 'components/Map/consts';
import { BasemapId } from 'src/components/Map/types';
import CustomControl from 'src/components/Map/tools/CustomControl';
import { FullscreenButton } from 'src/features/Tools/Fullscreen/Button';
import { ControlsButton } from 'src/features/Tools/Controls/Button';
import { RestartButton } from 'src/features/Tools/Restart/Button';
import { sourceConfigs } from 'src/features/Map/sources';
import {
    COMPARISON_MAP_ID,
    layerDefinitions,
    SubLayerId,
} from 'src/features/Map/Comparison/config';
import { MapMouseEvent } from 'mapbox-gl';
import { useSchoolDistrictData } from 'src/hooks/useSchoolDistrictData';
import { useStateMetricData } from 'src/hooks/useStateMetricData';
import useAppStore, {
    SchoolDistrictFeature,
    StateFeature,
} from 'src/lib/appState';
import {
    SchoolDistrVariable,
    StateLevelDataVariable,
    SchoolDistrictProperties,
    StateLevelVariable,
    StateMetricProperties,
} from 'src/types';

import { isSchoolDistrictProperty } from 'src/types/utils';
import debounce from 'lodash.debounce';
import { Feature, Geometry, Polygon } from 'geojson';
import {
    updateSchoolDistricts,
    updateStateMetrics,
} from 'src/features/Map/utils/style';
import {
    confirmSchoolDistrict,
    confirmState,
    findSchoolDistrict,
} from 'src/features/Map/utils/find';
import { ResetSliderButton } from 'src/features/Tools/ResetSlider/Button';
import { PRIMARY_MAP_ID } from '../Primary/config';
import { clearGeocoder } from '../utils/geocoder';

const INITIAL_CENTER: [number, number] = [-98.5795, 39.8282];
const INITIAL_ZOOM = 4;

type Props = {
    accessToken: string;
};

/**
 * This component renders the main map for the application, allowing users to interact with all layers defined in config.tsx.
 * It handles all map events that interact with redux state, including clicks on mainstem and updates to the data in the cluster layer.
 *
 * Props:
 * - accessToken: string - The access token for the map service.
 *
 * @component
 */
const ComparisonMap: React.FC<Props> = (props) => {
    const { accessToken } = props;

    const comparisonActive = useAppStore((store) => store.comparisonActive);
    const variable = useAppStore((store) => store.variable);
    const model = useAppStore((store) => store.model);
    const setVariable = useAppStore((store) => store.setVariable);
    const state = useAppStore((store) => store.state);
    const schoolDistrict = useAppStore((store) => store.schoolDistrict);
    const setState = useAppStore((store) => store.setState);
    const otherState = useAppStore((store) => store.otherState);
    const setOtherState = useAppStore((store) => store.setOtherState);
    const otherSchoolDistrict = useAppStore(
        (store) => store.otherSchoolDistrict
    );
    const setSchoolDistrict = useAppStore((store) => store.setSchoolDistrict);
    const setOtherSchoolDistrict = useAppStore(
        (store) => store.setOtherSchoolDistrict
    );
    const setMapMoved = useAppStore((store) => store.setMapMoved);
    const hoverFeature = useAppStore((store) => store.hoverFeature);
    const setHoverFeature = useAppStore((store) => store.setHoverFeature);
    const setOtherFeature = useAppStore((store) => store.setOtherFeature);
    const setShowNoData = useAppStore((store) => store.setShowNoData);
    const { map, hoverPopup } = useMap(COMPARISON_MAP_ID);
    const { geocoder } = useMap(PRIMARY_MAP_ID);

    const controller = useRef<AbortController | null>(null);
    const isMounted = useRef(true);

    const { fetchStates, goToState } = useStateMetricData('comparison');
    const { fetchSchoolDistricts, goToSchoolDistrict } =
        useSchoolDistrictData('comparison');
    const { featureCollection: primSMFeatureCollection } =
        useStateMetricData('primary');
    const { featureCollection: primSDFeatureCollection } =
        useSchoolDistrictData('primary');

    const handleStateClick = (e: MapMouseEvent) => {
        if (!map) {
            return;
        }

        const features = map.queryRenderedFeatures(e.point, {
            layers: [
                SubLayerId.StateMetricsSQFill,
                SubLayerId.StateMetricsOptimFill,
                SubLayerId.StateMetricsConsolFill,
                SubLayerId.StateMetricsCountyFill,
            ],
        });

        if (features.length > 0) {
            const feature = features[0] as unknown as Feature<
                Geometry,
                StateMetricProperties
            >;
            const properties = feature.properties as StateMetricProperties;
            const stateAcronym = properties[StateLevelVariable.StateAcronym];

            setVariable(SchoolDistrVariable.AssessedValuePerPupil);
            setOtherState({ which: 'comparison', level: 'state', feature });

            if (geocoder) {
                clearGeocoder(geocoder);
            }

            void goToState(stateAcronym);
        }
    };

    const handleStateHover = (e: MapMouseEvent) => {
        if (!map) {
            return;
        }

        const features = map.queryRenderedFeatures(e.point, {
            layers: [
                SubLayerId.StateMetricsSQFill,
                SubLayerId.StateMetricsOptimFill,
                SubLayerId.StateMetricsConsolFill,
                SubLayerId.StateMetricsCountyFill,
            ],
        });

        if (features.length > 0) {
            setShowNoData(false);
            const feature =
                features[0] as unknown as StateFeature<Polygon>['feature'];

            const hoverFeature = useAppStore.getState().hoverFeature;
            if (
                feature.properties.id !== hoverFeature?.feature?.properties?.id
            ) {
                setHoverFeature({
                    which: 'comparison',
                    level: 'state',
                    feature,
                });
            }
        }
    };

    const handleSchoolDistrictClick = (e: MapMouseEvent) => {
        if (!map) {
            return;
        }

        const features = map.queryRenderedFeatures(e.point, {
            layers: [
                SubLayerId.SchoolDistrictsSQFill,
                SubLayerId.SchoolDistrictsOptimFill,
                SubLayerId.SchoolDistrictsConsolFill,
                SubLayerId.SchoolDistrictsCountyFill,
            ],
        });

        if (features.length > 0) {
            const feature = features[0] as unknown as Feature<
                Geometry,
                SchoolDistrictProperties
            >;
            const properties = feature.properties as SchoolDistrictProperties;
            const schoolDistrict = properties[SchoolDistrVariable.ID];

            setOtherSchoolDistrict({
                which: 'comparison',
                level: 'school-district',
                feature,
            });

            if (geocoder) {
                clearGeocoder(geocoder);
            }

            void goToSchoolDistrict(schoolDistrict);
        }
    };

    const handleSchoolDistrictHover = (e: MapMouseEvent) => {
        if (!map) {
            return;
        }

        const features = map.queryRenderedFeatures(e.point, {
            layers: [
                SubLayerId.SchoolDistrictsSQFill,
                SubLayerId.SchoolDistrictsOptimFill,
                SubLayerId.SchoolDistrictsConsolFill,
                SubLayerId.SchoolDistrictsCountyFill,
            ],
        });

        if (features.length > 0) {
            setShowNoData(false);

            if (hoverPopup) {
                hoverPopup.remove();
            }
            const feature =
                features[0] as unknown as SchoolDistrictFeature<Polygon>['feature'];

            const hoverFeature = useAppStore.getState().hoverFeature;
            if (
                feature.properties.id !== hoverFeature?.feature?.properties?.id
            ) {
                setHoverFeature({
                    which: 'comparison',
                    level: 'school-district',
                    feature,
                });
            }
        }
    };

    const handleNoDataHover = (e: MapMouseEvent) => {
        if (!map) {
            return;
        }
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

            setShowNoData(true);
        }
    };

    const handleHoverExit = () => {
        if (!map) {
            return;
        }

        map.getCanvas().style.cursor = '';
        debouncedHandleStateHover.cancel();
        debouncedHandleSchoolDistrictHover.cancel();
        debouncedHandleNoDataHover.cancel();
        setHoverFeature(null);
        setOtherFeature(null);
        setShowNoData(false);
    };

    const debouncedHandleStateHover = useMemo(() => {
        return debounce(handleStateHover, 25);
    }, [map]);

    const debouncedHandleSchoolDistrictHover = useMemo(() => {
        return debounce(handleSchoolDistrictHover, 25);
    }, [map]);

    const debouncedHandleNoDataHover = useMemo(() => {
        return debounce(handleNoDataHover, 5);
    }, [map]);

    useEffect(() => {
        isMounted.current = true;
        void fetchStates();
        return () => {
            controller.current?.abort();
            isMounted.current = false;
            debouncedHandleSchoolDistrictHover.cancel();
            debouncedHandleStateHover.cancel();
        };
    }, []);

    useEffect(() => {
        if (!map) {
            return;
        }

        map.on(
            'click',
            [
                SubLayerId.StateMetricsSQFill,
                SubLayerId.StateMetricsOptimFill,
                SubLayerId.StateMetricsConsolFill,
                SubLayerId.StateMetricsCountyFill,
            ],
            handleStateClick
        );

        map.on(
            'click',
            [
                SubLayerId.SchoolDistrictsSQFill,
                SubLayerId.SchoolDistrictsOptimFill,
                SubLayerId.SchoolDistrictsConsolFill,
                SubLayerId.SchoolDistrictsCountyFill,
            ],
            handleSchoolDistrictClick
        );

        return () => {
            map.off(
                'click',
                [
                    SubLayerId.StateMetricsSQFill,
                    SubLayerId.StateMetricsOptimFill,
                    SubLayerId.StateMetricsConsolFill,
                    SubLayerId.StateMetricsCountyFill,
                ],
                handleStateClick
            );
            map.off(
                'click',
                [
                    SubLayerId.SchoolDistrictsSQFill,
                    SubLayerId.SchoolDistrictsOptimFill,
                    SubLayerId.SchoolDistrictsConsolFill,
                    SubLayerId.SchoolDistrictsCountyFill,
                ],
                handleSchoolDistrictClick
            );
        };
    }, [map]);
    useEffect(() => {
        if (!map) {
            return;
        }

        map.on(
            'mouseenter',
            [
                SubLayerId.StateMetricsSQFill,
                SubLayerId.StateMetricsOptimFill,
                SubLayerId.StateMetricsConsolFill,
                SubLayerId.StateMetricsCountyFill,
            ],
            debouncedHandleStateHover
        );
        map.on(
            'mousemove',
            [
                SubLayerId.StateMetricsSQFill,
                SubLayerId.StateMetricsOptimFill,
                SubLayerId.StateMetricsConsolFill,
                SubLayerId.StateMetricsCountyFill,
            ],
            debouncedHandleStateHover
        );
        map.on(
            'mouseleave',
            [
                SubLayerId.StateMetricsSQFill,
                SubLayerId.StateMetricsOptimFill,
                SubLayerId.StateMetricsConsolFill,
                SubLayerId.StateMetricsCountyFill,
            ],
            handleHoverExit
        );

        return () => {
            map.off(
                'mouseenter',
                [
                    SubLayerId.StateMetricsSQFill,
                    SubLayerId.StateMetricsOptimFill,
                    SubLayerId.StateMetricsConsolFill,
                    SubLayerId.StateMetricsCountyFill,
                ],
                debouncedHandleStateHover
            );
            map.off(
                'mousemove',
                [
                    SubLayerId.StateMetricsSQFill,
                    SubLayerId.StateMetricsOptimFill,
                    SubLayerId.StateMetricsConsolFill,
                    SubLayerId.StateMetricsCountyFill,
                ],
                debouncedHandleStateHover
            );
            map.off(
                'mouseleave',
                [
                    SubLayerId.StateMetricsSQFill,
                    SubLayerId.StateMetricsOptimFill,
                    SubLayerId.StateMetricsConsolFill,
                    SubLayerId.StateMetricsCountyFill,
                ],
                handleHoverExit
            );
        };
    }, [map, debouncedHandleStateHover]);

    useEffect(() => {
        if (!map) {
            return;
        }

        map.on(
            'mouseenter',
            [
                SubLayerId.SchoolDistrictsSQFill,
                SubLayerId.SchoolDistrictsOptimFill,
                SubLayerId.SchoolDistrictsConsolFill,
                SubLayerId.SchoolDistrictsCountyFill,
            ],
            debouncedHandleSchoolDistrictHover
        );
        map.on(
            'mousemove',
            [
                SubLayerId.SchoolDistrictsSQFill,
                SubLayerId.SchoolDistrictsOptimFill,
                SubLayerId.SchoolDistrictsConsolFill,
                SubLayerId.SchoolDistrictsCountyFill,
            ],
            debouncedHandleSchoolDistrictHover
        );
        map.on(
            'mouseleave',
            [
                SubLayerId.SchoolDistrictsSQFill,
                SubLayerId.SchoolDistrictsOptimFill,
                SubLayerId.SchoolDistrictsConsolFill,
                SubLayerId.SchoolDistrictsCountyFill,
            ],
            handleHoverExit
        );

        return () => {
            map.off(
                'mouseenter',
                [
                    SubLayerId.SchoolDistrictsSQFill,
                    SubLayerId.SchoolDistrictsOptimFill,
                    SubLayerId.SchoolDistrictsConsolFill,
                    SubLayerId.SchoolDistrictsCountyFill,
                ],
                debouncedHandleSchoolDistrictHover
            );
            map.off(
                'mousemove',
                [
                    SubLayerId.SchoolDistrictsSQFill,
                    SubLayerId.SchoolDistrictsOptimFill,
                    SubLayerId.SchoolDistrictsConsolFill,
                    SubLayerId.SchoolDistrictsCountyFill,
                ],
                debouncedHandleSchoolDistrictHover
            );
            map.off(
                'mouseleave',
                [
                    SubLayerId.SchoolDistrictsSQFill,
                    SubLayerId.SchoolDistrictsOptimFill,
                    SubLayerId.SchoolDistrictsConsolFill,
                    SubLayerId.SchoolDistrictsCountyFill,
                ],
                handleHoverExit
            );
        };
    }, [map, debouncedHandleSchoolDistrictHover]);

    useEffect(() => {
        if (!map) {
            return;
        }
        map.on(
            'mouseenter',
            SubLayerId.NegativeSpaceStatesFill,
            debouncedHandleNoDataHover
        );
        map.on(
            'mousemove',
            SubLayerId.NegativeSpaceStatesFill,
            debouncedHandleNoDataHover
        );
        map.on(
            'mouseleave',
            SubLayerId.NegativeSpaceStatesFill,
            handleHoverExit
        );

        return () => {
            map.off(
                'mouseenter',
                SubLayerId.NegativeSpaceStatesFill,
                debouncedHandleNoDataHover
            );
            map.off(
                'mousemove',
                SubLayerId.NegativeSpaceStatesFill,
                debouncedHandleNoDataHover
            );
            map.off(
                'mouseleave',
                SubLayerId.NegativeSpaceStatesFill,
                handleHoverExit
            );
        };
    }, [map, debouncedHandleNoDataHover]);

    useEffect(() => {
        if (!map) {
            return;
        }

        if (controller.current) {
            controller.current.abort();
        }

        controller.current = new AbortController();

        if (state && isSchoolDistrictProperty(variable)) {
            // School district
            void updateSchoolDistricts(
                'comparison',
                map,
                state,
                variable,
                model,
                isMounted.current,
                fetchSchoolDistricts,
                () => setMapMoved(Date.now()),
                controller.current.signal
            );
        } else if (!isSchoolDistrictProperty(variable)) {
            // State Level
            void updateStateMetrics(
                'comparison',
                map,
                variable as StateLevelDataVariable,
                model,
                isMounted.current,
                fetchStates,
                () => setMapMoved(Date.now()),
                controller.current.signal
            );
        }
    }, [map, state, variable, comparisonActive, model]);

    useEffect(() => {
        if (!hoverFeature || hoverFeature.which === 'primary') {
            return;
        }
        if (hoverFeature.level === 'state') {
            const otherFeature = primSMFeatureCollection.features.find(
                (primFeature) =>
                    primFeature.properties[StateLevelVariable.StateAcronym] ===
                    hoverFeature.feature.properties[
                        StateLevelVariable.StateAcronym
                    ]
            );

            if (otherFeature) {
                setOtherFeature({
                    which: 'primary',
                    level: 'state',
                    feature: otherFeature as StateFeature<Polygon>['feature'],
                });
            }
        } else if (hoverFeature.level === 'school-district') {
            const otherFeatures = findSchoolDistrict(
                hoverFeature,
                model,
                primSDFeatureCollection
            );

            if (
                otherFeatures.length > 0 &&
                confirmSchoolDistrict(otherFeatures, hoverFeature)
            ) {
                const otherFeature = otherFeatures[0];
                setOtherFeature({
                    which: 'primary',
                    level: 'school-district',
                    feature:
                        otherFeature as SchoolDistrictFeature<Polygon>['feature'],
                });
            }
        }
    }, [hoverFeature]);

    useEffect(() => {
        if (!otherState || otherState.which === 'primary') {
            if (!otherState && map) {
                map.setLayoutProperty(
                    SubLayerId.NegativeSpaceStatesFill,
                    'visibility',
                    'none'
                );
                map.setLayoutProperty(
                    SubLayerId.NegativeSpaceStatesBoundary,
                    'visibility',
                    'none'
                );
            }
            return;
        }
        if (otherState.level === 'state') {
            const stateAcronym =
                otherState.feature.properties[StateLevelVariable.StateAcronym];

            const otherFeature = primSMFeatureCollection.features.find(
                (primFeature) =>
                    primFeature.properties[StateLevelVariable.StateAcronym] ===
                    stateAcronym
            );

            if (otherFeature && confirmState(otherFeature, state)) {
                setState({
                    which: 'primary',
                    level: 'state',
                    feature: otherFeature as StateFeature<Polygon>['feature'],
                });
            }

            map?.setFilter(SubLayerId.NegativeSpaceStatesFill, [
                '==',
                ['get', StateLevelVariable.StateAcronym],
                stateAcronym,
            ]);
            map?.setFilter(SubLayerId.NegativeSpaceStatesBoundary, [
                '==',
                ['get', StateLevelVariable.StateAcronym],
                stateAcronym,
            ]);

            map?.setLayoutProperty(
                SubLayerId.NegativeSpaceStatesFill,
                'visibility',
                'visible'
            );
            map?.setLayoutProperty(
                SubLayerId.NegativeSpaceStatesBoundary,
                'visibility',
                'visible'
            );
        }
    }, [otherState]);

    useEffect(() => {
        if (!otherState || otherState.which === 'primary') {
            if (!otherState && map) {
                map.setLayoutProperty(
                    SubLayerId.NegativeSpaceStatesFill,
                    'visibility',
                    'none'
                );
                map.setLayoutProperty(
                    SubLayerId.NegativeSpaceStatesBoundary,
                    'visibility',
                    'none'
                );
            }
            return;
        }

        const stateAcronym =
            otherState.feature.properties[StateLevelVariable.StateAcronym];

        map?.setFilter(SubLayerId.NegativeSpaceStatesFill, [
            '==',
            ['get', StateLevelVariable.StateAcronym],
            stateAcronym,
        ]);
        map?.setFilter(SubLayerId.NegativeSpaceStatesBoundary, [
            '==',
            ['get', StateLevelVariable.StateAcronym],
            stateAcronym,
        ]);

        map?.setLayoutProperty(
            SubLayerId.NegativeSpaceStatesFill,
            'visibility',
            'visible'
        );
        map?.setLayoutProperty(
            SubLayerId.NegativeSpaceStatesBoundary,
            'visibility',
            'visible'
        );
    }, [otherState]);

    useEffect(() => {
        if (!otherSchoolDistrict || otherSchoolDistrict.which === 'primary') {
            return;
        }

        if (otherSchoolDistrict.level === 'school-district') {
            const otherFeatures = findSchoolDistrict(
                otherSchoolDistrict,
                model,
                primSDFeatureCollection
            );

            if (
                otherFeatures.length > 0 &&
                confirmSchoolDistrict(otherFeatures, schoolDistrict)
            ) {
                const otherFeature = otherFeatures[0];
                setSchoolDistrict({
                    which: 'primary',
                    level: 'school-district',
                    feature:
                        otherFeature as SchoolDistrictFeature<Polygon>['feature'],
                });
            }
        }
    }, [otherSchoolDistrict]);

    return (
        <>
            <Map
                accessToken={accessToken}
                id={COMPARISON_MAP_ID}
                sources={sourceConfigs}
                layers={layerDefinitions}
                options={{
                    style: basemaps[BasemapId.Standard],
                    config: {
                        basemap: {
                            lightPreset: 'dawn',
                            theme: 'monochrome',
                            show3dObjects: false,
                        },
                    },
                    projection: 'mercator',
                    center: INITIAL_CENTER,
                    zoom: INITIAL_ZOOM,
                    maxZoom: 20,
                }}
                controls={{
                    scaleControl: true,
                    navigationControl: true,
                }}
                customControls={[
                    {
                        control: new CustomControl(
                            (
                                <>
                                    <FullscreenButton />
                                    <ControlsButton />
                                </>
                            )
                        ),
                        position: 'top-right',
                    },
                    {
                        control: new CustomControl(
                            (
                                <>
                                    <RestartButton />
                                    <ResetSliderButton />
                                </>
                            )
                        ),
                        position: 'top-right',
                    },
                ]}
            />
        </>
    );
};

export default ComparisonMap;
