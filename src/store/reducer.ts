import {configureStore} from '@reduxjs/toolkit';

import {uiReducer} from './ui';

const store = configureStore({
  reducer: {
    ui: uiReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
