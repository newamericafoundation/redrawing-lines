import { Polygon } from 'geojson';
import { Map, ExpressionSpecification } from 'mapbox-gl';
import {
    InteractiveFeature,
    SchoolDistrictFeature,
    StateFeature,
    Which,
} from 'src/lib/appState';
import { getLayerIds } from 'src/features/Map/utils/layerId';
import { getSelectedCases } from 'src/features/Map/utils/selected';

const applyFeatureHighlighting = (
    map: Map,
    fillLayerIds: string[],
    lineLayerIds: string[],
    hoverFeature: InteractiveFeature<Polygon>['feature'] | null,
    selectedFeature:
        | StateFeature['feature']
        | SchoolDistrictFeature['feature']
        | null
) => {
    const id = hoverFeature?.properties?.['id'] ?? hoverFeature?.id;
    const selectedFeatureId =
        selectedFeature?.properties?.['id'] ?? selectedFeature?.id;

    const fillOpacity: ExpressionSpecification | number = hoverFeature
        ? [
              'case',
              ['==', ['get', 'id'], id],
              0.8,
              ['==', ['id'], id],
              0.8,
              ...(selectedFeature
                  ? getSelectedCases(selectedFeatureId!, 'fill-opacity')
                  : []),
              0.3,
          ]
        : 0.5;

    const lineColor: ExpressionSpecification | string = hoverFeature
        ? [
              'case',
              ['==', ['get', 'id'], id],
              '#FFF',
              ['==', ['id'], id],
              '#FFF',
              ...(selectedFeature
                  ? getSelectedCases(selectedFeatureId!, 'line-color')
                  : []),
              '#000',
          ]
        : '#000';

    const lineWidth: ExpressionSpecification | number = hoverFeature
        ? [
              'case',
              ['==', ['get', 'id'], id],
              2,
              ['==', ['id'], id],
              2,
              ...(selectedFeature
                  ? getSelectedCases(selectedFeatureId!, 'line-width')
                  : []),
              1,
          ]
        : 1;

    const lineSortKey: ExpressionSpecification | number = hoverFeature
        ? [
              'case',
              ['==', ['get', 'id'], id],
              1,
              ['==', ['id'], id],
              1,
              ...(selectedFeature
                  ? getSelectedCases(selectedFeatureId!, 'line-sort-key')
                  : []),
              0,
          ]
        : 0;

    fillLayerIds.forEach((layerId) =>
        map.setPaintProperty(layerId, 'fill-opacity', fillOpacity)
    );

    lineLayerIds.forEach((layerId) => {
        map.setPaintProperty(layerId, 'line-color', lineColor);
        map.setPaintProperty(layerId, 'line-width', lineWidth);
        map.setLayoutProperty(layerId, 'line-sort-key', lineSortKey);
    });
};

export const highlightFeature = (
    which: Which,
    map: Map,
    hoverFeature: InteractiveFeature<Polygon> | null,
    selectedFeature: StateFeature | SchoolDistrictFeature | null
) => {
    const level = hoverFeature?.level;
    const { fill, line } = getLayerIds(which, level);

    applyFeatureHighlighting(
        map,
        fill,
        line,
        hoverFeature?.feature ?? null,
        selectedFeature?.feature ?? null
    );
};
