import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'src/fonts.css';
import 'src/index.css';
import App from 'src/App.tsx';
import { MapProvider } from 'src/contexts/MapContexts.tsx';
import { COMPARISON_MAP_ID } from 'src/features/Map/Comparison/config.ts';
import { PRIMARY_MAP_ID } from 'src/features/Map/Primary/config.ts';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <MapProvider mapIds={[PRIMARY_MAP_ID, COMPARISON_MAP_ID]}>
            <App />
        </MapProvider>
    </StrictMode>
);
