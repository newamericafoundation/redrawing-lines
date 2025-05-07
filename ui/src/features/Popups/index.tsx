import { Feature, GeoJsonProperties, Polygon } from 'geojson';
import { SchoolDistrVariable, StateLevelVariable } from 'src/types';
import { getFriendlyName } from 'src/utils/friendlyNames';

type Props<T extends GeoJsonProperties> = {
    feature: Feature<Polygon, T>;
    labelProperty: keyof T;
    popupProperties: Array<keyof T>;
};

const HoverPopup = <T extends GeoJsonProperties>(props: Props<T>) => {
    const { feature, labelProperty, popupProperties } = props;

    if (!feature.properties) {
        return null;
    }

    return (
        <>
            <h3>{feature.properties![labelProperty]}</h3>
            <ul>
                {popupProperties.map((field) => (
                    <li key={String(field)}>
                        <strong>
                            {getFriendlyName(
                                field as
                                    | SchoolDistrVariable
                                    | StateLevelVariable
                            )}
                            :
                        </strong>
                        &nbsp;
                        {feature.properties![field]}
                    </li>
                ))}
            </ul>
        </>
    );
};

export default HoverPopup as <T extends GeoJsonProperties>(
    props: Props<T>
) => ReturnType<React.FC>;
