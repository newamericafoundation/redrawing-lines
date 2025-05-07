import { FeatureCollection, Geometry, Feature } from 'geojson';

export const rankFeaturesByValue = <T extends Record<string, string | number>>(
    featureCollection: FeatureCollection<Geometry, T>,
    property: keyof T,
    featureId?: string | number,
    idProperty?: keyof T
): {
    rankedCollection: FeatureCollection<Geometry, T & { rank: number }>;
    rankOfFeature: number | null;
} => {
    if (
        !featureCollection ||
        featureCollection.type !== 'FeatureCollection' ||
        !Array.isArray(featureCollection.features)
    ) {
        throw new Error('Invalid FeatureCollection');
    }

    const sortedFeatures = [...featureCollection.features].sort((a, b) => {
        const aVal = Number(a.properties?.[property] ?? 0);
        const bVal = Number(b.properties?.[property] ?? 0);
        return (bVal as number) - (aVal as number); // Descending order
    }) as Feature<Geometry, T & { rank: number }>[];

    let rankOfFeature: number | null = null;
    // Add rank to each feature
    sortedFeatures.forEach((feature, index) => {
        const rank = index + 1;
        (feature.properties as T & { rank: number }).rank = rank;

        if (
            feature.id === featureId ||
            (idProperty && feature.properties[idProperty] === featureId)
        ) {
            rankOfFeature = rank;
        }
    });
    return {
        rankedCollection: {
            type: 'FeatureCollection',
            features: sortedFeatures,
        },
        rankOfFeature,
    };
};
