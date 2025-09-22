import Primary from 'src/features/Map/Primary';
import Comparison from 'src/features/Map/Comparison';
import { useMap } from 'src/contexts/MapContexts';
import { useEffect, useState } from 'react';
import useAppStore, { InteractiveFeature } from 'src/lib/appState';
import { PRIMARY_MAP_ID } from 'src/features/Map/Primary/config';
import { COMPARISON_MAP_ID } from 'src/features/Map/Comparison/config';
import Panel from 'src/features/Panel';
import { StaticPopup } from 'src/features/Popups/Static';

import 'src/App.css';
import 'src/embla.css';
import 'tippy.js/dist/tippy.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

import { highlightFeature } from 'src/features/Map/utils/hover';
import { selectFeature } from 'src/features/Map/utils/selected';
import { Polygon } from 'geojson';
import Indicators from 'src/features/Indicators';
import { WelcomeModal } from 'src/features/WelcomeModal';
import Logo from 'src/features/Logo';
import { alignMaps } from 'src/features/Map/utils/sync';
import {
    ReactCompareSlider,
    ReactCompareSliderHandle,
} from 'react-compare-slider';
import Header from 'src/features/Header';
import { Loading } from 'src/features/Loading';
import { clearGeocoder } from 'src/features/Map/utils/geocoder';

function App() {
    const infoPanelOpen = useAppStore((state) => state.infoPanelOpen);
    const sliderPosition = useAppStore((state) => state.sliderPosition);
    const setSliderPosition = useAppStore((state) => state.setSliderPosition);
    const hoverFeature = useAppStore((state) => state.hoverFeature);
    const otherFeature = useAppStore((state) => state.otherFeature);
    const showNoData = useAppStore((state) => state.showNoData);
    const schoolDistrict = useAppStore((state) => state.schoolDistrict);
    const otherSchoolDistrict = useAppStore(
        (state) => state.otherSchoolDistrict
    );
    const state = useAppStore((state) => state.state);
    const otherState = useAppStore((state) => state.otherState);

    const mapsSynced = useAppStore((state) => state.mapsSynced);
    const setMapsSynced = useAppStore((state) => state.setMapsSynced);
    const reset = useAppStore((state) => state.reset);

    const [showReportLayout, setShowReportLayout] = useState(true);

    const {
        map: primaryMap,
        root: primaryRoot,
        geocoder,
    } = useMap(PRIMARY_MAP_ID);
    const { map: comparisonMap, root: comparisonRoot } =
        useMap(COMPARISON_MAP_ID);

    // When comparison is toggled on/off the same map instances are
    // used. When the App itself finally unmounts, cleanup both map instances
    useEffect(() => {
        return () => {
            if (primaryMap) {
                primaryMap.remove();
            }
            if (primaryRoot) {
                primaryRoot.unmount();
            }
            if (comparisonMap) {
                comparisonMap.remove();
            }
            if (comparisonRoot) {
                comparisonRoot.unmount();
            }
        };
    }, []);

    // Connect restart button to geocoder
    useEffect(() => {
        if (geocoder) {
            clearGeocoder(geocoder);
        }
    }, [reset]);

    useEffect(() => {
        if (!primaryMap || !comparisonMap) {
            return;
        }

        alignMaps(primaryMap, comparisonMap, setMapsSynced);
    }, [primaryMap, comparisonMap]);

    useEffect(() => {
        if (!primaryMap || !comparisonMap) return;

        const getSelectedFeature = (
            feature: InteractiveFeature,
            primary: InteractiveFeature,
            secondary: InteractiveFeature
        ) => {
            if (!primary || !secondary) return null;

            const isPrimary = feature.which === 'primary';
            const primaryMatch = primary.which === 'primary';

            return isPrimary
                ? primaryMatch
                    ? primary
                    : secondary
                : primaryMatch
                ? secondary
                : primary;
        };

        const handleHighlight = (
            interactiveFeature: InteractiveFeature<Polygon> | null
        ) => {
            if (!interactiveFeature) return;

            const selected =
                schoolDistrict && otherSchoolDistrict
                    ? getSelectedFeature(
                          interactiveFeature,
                          schoolDistrict,
                          otherSchoolDistrict
                      )
                    : state && otherState
                    ? getSelectedFeature(interactiveFeature, state, otherState)
                    : null;

            highlightFeature(
                interactiveFeature.which,
                interactiveFeature.which === 'primary'
                    ? primaryMap
                    : comparisonMap,
                interactiveFeature,
                selected
            );
        };

        const handleSelect = () => {
            if (schoolDistrict && otherSchoolDistrict) {
                [schoolDistrict, otherSchoolDistrict].forEach((district) =>
                    selectFeature(
                        district.which,
                        district.which === 'primary'
                            ? primaryMap
                            : comparisonMap,
                        district
                    )
                );
            } else if (state && otherState) {
                [state, otherState].forEach((s) =>
                    selectFeature(
                        s.which,
                        s.which === 'primary' ? primaryMap : comparisonMap,
                        s
                    )
                );
            }
        };

        if (hoverFeature || otherFeature) {
            handleHighlight(hoverFeature);
            handleHighlight(otherFeature);
        } else {
            highlightFeature('primary', primaryMap, null, null);
            highlightFeature('comparison', comparisonMap, null, null);
            handleSelect();
        }
    }, [
        hoverFeature,
        otherFeature,
        state,
        otherState,
        schoolDistrict,
        otherSchoolDistrict,
        primaryMap,
        comparisonMap,
    ]);

    useEffect(() => {
        if (primaryMap) {
            primaryMap.resize();
        }
        if (comparisonMap) {
            comparisonMap.resize();
        }
    }, [infoPanelOpen]);

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const inReport = queryParams.get('inReport');

        if (inReport === null) {
            setShowReportLayout(false);
        }
    }, []);

    const handlePositionChange = (position: number) => {
        setSliderPosition(position);
    };

    return (
        <>
            <Header showReportLayout={showReportLayout} />

            <main
                className={`${showReportLayout ? '' : 'showHeader'} ${
                    infoPanelOpen ? '' : 'infoPanelClosed'
                }`}
            >
                <ReactCompareSlider
                    handle={
                        <ReactCompareSliderHandle
                            buttonStyle={{
                                backgroundColor: 'var(--secondary-teal)',
                            }}
                        />
                    }
                    itemOne={
                        <>
                            <div
                                id="loading-screen"
                                style={{
                                    display: mapsSynced ? 'none' : 'block',
                                }}
                            />
                            <Primary
                                accessToken={
                                    import.meta.env.VITE_MAPBOX_ACCESS_TOKEN
                                }
                            />
                        </>
                    }
                    itemTwo={
                        <>
                            <div
                                id="loading-screen"
                                style={{
                                    display: mapsSynced ? 'none' : 'block',
                                }}
                            />

                            <Comparison
                                accessToken={
                                    import.meta.env.VITE_MAPBOX_ACCESS_TOKEN
                                }
                            />
                        </>
                    }
                    onlyHandleDraggable
                    position={sliderPosition}
                    onPositionChange={handlePositionChange}
                />
                <Indicators showReportLayout={showReportLayout} />

                {infoPanelOpen && <Panel showReportLayout={showReportLayout} />}
                {((hoverFeature && otherFeature) || showNoData) && (
                    <StaticPopup
                        hoverFeature={hoverFeature}
                        otherFeature={otherFeature}
                    />
                )}
                <Logo />
                <WelcomeModal />
            </main>
            <Loading />
        </>
    );
}

export default App;
