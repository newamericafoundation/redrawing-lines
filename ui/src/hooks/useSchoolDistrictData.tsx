import { Feature, FeatureCollection, Geometry } from 'geojson';
import { useEffect, useRef, useState } from 'react';
import { SchoolDistrictProperties, SchoolDistrVariable } from 'src/types';
import useAppStore, { Which } from 'src/lib/appState';
import dataService from 'src/services/init/data.init';
import * as turf from '@turf/turf';
import { PRIMARY_MAP_ID } from 'src/features/Map/Primary/config';
import { useMap } from 'src/contexts/MapContexts';
import { getSchoolDistrictsSource } from 'src/hooks/utils';
import { COMPARISON_MAP_ID } from 'src/features/Map/Comparison/config';
import { LngLatBoundsLike } from 'mapbox-gl';
import { toWKTPoint } from 'src/utils/wkt';

export const useSchoolDistrictData = (which: Which) => {
    const model = useAppStore((state) => state.model);
    const featureCollection = useAppStore((state) =>
        which === 'primary'
            ? state.primarySDFeatureCollection
            : state.comparisonSDFeatureCollection
    );
    const setFeatureCollection = useAppStore((state) =>
        which === 'primary'
            ? state.setPrimarySDFeatureCollection
            : state.setComparisonSDFeatureCollection
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

    const fetchSchoolDistricts = async (stateAcronym: string) => {
        try {
            setLoading(true);
            controller.current = new AbortController();

            const source = getSchoolDistrictsSource(which, model);

            const featureCollection = await dataService.getItems<
                FeatureCollection<Geometry, SchoolDistrictProperties>
            >(
                source,
                `skipGeometry=true&${SchoolDistrVariable.State}=${stateAcronym}&limit=10000`,
                controller.current.signal
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

    const locateSchoolDistrict = async (center: [number, number]) => {
        try {
            setLoading(true);
            controller.current = new AbortController();

            const source = getSchoolDistrictsSource(which, model);

            const wktPoint = toWKTPoint(center);

            const featureCollection = await dataService.getItems<
                FeatureCollection<Geometry, SchoolDistrictProperties>
            >(
                source,
                `skipGeometry=true&filter=INTERSECTS(geometry, ${wktPoint})&limit=10000`,
                controller.current.signal
            );

            return featureCollection;
        } catch (error) {
            if ((error as Error)?.name !== 'AbortError') {
                console.error(error);
                setLoading(false);
            }
        }
    };

    const findSchoolDistrict = (
        schoolDistrict: number
    ): Feature<Geometry, SchoolDistrictProperties> | undefined => {
        return featureCollection.features.find(
            (feature) => feature.id === schoolDistrict
        );
    };

    const fitFeatureBounds = (
        feature: Feature<Geometry, SchoolDistrictProperties>
    ) => {
        const bounds = turf.bbox(feature) as LngLatBoundsLike;
        map!.fitBounds(bounds, {
            padding: 40,
            speed: 1.2,
        });
    };

    const goToSchoolDistrict = async (schoolDistrict: number) => {
        if (!map) {
            console.error('goToSchoolDistrict called without map instance');
            return;
        }

        setLoading(true);
        controller.current = new AbortController();

        const model = useAppStore.getState().model;

        try {
            const source = getSchoolDistrictsSource(which, model);

            const feature = await dataService.getItem<
                Feature<Geometry, SchoolDistrictProperties>
            >(source, String(schoolDistrict), '', controller.current.signal);

            if (feature) {
                fitFeatureBounds(feature);
            } else {
                console.warn(
                    `School district ${schoolDistrict} not found remotely.`
                );
            }
        } catch (error) {
            if ((error as Error)?.name !== 'AbortError') {
                console.error('Failed to go to school district:', error);
            }
        } finally {
            setLoading(false);
        }
    };

    // const getDatasetsInBounds = useCallback((): FeatureCollection<
    //     Geometry,
    //     SchoolDistrictProperties
    // > => {
    //     if (map && state) {
    //         // TODO: swap to actual layers for comparison
    //         const layerId = getSchoolDistrictsLayer(which, model);
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
    //                 const key = feature.id ?? feature.properties?.name;
    //                 if (key && !uniqueFeaturesMap.has(key)) {
    //                     uniqueFeaturesMap.set(key, feature);
    //                 }
    //             });

    //             const uniqueFeatures = Array.from(uniqueFeaturesMap.values());

    //             if (isSchoolDistrictProperty(variable)) {
    //                 const { rankedCollection } = rankFeaturesByValue(
    //                     turf.featureCollection<
    //                         Geometry,
    //                         SchoolDistrictProperties
    //                     >(uniqueFeatures),
    //                     variable
    //                 );
    //                 return rankedCollection;
    //             }
    //             return turf.featureCollection<
    //                 Geometry,
    //                 SchoolDistrictProperties
    //             >(uniqueFeatures);
    //         }
    //     }

    //     return featureCollection;
    // }, [map, model, featureCollection, state]);

    // const schoolDistrictsInBounds = useMemo(
    //     () => (subscribe ? getDatasetsInBounds() : featureCollection),
    //     [mapMoved, state, featureCollection]
    // );

    return {
        featureCollection,
        fetchSchoolDistricts,
        findSchoolDistrict,
        goToSchoolDistrict,
        locateSchoolDistrict,
        loading,
        // schoolDistrictsInBounds,
    };
};
