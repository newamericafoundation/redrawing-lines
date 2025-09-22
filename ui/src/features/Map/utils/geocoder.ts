import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

export const clearGeocoder = (geocoder: MapboxGeocoder) => {
    try {
        geocoder.clear();
        const geocoderInput = document.querySelector(
            '.mapboxgl-ctrl-geocoder--input'
        ) as HTMLInputElement;
        if (geocoderInput) {
            geocoderInput.blur();
        }
    } catch (error) {
        console.error('Geocoder error: ', error);
    }
};
