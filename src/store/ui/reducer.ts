import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ColorSchemeName} from 'react-native';

const initialState: {theme: ColorSchemeName} = {
  theme: 'light',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ColorSchemeName, string>) => {
      state.theme = action.payload;
    },
  },
});

export const Actions = uiSlice.actions;
export default uiSlice.reducer;
