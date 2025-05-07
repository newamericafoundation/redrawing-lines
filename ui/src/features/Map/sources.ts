import { SourceConfig, Sources } from 'src/components/Map/types';

export enum SourceId {
    StateMetrics_StatusQuo = 'state_metrics_sq',
    StateMetrics_Optimized = 'state_metrics_optim',
    StateMetrics_Consolidated = 'state_metrics_consol',
    StateMetrics_CountyConsolidated = 'state_metrics_county',
    SchoolDistricts_StatusQuo = 'school_districts_sq',
    SchoolDistricts_Optimized = 'school_districts_optim',
    SchoolDistricts_Consolidated = 'school_districts_consol',
    SchoolDistricts_CountyConsolidated = 'school_districts_county',
}

const makeTileURL = (sourceLayer: string) => {
    const baseUrl = window.location.origin; // e.g., http://localhost:5173

    return `${baseUrl}/api/collections/${sourceLayer}/tiles/WebMercatorQuad/{z}/{y}/{x}?f=mvt`;
};

/**
 * Configurations for sources in the map. Supports GeoJSON, VectorTile, and Esri Feature Service sources
 *
 * @constant
 */
export const sourceConfigs: SourceConfig[] = [
    {
        id: SourceId.StateMetrics_StatusQuo,
        type: Sources.VectorTile,
        definition: {
            type: 'vector',
            tiles: [makeTileURL(SourceId.StateMetrics_StatusQuo)],
            minzoom: 1,
            maxzoom: 15,
        },
    },
    {
        id: SourceId.StateMetrics_Optimized,
        type: Sources.VectorTile,
        definition: {
            type: 'vector',
            tiles: [makeTileURL(SourceId.StateMetrics_Optimized)],
            minzoom: 1,
            maxzoom: 15,
        },
    },
    {
        id: SourceId.StateMetrics_Consolidated,
        type: Sources.VectorTile,
        definition: {
            type: 'vector',
            tiles: [makeTileURL(SourceId.StateMetrics_Consolidated)],
            minzoom: 1,
            maxzoom: 15,
        },
    },
    {
        id: SourceId.StateMetrics_CountyConsolidated,
        type: Sources.VectorTile,
        definition: {
            type: 'vector',
            tiles: [makeTileURL(SourceId.StateMetrics_CountyConsolidated)],
            minzoom: 1,
            maxzoom: 15,
        },
    },
    {
        id: SourceId.SchoolDistricts_StatusQuo,
        type: Sources.VectorTile,
        definition: {
            type: 'vector',
            tiles: [makeTileURL(SourceId.SchoolDistricts_StatusQuo)],
            minzoom: 1,
            maxzoom: 15,
        },
    },
    {
        id: SourceId.SchoolDistricts_Optimized,
        type: Sources.VectorTile,
        definition: {
            type: 'vector',
            tiles: [makeTileURL(SourceId.SchoolDistricts_Optimized)],
            minzoom: 1,
            maxzoom: 15,
        },
    },
    {
        id: SourceId.SchoolDistricts_Consolidated,
        type: Sources.VectorTile,
        definition: {
            type: 'vector',
            tiles: [makeTileURL(SourceId.SchoolDistricts_Consolidated)],
            minzoom: 1,
            maxzoom: 15,
        },
    },
    {
        id: SourceId.SchoolDistricts_CountyConsolidated,
        type: Sources.VectorTile,
        definition: {
            type: 'vector',
            tiles: [makeTileURL(SourceId.SchoolDistricts_CountyConsolidated)],
            minzoom: 1,
            maxzoom: 15,
        },
    },
];
