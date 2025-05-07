import Fullscreen from 'src/assets/Fullscreen';
import PanelClose from 'src/assets/PanelClose';
import PanelOpen from 'src/assets/PanelOpen';
import useAppStore from 'src/lib/appState';

/**
 *
 * @component
 */
export const ControlsButton: React.FC = () => {
    const infoPanelOpen = useAppStore((state) => state.infoPanelOpen);
    const setInfoPanelOpen = useAppStore((state) => state.setInfoPanelOpen);

    return (
        <button
            type="button"
            aria-label="Open Fullscreen"
            aria-disabled="false"
            onClick={() => setInfoPanelOpen(!infoPanelOpen)}
            style={{ padding: '5px' }} // Styling must be inline
        >
            {infoPanelOpen ? <PanelClose /> : <PanelOpen />}
            <Fullscreen />
        </button>
    );
};
