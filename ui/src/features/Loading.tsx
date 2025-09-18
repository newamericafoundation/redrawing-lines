import { Linear } from 'src/components/Linear';
import useSessionStore from 'src/lib/session';

export const Loading: React.FC = () => {
    const loadingInstances = useSessionStore((state) => state.loadingInstances);

    const hasLoadingInstances = loadingInstances.length > 0;

    return hasLoadingInstances && <Linear />;
};
