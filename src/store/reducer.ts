import {configureStore} from '@reduxjs/toolkit';

import {uiReducer} from './ui';
import {tasksReducer} from './task';

const store = configureStore({
  reducer: {
    ui: uiReducer,
    task: tasksReducer,
  },
});

export default store;
