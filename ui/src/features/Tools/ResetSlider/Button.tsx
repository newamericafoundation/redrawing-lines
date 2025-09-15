import Center from 'src/assets/Center';
import useAppStore from 'src/lib/appState';

/**
 *
 * @component
 */
export const ResetSliderButton: React.FC = () => {
    const setSliderPosition = useAppStore((state) => state.setSliderPosition);

    return (
        <button
            type="button"
            title="Reset Slider Position"
            aria-label="Reset Slider Position"
            aria-disabled="false"
            onClick={() => setSliderPosition(50)}
            style={{ padding: '5px' }} // Styling must be inline
        >
            <Center />
        </button>
    );
};
