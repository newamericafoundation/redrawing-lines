import { FeatureCollection, Geometry } from 'geojson';
import BarChart from 'src/components/Charts/BarChart';
import useAppStore, { SchoolDistrictFeature } from 'src/lib/appState';
import { SchoolDistrictProperties, SchoolDistrVariable } from 'src/types';
import { aggregateByProperties } from 'src/utils/aggregateByProperty';
import { getFriendlyName } from 'src/utils/friendlyNames';
import { toWholeNumber } from 'src/utils/wholeNumber';

type Props = {
    primary: SchoolDistrictFeature;
    primaryFeatureCollection: FeatureCollection<
        Geometry,
        SchoolDistrictProperties
    >;
    comparison: SchoolDistrictFeature;
};

const getDemographicData = (feature: SchoolDistrictFeature) => {
    const population =
        feature.feature.properties[SchoolDistrVariable.Population];
    return [
        SchoolDistrVariable.White,
        SchoolDistrVariable.Native,
        SchoolDistrVariable.Latino,
        SchoolDistrVariable.Black,
        SchoolDistrVariable.Asian,
    ].map((key) =>
        toWholeNumber(Number(feature.feature.properties[key]) / population)
    );
};

export const SchoolDistrictBarChart: React.FC<Props> = ({
    primary,
    primaryFeatureCollection,
    comparison,
}) => {
    const model = useAppStore((state) => state.model);

    const stateAggregates = aggregateByProperties(primaryFeatureCollection, [
        SchoolDistrVariable.Asian,
        SchoolDistrVariable.Black,
        SchoolDistrVariable.Latino,
        SchoolDistrVariable.Native,
        SchoolDistrVariable.White,
        SchoolDistrVariable.Population,
    ]);

    const statePopulation =
        stateAggregates[SchoolDistrVariable.Population] ?? 0;
    const stateData = [
        SchoolDistrVariable.White,
        SchoolDistrVariable.Native,
        SchoolDistrVariable.Latino,
        SchoolDistrVariable.Black,
        SchoolDistrVariable.Asian,
    ].map((key) =>
        toWholeNumber((stateAggregates[key] ?? 0) / statePopulation)
    );

    return (
        <BarChart
            series={[
                { name: 'Status Quo', data: getDemographicData(primary) },
                { name: 'State', data: stateData },
                {
                    name: getFriendlyName(model),
                    data: getDemographicData(comparison),
                },
            ]}
            properties={[
                SchoolDistrVariable.White,
                SchoolDistrVariable.Native,
                SchoolDistrVariable.Latino,
                SchoolDistrVariable.Black,
                SchoolDistrVariable.Asian,
            ]}
            legend
        />
    );
};
