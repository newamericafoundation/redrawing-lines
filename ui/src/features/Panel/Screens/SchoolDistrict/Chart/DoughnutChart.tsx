import { FeatureCollection, Geometry } from 'geojson';
import DoughnutChart from 'src/components/Charts/DoughnutChart';
import useAppStore, { SchoolDistrictFeature } from 'src/lib/appState';
import { SchoolDistrictProperties, SchoolDistrVariable } from 'src/types';
import { getFriendlyName } from 'src/utils/friendlyNames';

type Props = {
    primary: SchoolDistrictFeature;
    primaryFeatureCollection: FeatureCollection<
        Geometry,
        SchoolDistrictProperties
    >;
    comparison: SchoolDistrictFeature;
};

export const SchoolDistrictDoughnutChart: React.FC<Props> = (props) => {
    const { primary, primaryFeatureCollection, comparison } = props;

    const model = useAppStore((state) => state.model);

    return (
        <DoughnutChart
            series={[
                {
                    name: 'Status Quo',
                    data: {
                        type: 'FeatureCollection',
                        features: [primary.feature],
                    },
                },
                {
                    name: 'State',
                    data: primaryFeatureCollection,
                },
                {
                    name: getFriendlyName(model),
                    data: {
                        type: 'FeatureCollection',
                        features: [comparison.feature],
                    },
                },
            ]}
            properties={[
                SchoolDistrVariable.Asian,
                SchoolDistrVariable.Black,
                SchoolDistrVariable.Latino,
                SchoolDistrVariable.Native,
                SchoolDistrVariable.White,
            ]}
        />
    );
};
