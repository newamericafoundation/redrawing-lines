import { Feature, FeatureCollection, Geometry } from 'geojson';
import { useEffect, useRef, useState } from 'react';
import {
    Model,
    SchoolDistrictProperties,
    SchoolDistrVariable,
} from 'src/types';
import useAppStore, { Which } from 'src/lib/appState';
import dataService from 'src/services/init/data.init';
import * as turf from '@turf/turf';
import { PRIMARY_MAP_ID } from 'src/features/Map/Primary/config';
import { useMap } from 'src/contexts/MapContexts';
import { getSchoolDistrictsSource } from 'src/hooks/utils';
import { COMPARISON_MAP_ID } from 'src/features/Map/Comparison/config';
import { LngLatBoundsLike } from 'mapbox-gl';
import { toWKTPoint } from 'src/utils/wkt';
import loadingManager from 'src/managers/Loading.init';
import { LoadingType } from 'src/lib/session/types';

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

    const getComparisonVersion = () => {
        switch (model) {
            case Model.Consolidated:
                return 'Consolidated';
            case Model.Optimized:
                return 'Optimized';
            case Model.CountyConsolidated:
                return 'County';
        }
    };

    const shouldFetchSchoolDistricts = (stateAcronym: string): boolean => {
        if (which === 'primary') {
            return (
                featureCollection.features.length === 0 ||
                featureCollection.features[0].properties[
                    SchoolDistrVariable.State
                ].toLowerCase() !== stateAcronym.toLowerCase()
            );
        }

        return (
            featureCollection.features.length === 0 ||
            featureCollection.features[0].properties[
                SchoolDistrVariable.State
            ].toLowerCase() !== stateAcronym.toLowerCase() ||
            featureCollection.features[0].properties[
                SchoolDistrVariable.Version
            ] !== getComparisonVersion()
        );
    };

    const fetchSchoolDistricts = async (
        stateAcronym: string,
        signal?: AbortSignal
    ) => {
        if (!shouldFetchSchoolDistricts(stateAcronym)) {
            return featureCollection;
        }

        const loadingInstance = loadingManager.add(
            'Fetching school districts',
            LoadingType.SchoolDistrict
        );
        try {
            setLoading(true);
            controller.current = new AbortController();

            const source = getSchoolDistrictsSource(which, model);

            const featureCollection = await dataService.getItems<
                FeatureCollection<Geometry, SchoolDistrictProperties>
            >(
                source,
                `skipGeometry=true&${SchoolDistrVariable.State}=${stateAcronym}&limit=10000`,
                signal ?? controller.current.signal
            );

            loadingManager.remove(loadingInstance);
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
            loadingManager.remove(loadingInstance);
        }
    };

    const locateSchoolDistrict = async (center: [number, number]) => {
        const loadingInstance = loadingManager.add(
            'Locating School District',
            LoadingType.SchoolDistrict
        );
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

            loadingManager.remove(loadingInstance);

            return featureCollection;
        } catch (error) {
            if ((error as Error)?.name !== 'AbortError') {
                console.error(error);
                setLoading(false);
            }
            loadingManager.remove(loadingInstance);
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

        const loadingInstance = loadingManager.add(
            'Navigating to school district',
            LoadingType.SchoolDistrict
        );
        try {
            const source = getSchoolDistrictsSource(which, model);
            const feature = await dataService.getItem<
                Feature<Geometry, SchoolDistrictProperties>
            >(source, String(schoolDistrict), '', controller.current.signal);

            const _schoolDistrict = useAppStore.getState().schoolDistrict;
            const otherSchoolDistrict =
                useAppStore.getState().otherSchoolDistrict;

            const targetSchoolDistrict =
                _schoolDistrict?.which === which
                    ? _schoolDistrict
                    : otherSchoolDistrict;

            if (feature) {
                // Check to make sure user hasnt deselected or chosen another school district
                if (
                    targetSchoolDistrict &&
                    (targetSchoolDistrict.feature.properties[
                        SchoolDistrVariable.ID
                    ] === schoolDistrict ||
                        targetSchoolDistrict.feature[SchoolDistrVariable.ID] ===
                            schoolDistrict)
                ) {
                    fitFeatureBounds(feature);
                }
            } else {
                console.warn(
                    `School district ${schoolDistrict} not found remotely.`
                );
            }
            loadingManager.remove(loadingInstance);
        } catch (error) {
            if ((error as Error)?.name !== 'AbortError') {
                console.error('Failed to go to school district:', error);
            }
            loadingManager.remove(loadingInstance);
        } finally {
            setLoading(false);
        }
    };

    return {
        featureCollection,
        fetchSchoolDistricts,
        findSchoolDistrict,
        goToSchoolDistrict,
        locateSchoolDistrict,
        loading,
    };
};
