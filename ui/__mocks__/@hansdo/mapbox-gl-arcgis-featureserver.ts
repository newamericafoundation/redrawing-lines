import { vi } from 'vitest';

console.log('mapbox-gl-arcgis-featureserver mock loaded');

const FeatureService = vi.fn().mockImplementation((sourceId, map, options) => ({
    sourceId,
    map,
    options,
}));

export default FeatureService;
