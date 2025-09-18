'use client';

import Map from 'components/Map';
import React, { useEffect, useMemo, useRef } from 'react';
import { useMap } from 'src/contexts/MapContexts';
import { basemaps } from 'components/Map/consts';
import { BasemapId } from 'src/components/Map/types';
import CustomControl from 'src/components/Map/tools/CustomControl';
import { FullscreenButton } from 'src/features/Tools/Fullscreen/Button';
import { ControlsButton } from 'src/features/Tools/Controls/Button';
import { MapMouseEvent, Marker } from 'mapbox-gl';
import { sourceConfigs } from 'src/features/Map/sources';
import {
    layerDefinitions,
    PRIMARY_MAP_ID,
    SubLayerId,
} from 'src/features/Map/Primary/config';
import useAppStore, {
    SchoolDistrictFeature,
    StateFeature,
} from 'src/lib/appState';
import {
    SchoolDistrictProperties,
    SchoolDistrVariable,
    StateLevelVariable,
    StateMetricProperties,
} from 'src/types';
import { useSchoolDistrictData } from 'src/hooks/useSchoolDistrictData';
import debounce from 'lodash.debounce';
import { useStateMetricData } from 'src/hooks/useStateMetricData';
import { isSchoolDistrictProperty } from 'src/types/utils';
import { Feature, Geometry, Polygon } from 'geojson';
import {
    updateSchoolDistricts,
    updateStateMetrics,
} from 'src/features/Map/utils/style';
import { findSchoolDistrict } from 'src/features/Map/utils/findSchoolDistrict';
import { COMPARISON_MAP_ID } from '../Comparison/config';
import { RestartButton } from 'src/features/Tools/Restart/Button';
import { ResetSliderButton } from 'src/features/Tools/ResetSlider/Button';
import { filteredStates } from '../utils/filter';
import { getStateName } from 'src/utils/states';

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
const PrimaryMap: React.FC<Props> = (props) => {
    const { accessToken } = props;

    const model = useAppStore((store) => store.model);
    const variable = useAppStore((store) => store.variable);
    const setVariable = useAppStore((store) => store.setVariable);
    const state = useAppStore((store) => store.state);
    const setState = useAppStore((store) => store.setState);
    const otherState = useAppStore((store) => store.otherState);
    const setOtherState = useAppStore((store) => store.setOtherState);
    const schoolDistrict = useAppStore((store) => store.schoolDistrict);
    const setSchoolDistrict = useAppStore((store) => store.setSchoolDistrict);
    const setOtherSchoolDistrict = useAppStore(
        (store) => store.setOtherSchoolDistrict
    );
    const setMapMoved = useAppStore((store) => store.setMapMoved);
    const hoverFeature = useAppStore((store) => store.hoverFeature);
    const setHoverFeature = useAppStore((store) => store.setHoverFeature);
    const setOtherFeature = useAppStore((store) => store.setOtherFeature);
    const setSliderPosition = useAppStore((store) => store.setSliderPosition);

    const { map, geocoder, hoverPopup } = useMap(PRIMARY_MAP_ID);
    const { map: comparisonMap } = useMap(COMPARISON_MAP_ID);

    const controller = useRef<AbortController | null>(null);
    const isMounted = useRef(true);

    const {
        fetchStates,
        goToState,
        findState,
        featureCollection: primSMFeatureCollection,
    } = useStateMetricData('primary');
    const { fetchSchoolDistricts, goToSchoolDistrict, locateSchoolDistrict } =
        useSchoolDistrictData('primary');
    const { featureCollection: compSMFeatureCollection } =
        useStateMetricData('comparison');
    const { featureCollection: compSDFeatureCollection } =
        useSchoolDistrictData('comparison');

    const handleMapMove = () => {
        if (isMounted.current) {
            setMapMoved(Date.now());
        }
    };

    const handleStateClick = (e: MapMouseEvent) => {
        if (!map) {
            return;
        }

        const features = map.queryRenderedFeatures(e.point, {
            layers: [SubLayerId.StateMetricsSQFill],
        });

        if (features.length > 0) {
            const feature = features[0] as unknown as Feature<
                Geometry,
                StateMetricProperties
            >;
            const properties = feature.properties as StateMetricProperties;
            const stateAcronym = properties[StateLevelVariable.StateAcronym];

            setVariable(SchoolDistrVariable.AssessedValuePerPupil);
            setState({ which: 'primary', level: 'state', feature });

            if (geocoder) {
                try {
                    geocoder.setInput('');
                } catch (error) {
                    console.error(error);
                }
            }

            void goToState(stateAcronym);
        }
    };

    const handleSchoolDistrictClick = (e: MapMouseEvent) => {
        if (!map) {
            return;
        }

        const features = map.queryRenderedFeatures(e.point, {
            layers: [SubLayerId.SchoolDistrictsSQFill],
        });

        if (features.length > 0) {
            const feature = features[0] as unknown as Feature<
                Geometry,
                SchoolDistrictProperties
            >;
            const properties = feature.properties as SchoolDistrictProperties;
            const schoolDistrict = properties[SchoolDistrVariable.ID];

            setSchoolDistrict({
                which: 'primary',
                level: 'school-district',
                feature,
            });

            if (geocoder) {
                try {
                    geocoder.setInput('');
                } catch (error) {
                    console.error(error);
                }
            }

            void goToSchoolDistrict(schoolDistrict);
        }
    };

    const handleStateHover = (e: MapMouseEvent) => {
        if (!map) {
            return;
        }

        const features = map.queryRenderedFeatures(e.point, {
            layers: [SubLayerId.StateMetricsSQFill],
        });

        if (features.length > 0) {
            const feature =
                features[0] as unknown as StateFeature<Polygon>['feature'];
            const hoverFeature = useAppStore.getState().hoverFeature;

            if (
                feature.properties.id !== hoverFeature?.feature?.properties?.id
            ) {
                setHoverFeature({
                    which: 'primary',
                    level: 'state',
                    feature,
                });
            }
        }
    };

    const handleSchoolDistrictHover = (e: MapMouseEvent) => {
        if (!map) {
            return;
        }

        const features = map.queryRenderedFeatures(e.point, {
            layers: [SubLayerId.SchoolDistrictsSQFill],
        });

        if (features.length > 0) {
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
                    which: 'primary',
                    level: 'school-district',
                    feature,
                });
            }
        }
    };

    const handleHoverExit = () => {
        if (!map) {
            return;
        }

        map.getCanvas().style.cursor = '';
        debouncedHandleStateHover.cancel();
        debouncedHandleSchoolDistrictHover.cancel();
        setHoverFeature(null);
        setOtherFeature(null);
    };

    const debouncedHandleMapMove = useMemo(() => {
        return debounce(handleMapMove, 150);
    }, [map]);
    const debouncedHandleStateHover = useMemo(() => {
        return debounce(handleStateHover, 25);
    }, [map]);

    const debouncedHandleSchoolDistrictHover = useMemo(() => {
        return debounce(handleSchoolDistrictHover, 25);
    }, [map]);

    useEffect(() => {
        isMounted.current = true;
        void fetchStates();
        return () => {
            controller.current?.abort();
            isMounted.current = false;
            debouncedHandleMapMove.cancel();
            debouncedHandleStateHover.cancel();
            debouncedHandleSchoolDistrictHover.cancel();
        };
    }, []);

    useEffect(() => {
        if (!map) {
            return;
        }
        map.resize();
        map.fitBounds(
            [
                [-125.0011, 24.9493], // Southwest corner [lng, lat]
                [-66.9326, 49.5904], // Northeast corner [lng, lat]
            ],
            {
                padding: { left: 50, right: 50 },
            }
        );

        map.on('click', SubLayerId.StateMetricsSQFill, handleStateClick);
        map.on(
            'click',
            SubLayerId.SchoolDistrictsSQFill,
            handleSchoolDistrictClick
        );
        map.on('moveend', debouncedHandleMapMove);
        map.on('zoomend', debouncedHandleMapMove);

        return () => {
            map.off('click', SubLayerId.StateMetricsSQFill, handleStateClick);
            map.off(
                'click',
                SubLayerId.SchoolDistrictsSQFill,
                handleSchoolDistrictClick
            );
            map.off('moveend', debouncedHandleMapMove);
        };
    }, [map]);

    useEffect(() => {
        if (!map) {
            return;
        }

        map.on(
            'mouseenter',
            SubLayerId.StateMetricsSQFill,
            debouncedHandleStateHover
        );
        map.on(
            'mousemove',
            SubLayerId.StateMetricsSQFill,
            debouncedHandleStateHover
        );
        map.on('mouseleave', SubLayerId.StateMetricsSQFill, handleHoverExit);
        return () => {
            map.off(
                'mouseenter',
                SubLayerId.StateMetricsSQFill,
                debouncedHandleStateHover
            );
            map.off(
                'mousemove',
                SubLayerId.StateMetricsSQFill,
                debouncedHandleStateHover
            );
            map.off(
                'mouseleave',
                SubLayerId.StateMetricsSQFill,
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
            SubLayerId.SchoolDistrictsSQFill,
            debouncedHandleSchoolDistrictHover
        );
        map.on(
            'mousemove',
            SubLayerId.SchoolDistrictsSQFill,
            debouncedHandleSchoolDistrictHover
        );
        map.on('mouseleave', SubLayerId.SchoolDistrictsSQFill, handleHoverExit);

        return () => {
            map.off(
                'mouseenter',
                SubLayerId.SchoolDistrictsSQFill,
                debouncedHandleSchoolDistrictHover
            );
            map.off(
                'mousemove',
                SubLayerId.SchoolDistrictsSQFill,
                debouncedHandleSchoolDistrictHover
            );
            map.off(
                'mouseleave',
                SubLayerId.SchoolDistrictsSQFill,
                handleHoverExit
            );
        };
    }, [map, debouncedHandleSchoolDistrictHover]);

    useEffect(() => {
        if (
            !geocoder ||
            !map ||
            !comparisonMap ||
            primSMFeatureCollection.features.length === 0
        ) {
            return;
        }

        let primMarker: Marker;
        let compMarker: Marker;
        geocoder.on('result', (e) => {
            (async () => {
                if (primMarker) {
                    primMarker.remove();
                }
                if (compMarker) {
                    compMarker.remove();
                }
                const result: MapboxGeocoder.Result = e.result;
                const center = result.center as [number, number];
                const primElement = document.createElement('div');
                primElement.className = 'custom-marker';

                const compElement = document.createElement('div');
                compElement.className = 'custom-marker';

                primMarker = new Marker(primElement)
                    .setLngLat(center)
                    .addTo(map);
                compMarker = new Marker(compElement)
                    .setLngLat(center)
                    .addTo(comparisonMap);

                const featureCollection = await locateSchoolDistrict(center);
                if (
                    featureCollection?.features &&
                    featureCollection.features.length > 0
                ) {
                    const feature = featureCollection.features[0];
                    const stateAcronym =
                        feature.properties[SchoolDistrVariable.State];
                    const state = findState(stateAcronym);

                    const sliderPosition =
                        useAppStore.getState().sliderPosition;
                    // Adjust slider to not cover marker
                    if (sliderPosition >= 40 && sliderPosition <= 60) {
                        setSliderPosition(70);
                    }

                    if (state) {
                        setState({
                            which: 'primary',
                            level: 'state',
                            feature: state,
                        });
                        setSchoolDistrict({
                            which: 'primary',
                            level: 'school-district',
                            feature,
                        });
                        const schoolDistrict =
                            feature.properties[SchoolDistrVariable.ID] ??
                            feature[SchoolDistrVariable.ID];
                        void goToSchoolDistrict(schoolDistrict);
                    }
                } else {
                    console.warn('Unable to to locate school district');
                }
            })();
        });

        geocoder.on('clear', () => {
            if (primMarker) {
                primMarker.remove();
            }
            if (compMarker) {
                compMarker.remove();
            }

            setSchoolDistrict(null);
            setOtherSchoolDistrict(null);
        });

        return () => {
            if (primMarker) {
                primMarker.remove();
            }
            if (compMarker) {
                compMarker.remove();
            }
        };
    }, [geocoder, primSMFeatureCollection]);

    useEffect(() => {
        if (!map) return;

        const handleMapUpdate = () => {
            const isSchoolDistrict = isSchoolDistrictProperty(variable);

            if (controller.current) {
                controller.current.abort();
            }

            controller.current = new AbortController();

            if (state) {
                const selectedVariable = isSchoolDistrict
                    ? variable
                    : SchoolDistrVariable.AssessedValuePerPupil;
                if (!isSchoolDistrict) {
                    setVariable(selectedVariable);
                }

                void updateSchoolDistricts(
                    'primary',
                    map,
                    state,
                    selectedVariable,
                    model,
                    isMounted.current,
                    fetchSchoolDistricts,
                    () => setMapMoved(Date.now()),
                    controller.current.signal
                );
            } else {
                let stateVariable = variable;
                if (isSchoolDistrictProperty(stateVariable)) {
                    stateVariable = StateLevelVariable.ThielRacial;
                    setVariable(stateVariable);
                }

                void updateStateMetrics(
                    'primary',
                    map,
                    stateVariable,
                    model,
                    isMounted.current,
                    fetchStates,
                    () => setMapMoved(Date.now()),
                    controller.current.signal
                );
            }
        };

        handleMapUpdate();
    }, [map, variable, state, model]);

    useEffect(() => {
        if (!hoverFeature || hoverFeature.which === 'comparison') {
            return;
        }
        if (hoverFeature.level === 'state') {
            const otherFeature = compSMFeatureCollection.features.find(
                (compFeature) =>
                    compFeature.properties[StateLevelVariable.StateAcronym] ===
                    hoverFeature.feature.properties[
                        StateLevelVariable.StateAcronym
                    ]
            );

            if (otherFeature) {
                setOtherFeature({
                    which: 'comparison',
                    level: 'state',
                    feature: otherFeature as StateFeature<Polygon>['feature'],
                });
            }
        } else if (hoverFeature.level === 'school-district') {
            const otherFeature = findSchoolDistrict(
                hoverFeature,
                model,
                compSDFeatureCollection
            );

            if (otherFeature) {
                setOtherFeature({
                    which: 'comparison',
                    level: 'school-district',
                    feature:
                        otherFeature as SchoolDistrictFeature<Polygon>['feature'],
                });
            }
        }
    }, [hoverFeature]);

    useEffect(() => {
        if (!state || state.which === 'comparison') {
            if (!state && map) {
                map.fitBounds(
                    [
                        [-125.0011, 24.9493], // Southwest corner [lng, lat]
                        [-66.9326, 49.5904], // Northeast corner [lng, lat]
                    ],
                    {
                        padding: { left: 50, right: 50 },
                    }
                );
                map?.setLayoutProperty(
                    SubLayerId.NegativeSpaceStatesFill,
                    'visibility',
                    'none'
                );
                map?.setLayoutProperty(
                    SubLayerId.NegativeSpaceStatesBoundary,
                    'visibility',
                    'none'
                );
            }
            return;
        }
        if (state.level === 'state') {
            const stateAcronym =
                state.feature.properties[StateLevelVariable.StateAcronym];

            const otherFeature = compSMFeatureCollection.features.find(
                (compFeature) =>
                    compFeature.properties[StateLevelVariable.StateAcronym] ===
                    stateAcronym
            );

            if (otherFeature) {
                setOtherState({
                    which: 'comparison',
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
    }, [state, compSMFeatureCollection]);

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
        if (!schoolDistrict || schoolDistrict.which === 'comparison') {
            return;
        }

        if (schoolDistrict.level === 'school-district') {
            const otherFeature = findSchoolDistrict(
                schoolDistrict,
                model,
                compSDFeatureCollection
            );

            if (otherFeature) {
                setOtherSchoolDistrict({
                    which: 'comparison',
                    level: 'school-district',
                    feature:
                        otherFeature as SchoolDistrictFeature<Polygon>['feature'],
                });
            }
        }
    }, [schoolDistrict, compSDFeatureCollection]);

    return (
        <>
            <Map
                accessToken={accessToken}
                id={PRIMARY_MAP_ID}
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
                geocoder={{
                    bbox: [-135.70536, 20.04941, -58.49207, 51.40235], // limit to continental US
                    countries: 'us', // exclude non-US cities in bbox
                    placeholder: 'Search for a location',
                    flyTo: false,
                    trackProximity: false,
                    filter: (item) => {
                        return !filteredStates
                            .filter(
                                (stateAcronym) =>
                                    getStateName(stateAcronym).length > 0
                            )
                            .some((stateAcronym) =>
                                item.place_name
                                    .toLowerCase()
                                    .includes(
                                        getStateName(stateAcronym).toLowerCase()
                                    )
                            );
                    },
                }}
            />
        </>
    );
};

export default PrimaryMap;
