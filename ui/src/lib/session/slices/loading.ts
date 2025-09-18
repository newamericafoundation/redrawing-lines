import { StateCreator } from 'zustand';
import { Loading, SessionState } from 'src/lib/session/types';

interface LoadingSlice {
    loadingInstances: Loading[];
    addLoadingInstance: (loadingInstance: Loading) => void;
    removeLoadingInstance: (id: string) => void;
    hasLoadingInstance: (text: string) => boolean;
}

export const createLoadingSlice: StateCreator<
    SessionState,
    [],
    [],
    LoadingSlice
> = (set, get) => ({
    loadingInstances: [],
    addLoadingInstance: (loadingInstance) =>
        set((state) => ({
            ...state,
            loadingInstances: [...state.loadingInstances, loadingInstance],
        })),
    removeLoadingInstance: (id) =>
        set((state) => ({
            ...state,
            loadingInstances: state.loadingInstances.filter(
                (loadingInstance) => loadingInstance.id !== id
            ),
        })),
    hasLoadingInstance: (text) =>
        get().loadingInstances.some((instance) =>
            instance.message.includes(text)
        ),
});
