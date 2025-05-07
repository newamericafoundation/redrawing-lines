import syncMaps from '@mapbox/mapbox-gl-sync-move';
import { Map } from 'mapbox-gl';

export const alignMaps = (
    mapA: Map,
    mapB: Map,
    setMapsSynced: (mapsSynced: boolean) => void
) => {
    // Confirm the maps positioning is aligned
    const checkMaps = () => {
        const centerMatch =
            mapA.getCenter().toArray().toString() ===
            mapB.getCenter().toArray().toString();
        const zoomMatch = mapA.getZoom() === mapB.getZoom();
        const bearingMatch = mapA.getBearing() === mapB.getBearing();
        const pitchMatch = mapA.getPitch() === mapB.getPitch();
        if (centerMatch && zoomMatch && bearingMatch && pitchMatch) {
            setMapsSynced(true);

            ['zoom', 'move', 'rotate', 'pitch'].forEach((event) => {
                mapB.off(event, checkMaps);
            });
        }
    };

    ['zoom', 'move', 'rotate', 'pitch'].forEach((event) => {
        mapB.on(event, checkMaps);
    });

    // Align the maps based on current positioning
    mapB.setCenter(mapA.getCenter());
    mapB.setZoom(mapA.getZoom());
    mapB.setBearing(mapA.getBearing());
    mapB.setPitch(mapA.getPitch());

    // Synchronize future movements
    syncMaps(mapA, mapB);
};
