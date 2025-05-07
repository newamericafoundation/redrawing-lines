import { useEffect, useRef } from 'react';
import { useMap } from 'src/contexts/MapContexts';
import { PRIMARY_MAP_ID } from 'src/features/Map/Primary/config';
import styles from 'src/features/Controls/Controls.module.css';

export const Geocoder: React.FC = () => {
    const ref = useRef<HTMLDivElement>(null);

    const { map, geocoder } = useMap(PRIMARY_MAP_ID);

    useEffect(() => {
        if (!map || !geocoder || !ref.current) {
            return;
        }

        ref.current.innerHTML = '';
        ref.current.appendChild(geocoder.onAdd(map));

        return () => {
            if (ref.current) {
                ref.current = null;
            }
        };
    }, [map, geocoder]);

    return <div ref={ref} className={styles.geocoderWrapper} />;
};
