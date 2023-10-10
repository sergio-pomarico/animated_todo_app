import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {SkImage} from '@shopify/react-native-skia';
import {ColorSchemeName} from 'react-native';

interface UIReducerProps {
  theme: ColorSchemeName;
  overlay: OverlayProps;
}

interface OverlayProps {
  image1: SkImage | null;
  image2: SkImage | null;
}

const initialState: UIReducerProps = {
  theme: 'light',
  overlay: {
    image1: null,
    image2: null,
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ColorSchemeName, string>) => {
      state.theme = action.payload;
    },
    setOverlay1: (state, action: PayloadAction<SkImage | null, string>) => {
      state.overlay!.image1 = action.payload;
    },
    setOverlay2: (state, action: PayloadAction<SkImage | null, string>) => {
      state.overlay!.image2 = action.payload;
    },
  },
});

export const Actions = uiSlice.actions;
export default uiSlice.reducer;
