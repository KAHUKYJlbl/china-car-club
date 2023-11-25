import { store } from './ui/store';

export { NameSpace } from './lib/name-space';
export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
