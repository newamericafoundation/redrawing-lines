import { ExpressionSpecification, Map } from 'mapbox-gl';
import { SchoolDistrictFeature, StateFeature } from 'src/lib/appState';
import { Which } from 'src/lib/appState';
import { getLayerIds } from 'src/features/Map/utils/layerId';

type Property = 'fill-opacity' | 'line-color' | 'line-width' | 'line-sort-key';

const getPropertyValue = (property: Property) => {
    switch (property) {
        case 'fill-opacity':
            return 0.8;
        case 'line-color':
            return '#1185e0'; // TODO: change this
        case 'line-width':
            return 2;
        case 'line-sort-key':
            return 2;
    }
};
const getPropertyFallback = (property: Property) => {
    switch (property) {
        case 'fill-opacity':
            return 0.3;
        case 'line-color':
            return '#000';
        case 'line-width':
            return 1;
        case 'line-sort-key':
            return 0;
    }
};

export const getSelectedCases = (
    identifier: string | number,
    property: Property
) => {
    return [
        ['==', ['get', 'id'], identifier],
        getPropertyValue(property),
        ['==', ['id'], identifier],
        getPropertyValue(property),
    ];
};

export const getSelectedExpression = (
    identifier: string | number,
    property: Property
): ExpressionSpecification => {
    return [
        'case',
        ...getSelectedCases(identifier, property),
        getPropertyFallback(property),
    ];
};

const applyFeatureSelection = (
    map: Map,
    fillLayerIds: string[],
    lineLayerIds: string[],
    feature: StateFeature['feature'] | SchoolDistrictFeature['feature'] | null
) => {
    const id = feature?.properties?.['id'] ?? feature?.id;

    const fillOpacity: ExpressionSpecification | number = feature
        ? getSelectedExpression(id!, 'fill-opacity')
        : 0.5;

    const lineColor: ExpressionSpecification | string = feature
        ? getSelectedExpression(id!, 'line-color')
        : '#000';

    const lineWidth: ExpressionSpecification | number = feature
        ? getSelectedExpression(id!, 'line-width')
        : 1;

    const lineSortKey: ExpressionSpecification | number = feature
        ? getSelectedExpression(id!, 'line-sort-key')
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

export const selectFeature = (
    which: Which,
    map: Map,
    selectedFeature: StateFeature | SchoolDistrictFeature | null
) => {
    const level = selectedFeature?.level;
    const { fill, line } = getLayerIds(which, level);

    applyFeatureSelection(map, fill, line, selectedFeature?.feature ?? null);
};
