import { Feature, FeatureCollection, Geometry } from 'geojson';
import { useEffect, useRef, useState } from 'react';
import { StateLevelVariable, StateMetricProperties } from 'src/types';
import useAppStore, { Which } from 'src/lib/appState';
import dataService from 'src/services/init/data.init';
import * as turf from '@turf/turf';
import { PRIMARY_MAP_ID } from 'src/features/Map/Primary/config';
import { useMap } from 'src/contexts/MapContexts';
import { getStateMetricsSource } from 'src/hooks/utils';
import { COMPARISON_MAP_ID } from 'src/features/Map/Comparison/config';
import { LngLatBoundsLike } from 'mapbox-gl';
import { filteredStates } from 'src/features/Map/utils/filter';

export const useStateMetricData = (which: Which) => {
    const model = useAppStore((state) => state.model);
    const featureCollection = useAppStore((state) =>
        which === 'primary'
            ? state.primarySMFeatureCollection
            : state.comparisonSMFeatureCollection
    );
    const setFeatureCollection = useAppStore((state) =>
        which === 'primary'
            ? state.setPrimarySMFeatureCollection
            : state.setComparisonSMFeatureCollection
    );

    const [loading, setLoading] = useState(false);
    const controller = useRef<AbortController | null>(null);
    const isMounted = useRef(true);

    const { map } = useMap(
        which === 'primary' ? PRIMARY_MAP_ID : COMPARISON_MAP_ID
    );

    useEffect(() => {
        isMounted.current = true;

        return () => {
            isMounted.current = false;
            if (controller.current) {
                controller.current.abort();
            }
        };
    }, []);

    const findState = (
        stateAcronym: string
    ): Feature<Geometry, StateMetricProperties> | undefined => {
        return featureCollection.features.find(
            (feature) =>
                feature.properties[StateLevelVariable.StateAcronym] ===
                stateAcronym
        );
    };

    const fetchStates = async () => {
        if (which === 'primary' && featureCollection.features.length > 0) {
            return featureCollection;
        }

        try {
            setLoading(true);
            controller.current = new AbortController();

            // TODO: swap to actual sources for comparison
            const source = getStateMetricsSource(which, model);

            const featureCollection = await dataService.getItems<
                FeatureCollection<Geometry, StateMetricProperties>
            >(
                source,
                `&skipGeometry=true&limit=500`,
                controller.current.signal
            );

            // TODO: remove this filter after removing irrelevant features
            featureCollection.features = featureCollection.features.filter(
                (feature) =>
                    !filteredStates.includes(
                        feature.properties[StateLevelVariable.StateAcronym]
                    )
            );

            if (isMounted.current) {
                setFeatureCollection(featureCollection);
                setLoading(false);
                return featureCollection;
            }
        } catch (error) {
            if ((error as Error)?.name !== 'AbortError') {
                console.error(error);
                setLoading(false);
            }
        }
    };

    const goToState = async (state: string) => {
        if (!map) {
            console.error('goToState called without map instance');
            return;
        }

        try {
            setLoading(true);
            controller.current = new AbortController();
            const source = getStateMetricsSource(which, model);

            const featureCollection = await dataService.getItems<
                FeatureCollection<Geometry, StateMetricProperties>
            >(
                source,
                `${StateLevelVariable.StateAcronym}=${state}&limit=500`
                // TODO: add alternative path to this func for states
                // controller.current.signal
            );

            if (featureCollection.features.length === 1) {
                const feature = featureCollection.features[0];
                const bounds = turf.bbox(feature) as LngLatBoundsLike;

                map.fitBounds(bounds, {
                    padding: 40,
                    duration: 1000,
                });
            }

            setLoading(false);
        } catch (error) {
            if ((error as Error)?.name !== 'AbortError') {
                console.error(error);
                setLoading(false);
            }
        }
    };

    // const getDatasetsInBounds = useCallback((): FeatureCollection<
    //     Geometry,
    //     StateMetricProperties
    // > => {
    //     if (map && !currentState) {
    //         // TODO: swap to actual layers for comparison
    //         const layerId = getStateMetricsLayer(which, model);
    //         const features = map.queryRenderedFeatures({
    //             layers: [layerId],
    //         });
    //         const bounds = map.getBounds();
    //         if (bounds) {
    //             const southWest = bounds.getSouthWest();
    //             const northEast = bounds.getNorthEast();
    //             const southEast = bounds.getSouthEast();
    //             const northWest = bounds.getNorthWest();

    //             const bbox = turf.polygon([
    //                 [
    //                     [northEast.lng, northEast.lat],
    //                     [northWest.lng, northWest.lat],
    //                     [southWest.lng, southWest.lat],
    //                     [southEast.lng, southEast.lat],
    //                     [northEast.lng, northEast.lat],
    //                 ],
    //             ]);

    //             const touchingFeatures = features
    //                 .filter((feature) => turf.booleanIntersects(feature, bbox))
    //                 .map((feature) => ({
    //                     ...feature,
    //                     geometry: null as unknown as Geometry,
    //                 }));

    //             const uniqueFeaturesMap = new Map();

    //             touchingFeatures.forEach((feature) => {
    //                 // TODO: swap name for better unique property
    //                 // MVT feat missing id, multiple fid for same county
    //                 const key =
    //                     feature.id ??
    //                     feature.properties?.[StateLevelVariable.StateAcronym];
    //                 if (key && !uniqueFeaturesMap.has(key)) {
    //                     uniqueFeaturesMap.set(key, feature);
    //                 }
    //             });

    //             const uniqueFeatures = Array.from(uniqueFeaturesMap.values());
    //             return turf.featureCollection(
    //                 uniqueFeatures
    //             ) as FeatureCollection<Geometry, StateMetricProperties>;
    //         }
    //     }

    //     return featureCollection;
    // }, [map, model, featureCollection, currentState]);

    // const statesInBounds = useMemo(
    //     () => (subscribe ? getDatasetsInBounds() : featureCollection),
    //     [mapMoved]
    // );

    return {
        featureCollection,
        fetchStates,
        findState,
        goToState,
        loading,
        // statesInBounds,
    };
};
