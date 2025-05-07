import { Feature, Geometry } from 'geojson';
import { ExpressionSpecification } from 'mapbox-gl';
import {
    ColorBrewerIndex,
    FriendlyColorBrewerPalettes,
    ValidThresholdArray,
} from 'src/utils/colors/types';
import colorbrewer from 'colorbrewer';
import {
    getPropertyColorThreshhold,
    PropertyColors,
    validColorBrewerIndex,
} from 'src/utils/colors/consts';
import { SchoolDistrVariable, StateLevelVariable } from 'src/types';

export const createColorRange = (
    count: number,
    scheme: FriendlyColorBrewerPalettes
): string[] => {
    if (!validColorBrewerIndex.includes(count)) {
        throw new Error(`Palette "${scheme}" does not support ${count} colors`);
    }

    const index = count as ColorBrewerIndex;
    const palette = colorbrewer[scheme][index];

    return palette;
};

export const getGradient = (
    variable: SchoolDistrVariable | StateLevelVariable | string
) => {
    if (!PropertyColors[variable]) {
        throw new Error(
            `Missing color configuration for variable "${variable}"`
        );
    }

    const propertyThreshold = getPropertyColorThreshhold(variable);

    const groups =
        propertyThreshold === 'dynamic' ? 6 : (propertyThreshold ?? []).length;
    const palette = createColorRange(groups ?? 6, PropertyColors[variable]);

    return palette;
};

const formatStepExpression = (
    property: SchoolDistrVariable | StateLevelVariable | string,
    values: number[]
): ExpressionSpecification => {
    if (!PropertyColors[property]) {
        throw new Error(
            `Missing color configuration for property "${property}"`
        );
    }

    const colorRange = createColorRange(
        values.length + 1,
        PropertyColors[property]
    );

    const expression: ExpressionSpecification = [
        'step',
        ['coalesce', ['to-number', ['get', property], 0], 0],
        colorRange[0], // Default Color
    ];

    for (let i = 0; i < values.length; i++) {
        expression.push(values[i], colorRange[i + 1]);
    }

    return expression;
};

const groupData = (data: number[], numGroups: number): number[] => {
    if (numGroups < 1) {
        throw new Error('Number of groups must be at least 1.');
    }

    const sorted = [...data].sort((a, b) => a - b);
    const thresholds: number[] = [];

    for (let i = 1; i < numGroups; i++) {
        const pos = (i * (sorted.length - 1)) / numGroups;
        const lower = Math.floor(pos);
        const upper = Math.ceil(pos);
        const weight = pos - lower;
        const threshold = sorted[lower] * (1 - weight) + sorted[upper] * weight;
        thresholds.push(threshold);
    }

    return thresholds;
};

export const createDynamicStepExpression = <T>(
    features: Feature<Geometry, T>[],
    property: keyof T,
    groups: number
): ExpressionSpecification => {
    const data = features.flatMap((feature) => {
        const value = Number(feature.properties[property] ?? 0);
        if (isNaN(value)) {
            throw new Error(
                `Invalid number detected in property: ${String(property)}`
            );
        }
        return value;
    });

    const thresholds = groupData(data, groups);

    const expression = formatStepExpression(String(property), thresholds);

    return expression;
};

export const createStaticStepExpression = (
    property: SchoolDistrVariable | StateLevelVariable | string,
    thresholds: ValidThresholdArray
): ExpressionSpecification => {
    const expression = formatStepExpression(String(property), thresholds);

    return expression;
};

export const createDynamicColorMappingFunction = <T>(
    features: Feature<Geometry, T>[],
    property: keyof T,
    groups: number
) => {
    const data = features.flatMap((feature) => {
        const value = Number(feature.properties[property] ?? 0);
        if (isNaN(value)) {
            throw new Error(
                `Invalid number detected in property: ${String(property)}`
            );
        }
        return value;
    });

    const thresholds = groupData(data, groups);
    const colors = PropertyColors[property as string];
    if (!colors) {
        throw new Error(
            `Missing color configuration for property "${String(property)}"`
        );
    }

    const colorRange = createColorRange(thresholds.length + 1, colors);

    return ({ value }: { value: number }) => {
        for (let i = 0; i < thresholds.length; i++) {
            if (value < thresholds[i]) {
                return colorRange[i];
            }
        }
        return colorRange[colorRange.length - 1];
    };
};

// color: (params) => {
//     return params.value >= 150 ? '#e74c3c' : '#2ecc71';
// },

export const createStaticColorMappingFunction = (
    property: SchoolDistrVariable | StateLevelVariable | string,
    thresholds: number[]
) => {
    if (!PropertyColors[property]) {
        throw new Error(
            `Missing color configuration for property "${property}"`
        );
    }

    const colorRange = createColorRange(
        thresholds.length + 1,
        PropertyColors[property]
    );

    return ({ value }: { value: number }) => {
        for (let i = 0; i < thresholds.length; i++) {
            if (value < thresholds[i]) {
                return colorRange[i];
            }
        }
        return colorRange[colorRange.length - 1];
    };
};
