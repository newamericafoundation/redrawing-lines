import { Model } from 'src/types';
import { getStateName } from 'src/utils/states';

const GeoIdReplacements = [
    {
        geoId: '0699001',
        name: 'Gridley Unified',
        state: 'CA',
    },
    {
        geoId: '0699014',
        name: 'Nevada Joint Union High',
        state: 'CA',
    },
    {
        geoId: '2206840',
        name: 'Central Community',
        state: 'LA',
    },
    {
        geoId: '2600009',
        name: 'Bloomfield Township 7F',
        state: 'MI',
    },
    {
        geoId: '3009560',
        name: 'East Helena K-12',
        state: 'MT',
    },
    {
        geoId: '3016950',
        name: 'Lockwood K-12',
        state: 'MT',
    },
    {
        geoId: '3600971',
        name: 'North Colonie Central',
        state: 'NY',
    },
    {
        geoId: '3604800',
        name: 'Binghamton Common',
        state: 'NY',
    },
    {
        geoId: '3606750',
        name: 'Cattaraugus-Little Valley Central',
        state: 'NY',
    },
    {
        geoId: '3737099',
        name: 'Eastern Cherokee Reservation',
        state: 'NC',
    },
    {
        geoId: '3700013',
        name: 'Camp Lejeune Schools',
        state: 'NC',
    },
    {
        geoId: '3814880',
        name: 'Park River Area Public 8',
        state: 'ND',
    },
    {
        geoId: '3803790',
        name: 'Carrington Public 10',
        state: 'ND',
    },
    {
        geoId: '3830049',
        name: 'New Salem-Almont',
        state: 'ND',
    },
    {
        geoId: '4016440',
        name: 'Keys Public Schools',
        state: 'OK',
    },
    {
        geoId: '4021840',
        name: 'North Rock Creek Public School',
        state: 'OK',
    },
    {
        geoId: '4818660',
        name: 'Etoile Independent',
        state: 'TX',
    },
    {
        geoId: '5000004',
        name: 'Battenkill Valley Supervisory Union',
        state: 'VT',
    },
    {
        geoId: '5099908',
        name: 'Kingdom East Supervisory District',
        state: 'VT',
    },
    {
        geoId: '5007650',
        name: 'St. Johnsbury',
        state: 'VT',
    },
    {
        geoId: '5005610',
        name: 'Milton',
        state: 'VT',
    },
    {
        geoId: '5003240',
        name: 'Colchester',
        state: 'VT',
    },
    {
        geoId: '5000395',
        name: 'Essex-Westford Educational Community Unified',
        state: 'VT',
    },
    {
        geoId: '5007470',
        name: 'South Burlington',
        state: 'VT',
    },
    {
        geoId: '5000024',
        name: 'Rivendell Interstate',
        state: 'VT',
    },
    {
        geoId: '5007050',
        name: 'Rutland City',
        state: 'VT',
    },
    {
        geoId: '5006180',
        name: 'Norwich',
        state: 'VT',
    },
    {
        geoId: '5004590',
        name: 'Hartford',
        state: 'VT',
    },
    {
        geoId: '5007530',
        name: 'Springfield',
        state: 'VT',
    },
    {
        geoId: '5100990',
        name: 'Covington City Public Schools',
        state: 'VA',
    },
];

const getNameReplacement = (geoId: string, stateAcronym: string) => {
    return GeoIdReplacements.find(
        (replacement) =>
            replacement.geoId === geoId &&
            replacement.state === stateAcronym.toUpperCase()
    );
};

export const createCleanLabelFunction = (state: string, model?: Model) => {
    const stateName = getStateName(state);

    const replaceStrings = [
        `School Districts`,
        `School District`,
        `Schools`,
        `School`,
        stateName,
        /School District\s*\d+/i,
        /,\s*${stateName}/i,
        ',',
    ];

    if (model && model === Model.CountyConsolidated) {
        replaceStrings.push('County');
    }

    return (label: string, geoId: string) => {
        const replacement = getNameReplacement(geoId, state);

        if (replacement) {
            return replacement.name;
        }
        let _label = label;
        replaceStrings.forEach((replaceString) => {
            _label = _label.replace(replaceString, '');
        });

        return _label;
    };
};
