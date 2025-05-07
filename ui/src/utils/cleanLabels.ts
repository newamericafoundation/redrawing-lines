import { getStateName } from 'src/utils/states';

export const createCleanLabelFunction = (state: string) => {
    const stateName = getStateName(state);

    const replaceStrings = [
        `School District`,
        `Schools`,
        `School`,
        stateName,
        /School District\s*\d+/i,
        /,\s*${stateName}/i,
        ',',
    ];

    return (label: string) => {
        let _label = label;
        replaceStrings.forEach((replaceString) => {
            _label = _label.replace(replaceString, '');
        });

        return _label;
    };
};
