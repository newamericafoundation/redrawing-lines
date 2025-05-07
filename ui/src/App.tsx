import Primary from 'src/features/Map/Primary';
import Comparison from 'src/features/Map/Comparison';
import { useMap } from 'src/contexts/MapContexts';
import { useEffect, useMemo, useRef } from 'react';
import useAppStore, { InteractiveFeature } from 'src/lib/appState';
import { PRIMARY_MAP_ID } from 'src/features/Map/Primary/config';
import { COMPARISON_MAP_ID } from 'src/features/Map/Comparison/config';
import Panel from 'src/features/Panel';
import { StaticPopup } from 'src/features/Popups/Static';

import 'mapbox-gl-compare/dist/mapbox-gl-compare.css';
import 'src/App.css';
import 'src/embla.css';

import Compare from 'mapbox-gl-compare';
import { highlightFeature } from 'src/features/Map/utils/hover';
import { selectFeature } from 'src/features/Map/utils/selected';
import { Polygon } from 'geojson';
import Indicators from 'src/features/Indicators';
import { WelcomeModal } from './features/WelcomeModal';

function App() {
    const infoPanelOpen = useAppStore((state) => state.infoPanelOpen);
    const sliderPosition = useAppStore((state) => state.sliderPosition);
    const setSliderPosition = useAppStore((state) => state.setSliderPosition);
    const hoverFeature = useAppStore((state) => state.hoverFeature);
    const otherFeature = useAppStore((state) => state.otherFeature);
    const schoolDistrict = useAppStore((state) => state.schoolDistrict);
    const otherSchoolDistrict = useAppStore(
        (state) => state.otherSchoolDistrict
    );
    const state = useAppStore((state) => state.state);
    const otherState = useAppStore((state) => state.otherState);
    const comparisonContainerRef = useRef(null);
    const compareRef = useRef<Compare>(null);

    const { map: primaryMap, root: primaryRoot } = useMap(PRIMARY_MAP_ID);
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

            if (compareRef.current) {
                compareRef.current.remove();
            }
        };
    }, []);

    useEffect(() => {
        if (!primaryMap || !comparisonMap || !comparisonContainerRef.current) {
            return;
        }

        const compare = new Compare(
            primaryMap,
            comparisonMap,
            comparisonContainerRef.current
        );

        compareRef.current = compare;
        compare.on('slideend', (e) => {
            setSliderPosition(e.currentPosition);
        });
    }, [primaryMap, comparisonMap]);

    useEffect(() => {
        if (!compareRef.current) {
            return;
        }
        compareRef.current.setSlider(sliderPosition);
    }, [sliderPosition]);

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

    const MemoizedPanel = useMemo(
        () => (infoPanelOpen ? <Panel /> : null),
        [infoPanelOpen]
    );

    return (
        <main>
            <Indicators />
            <div
                id="comparison-container"
                ref={comparisonContainerRef}
                style={{ position: 'relative', height: '100vh' }}
            >
                <Primary
                    accessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
                />
                <Comparison
                    accessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
                />
            </div>

            {MemoizedPanel}
            {hoverFeature && otherFeature && (
                <StaticPopup
                    hoverFeature={hoverFeature}
                    otherFeature={otherFeature}
                />
            )}
            <WelcomeModal />
        </main>
    );
}

export default App;
