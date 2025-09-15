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
            tiles: [
                `${import.meta.env.VITE_SOURCE}/collections/${
                    SourceId.StateMetrics_StatusQuo
                }/tiles/WebMercatorQuad/{z}/{y}/{x}?f=mvt`,
            ],
            minzoom: 1,
            maxzoom: 10,
        },
    },
    {
        id: SourceId.StateMetrics_Optimized,
        type: Sources.VectorTile,
        definition: {
            type: 'vector',
            tiles: [
                `${import.meta.env.VITE_SOURCE}/collections/${
                    SourceId.StateMetrics_Optimized
                }/tiles/WebMercatorQuad/{z}/{y}/{x}?f=mvt`,
            ],
            minzoom: 1,
            maxzoom: 10,
        },
    },
    {
        id: SourceId.StateMetrics_Consolidated,
        type: Sources.VectorTile,
        definition: {
            type: 'vector',
            tiles: [
                `${import.meta.env.VITE_SOURCE}/collections/${
                    SourceId.StateMetrics_Consolidated
                }/tiles/WebMercatorQuad/{z}/{y}/{x}?f=mvt`,
            ],
            minzoom: 1,
            maxzoom: 10,
        },
    },
    {
        id: SourceId.StateMetrics_CountyConsolidated,
        type: Sources.VectorTile,
        definition: {
            type: 'vector',
            tiles: [
                `${import.meta.env.VITE_SOURCE}/collections/${
                    SourceId.StateMetrics_CountyConsolidated
                }/tiles/WebMercatorQuad/{z}/{y}/{x}?f=mvt`,
            ],
            minzoom: 1,
            maxzoom: 10,
        },
    },
    {
        id: SourceId.SchoolDistricts_StatusQuo,
        type: Sources.VectorTile,
        definition: {
            type: 'vector',
            tiles: [
                `${import.meta.env.VITE_SOURCE}/collections/${
                    SourceId.SchoolDistricts_StatusQuo
                }/tiles/WebMercatorQuad/{z}/{y}/{x}?f=mvt`,
            ],
            minzoom: 1,
            maxzoom: 10,
        },
    },
    {
        id: SourceId.SchoolDistricts_Optimized,
        type: Sources.VectorTile,
        definition: {
            type: 'vector',
            tiles: [
                `${import.meta.env.VITE_SOURCE}/collections/${
                    SourceId.SchoolDistricts_Optimized
                }/tiles/WebMercatorQuad/{z}/{y}/{x}?f=mvt`,
            ],
            minzoom: 1,
            maxzoom: 10,
        },
    },
    {
        id: SourceId.SchoolDistricts_Consolidated,
        type: Sources.VectorTile,
        definition: {
            type: 'vector',
            tiles: [
                `${import.meta.env.VITE_SOURCE}/collections/${
                    SourceId.SchoolDistricts_Consolidated
                }/tiles/WebMercatorQuad/{z}/{y}/{x}?f=mvt`,
            ],
            minzoom: 1,
            maxzoom: 10,
        },
    },
    {
        id: SourceId.SchoolDistricts_CountyConsolidated,
        type: Sources.VectorTile,
        definition: {
            type: 'vector',
            tiles: [
                `${import.meta.env.VITE_SOURCE}/collections/${
                    SourceId.SchoolDistricts_CountyConsolidated
                }/tiles/WebMercatorQuad/{z}/{y}/{x}?f=mvt`,
            ],
            minzoom: 1,
            maxzoom: 10,
        },
    },
];
