import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { Select } from 'src/components/Select';
import useAppStore from 'src/lib/appState';
import { SchoolDistrVariable, StateLevelVariable } from 'src/types';
import { useSchoolDistrictData } from 'src/hooks/useSchoolDistrictData';
import { createCleanLabelFunction } from 'src/utils/cleanLabels';

export const SchoolDistrictSelect: React.FC = () => {
    const [options, setOptions] = useState<
        Array<{
            value: string | number;
            label: string;
        }>
    >([]);

    const state = useAppStore((state) => state.state);
    const schoolDistrict = useAppStore((state) => state.schoolDistrict);
    const setSchoolDistrict = useAppStore((state) => state.setSchoolDistrict);

    const { featureCollection, goToSchoolDistrict, findSchoolDistrict } =
        useSchoolDistrictData('primary');

    const cleanLabel = useMemo(
        () =>
            createCleanLabelFunction(
                state?.feature?.properties[StateLevelVariable.StateAcronym] ??
                    ''
            ),
        [state]
    );

    useEffect(() => {
        if (featureCollection.features.length > 0) {
            const options = featureCollection.features
                .map((feature) => {
                    const value = Number(feature[SchoolDistrVariable.ID]);
                    const label = cleanLabel(
                        feature.properties[SchoolDistrVariable.Name] ??
                            feature.properties[SchoolDistrVariable.GeoID]
                    );

                    return {
                        value,
                        label,
                    };
                })
                .sort((a, b) => a.label.localeCompare(b.label));
            setOptions(options);
        } else {
            setOptions([]);
        }
    }, [featureCollection]);

    const handleSchoolDistrictChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const id = Number(e.target.value);

        if (!schoolDistrict || id !== schoolDistrict.feature.id) {
            const schoolDistrict = findSchoolDistrict(id);
            if (schoolDistrict) {
                setSchoolDistrict({
                    which: 'primary',
                    level: 'school-district',
                    feature: schoolDistrict,
                });
                goToSchoolDistrict(id);
            }
        }
    };

    const schoolDistrictId =
        schoolDistrict?.feature?.id ?? schoolDistrict?.feature?.properties?.id;

    return (
        <Select
            id="school-district-select"
            label="School District"
            placeholder="Select a School District"
            value={schoolDistrictId ?? ''}
            options={options}
            onChange={handleSchoolDistrictChange}
            disabled={options.length === 0}
        />
    );
};
