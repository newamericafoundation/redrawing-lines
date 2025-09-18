import { create } from 'zustand';
import { SessionState } from 'src/lib/session/types';
import { createLoadingSlice } from './slices/loading';

const useSessionStore = create<SessionState>((set, get, _store) => ({
    ...createLoadingSlice(set, get, _store),
}));

export default useSessionStore;
