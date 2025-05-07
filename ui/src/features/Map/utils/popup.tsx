import { Feature, Polygon } from 'geojson';
import { LngLatLike, Map, MapMouseEvent, Popup } from 'mapbox-gl';
import { SchoolDistrictProperties } from 'src/types';
import {
    SchoolDistrictLabelField,
    SchoolDistrictPopupFields,
} from 'src/features/Popups/consts';
import { Root } from 'react-dom/client';
import * as turf from '@turf/turf';
import HoverPopup from 'src/features/Popups';

export const showSchoolDistrictPopup = (
    map: Map,
    e: MapMouseEvent,
    root: Root,
    container: HTMLDivElement,
    hoverPopup: Popup,
    checkIdentifier = false
) => {
    if (e.features && e.features.length > 0) {
        const feature = e.features[0] as unknown as Feature<
            Polygon,
            SchoolDistrictProperties
        >;

        if (feature.properties) {
            const identifier = String(
                feature.properties[SchoolDistrictLabelField]
            );

            const currentIdentifier = container.getAttribute('data-identifier');
            if (!checkIdentifier || identifier !== currentIdentifier) {
                container.setAttribute('data-identifier', identifier);

                root.render(
                    <HoverPopup
                        feature={feature}
                        labelProperty={SchoolDistrictLabelField}
                        popupProperties={SchoolDistrictPopupFields}
                    />
                );

                const centroid = turf.centroid(feature);

                const center = centroid.geometry.coordinates as LngLatLike;
                hoverPopup
                    .setLngLat(center)
                    .setDOMContent(container)
                    .setMaxWidth('fit-content')
                    .addTo(map);
            }
        }
    }
};
