import store from '../store/reducer';

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
