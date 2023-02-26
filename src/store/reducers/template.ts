import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist/es/constants';

export enum TemplateName {
  CVTemplate1 = 'CVTemplate1',
  CVTemplate2 = 'CVTemplate2',
  CVTemplate3 = 'Premium 1',
  CVTemplate4 = 'Premium 2',
}

export interface Template {
  templateName: TemplateName;
}

const initialState: Template = {
  templateName: TemplateName.CVTemplate1,
};

export const template = createSlice({
  name: 'template',
  initialState,
  extraReducers: builder => {
    builder.addCase(PURGE, () => initialState);
  },
  reducers: {
    setTemplate: (state, action: PayloadAction<TemplateName>) => {
      state.templateName = action.payload;
    },
  },
});

export const { setTemplate } = template.actions;

export default template.reducer;
