import RestartIcon from 'src/assets/Restart';
import useAppStore from 'src/lib/appState';
import { Model, StateLevelVariable } from 'src/types';

/**
 *
 * @component
 */
export const RestartButton: React.FC = () => {
    const setModel = useAppStore((state) => state.setModel);
    const setVariable = useAppStore((state) => state.setVariable);
    const setSchoolDistrict = useAppStore((state) => state.setSchoolDistrict);
    const setOtherSchoolDistrict = useAppStore(
        (state) => state.setOtherSchoolDistrict
    );
    const setState = useAppStore((state) => state.setState);
    const setOtherState = useAppStore((state) => state.setOtherState);
    const setSliderPosition = useAppStore((state) => state.setSliderPosition);

    const handleClick = () => {
        setModel(Model.Optimized);
        setVariable(StateLevelVariable.ThielRacial);
        setSchoolDistrict(null);
        setOtherSchoolDistrict(null);
        setState(null);
        setOtherState(null);
        setSliderPosition(50);
    };

    return (
        <button
            type="button"
            title="Reset"
            aria-label="Reset Application to initial view"
            aria-disabled="false"
            onClick={handleClick}
            style={{ padding: '5px' }} // Styling must be inline
        >
            <RestartIcon />
        </button>
    );
};
