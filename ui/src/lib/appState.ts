import { Feature, FeatureCollection, Geometry, Polygon } from 'geojson';
import {
    SchoolDistrDataVariable,
    StateLevelDataVariable,
    StateLevelVariable,
    SchoolDistrictProperties,
    Model,
    StateMetricProperties,
} from 'src/types';
import { create } from 'zustand';

type Variable = SchoolDistrDataVariable | StateLevelDataVariable;

export type Which = 'primary' | 'comparison';

export type StateFeature<T extends Geometry = Geometry> = {
    level: 'state';
    which: Which;
    feature: Feature<T, StateMetricProperties & { id?: number }>;
};

export type SchoolDistrictFeature<T extends Geometry = Geometry> = {
    level: 'school-district';
    which: Which;
    feature: Feature<T, SchoolDistrictProperties & { id?: number }>;
};

export type InteractiveFeature<T extends Geometry = Geometry> =
    | StateFeature<T>
    | SchoolDistrictFeature<T>;

export interface AppState {
    infoPanelOpen: boolean;
    setInfoPanelOpen: (infoPanelOpen: boolean) => void;
    sliderPosition: number;
    setSliderPosition: (sliderPosition: number) => void;
    initialMapLoad: boolean;
    setInitialMapLoad: (initialMapLoad: boolean) => void;
    mapsSynced: boolean;
    setMapsSynced: (mapsSynced: boolean) => void;
    mapMoved: number;
    setMapMoved: (mapMoved: number) => void;
    comparisonActive: boolean;
    setComparisonActive: (comparisonActive: boolean) => void;
    model: Model;
    setModel: (model: Model) => void;
    variable: Variable;
    setVariable: (variable: Variable) => void;
    state: StateFeature | null;
    setState: (currentState: StateFeature | null) => void;
    schoolDistrict: SchoolDistrictFeature | null;
    setSchoolDistrict: (schoolDistrict: SchoolDistrictFeature | null) => void;
    otherState: StateFeature | null;
    setOtherState: (otherState: StateFeature | null) => void;
    otherSchoolDistrict: SchoolDistrictFeature | null;
    setOtherSchoolDistrict: (
        otherSchoolDistrict: SchoolDistrictFeature | null
    ) => void;
    hoverFeature: InteractiveFeature<Polygon> | null;
    setHoverFeature: (hoverFeature: InteractiveFeature<Polygon> | null) => void;
    otherFeature: InteractiveFeature<Polygon> | null;
    setOtherFeature: (otherFeature: InteractiveFeature<Polygon> | null) => void;
    primarySDFeatureCollection: FeatureCollection<
        Geometry,
        SchoolDistrictProperties
    >;
    setPrimarySDFeatureCollection: (
        primarySDFeatureCollection: FeatureCollection<
            Geometry,
            SchoolDistrictProperties
        >
    ) => void;
    comparisonSDFeatureCollection: FeatureCollection<
        Geometry,
        SchoolDistrictProperties
    >;
    setComparisonSDFeatureCollection: (
        comparisonSDFeatureCollection: FeatureCollection<
            Geometry,
            SchoolDistrictProperties
        >
    ) => void;
    primarySMFeatureCollection: FeatureCollection<
        Geometry,
        StateMetricProperties
    >;
    setPrimarySMFeatureCollection: (
        primarySMFeatureCollection: FeatureCollection<
            Geometry,
            StateMetricProperties
        >
    ) => void;
    comparisonSMFeatureCollection: FeatureCollection<
        Geometry,
        StateMetricProperties
    >;
    setComparisonSMFeatureCollection: (
        comparisonSMFeatureCollection: FeatureCollection<
            Geometry,
            StateMetricProperties
        >
    ) => void;
}

const useAppStore = create<AppState>()((set) => ({
    infoPanelOpen: true,
    setInfoPanelOpen: (infoPanelOpen) => set({ infoPanelOpen }),
    sliderPosition: 50,
    setSliderPosition: (sliderPosition) => set({ sliderPosition }),
    initialMapLoad: false,
    setInitialMapLoad: (initialMapLoad) => set({ initialMapLoad }),
    mapsSynced: false,
    setMapsSynced: (mapsSynced) => set({ mapsSynced }),
    mapMoved: 0,
    setMapMoved: (mapMoved) => set({ mapMoved }),
    comparisonActive: true,
    setComparisonActive: (comparisonActive) => set({ comparisonActive }),
    model: Model.Optimized,
    setModel: (model) => set({ model }),
    variable: StateLevelVariable.ThielRacial,
    setVariable: (variable) => set({ variable }),
    state: null,
    setState: (state) => set({ state }),
    schoolDistrict: null,
    setSchoolDistrict: (schoolDistrict) => set({ schoolDistrict }),
    otherState: null,
    setOtherState: (otherState) => set({ otherState }),
    otherSchoolDistrict: null,
    setOtherSchoolDistrict: (otherSchoolDistrict) =>
        set({ otherSchoolDistrict }),
    hoverFeature: null,
    setHoverFeature: (hoverFeature) => set({ hoverFeature }),
    otherFeature: null,
    setOtherFeature: (otherFeature) => set({ otherFeature }),
    primarySDFeatureCollection: {
        type: 'FeatureCollection',
        features: [],
    },
    setPrimarySDFeatureCollection: (primarySDFeatureCollection) =>
        set({ primarySDFeatureCollection }),
    comparisonSDFeatureCollection: {
        type: 'FeatureCollection',
        features: [],
    },
    setComparisonSDFeatureCollection: (comparisonSDFeatureCollection) =>
        set({ comparisonSDFeatureCollection }),
    primarySMFeatureCollection: {
        type: 'FeatureCollection',
        features: [],
    },
    setPrimarySMFeatureCollection: (primarySMFeatureCollection) =>
        set({ primarySMFeatureCollection }),
    comparisonSMFeatureCollection: {
        type: 'FeatureCollection',
        features: [],
    },
    setComparisonSMFeatureCollection: (comparisonSMFeatureCollection) =>
        set({ comparisonSMFeatureCollection }),
}));

export default useAppStore;
