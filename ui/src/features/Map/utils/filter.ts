import { FilterSpecification } from 'mapbox-gl';
import { StateLevelVariable } from 'src/types';

export const filteredStates = [
    'PR',
    'AS',
    'VI',
    'GU',
    'MP',
    'KS',
    'KY',
    'NM',
    'AK',
    'MN',
    'SC',
    'ME',
];

export const getStateFilter = (): FilterSpecification => {
    return [
        '!',
        [
            'in',
            ['get', StateLevelVariable.StateAcronym],
            ['literal', filteredStates],
        ],
    ];
};
