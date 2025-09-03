declare module '@mapbox/mapbox-gl-sync-move' {
    import mapboxgl from 'mapbox-gl';

    function syncMaps(mapA: mapboxgl.Map, mapB: mapboxgl.Map): () => void;

    export default syncMaps;
}
