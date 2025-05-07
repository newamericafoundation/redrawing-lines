import { useState } from 'react';
import Fullscreen from 'src/assets/Fullscreen';
import FullscreenExit from 'src/assets/FullscreenExit';

/**
 *
 * @component
 */
export const FullscreenButton: React.FC = () => {
    const [open, setOpen] = useState(false);

    const onClick = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setOpen(true);
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
            setOpen(false);
        }
    };

    return (
        <button
            type="button"
            title={!open ? 'Open Fullscreen' : 'Exit Fullscreen'}
            aria-label="Control Fullscreen"
            aria-disabled="false"
            onClick={onClick}
            style={{ padding: '5px' }} // Styling must be inline
        >
            {!open ? <Fullscreen /> : <FullscreenExit />}
        </button>
    );
};
