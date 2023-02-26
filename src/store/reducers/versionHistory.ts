import { DocumentPDFData } from '@/store/actions/syncActions';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist/es/constants';

const initialState: {
  displayVersionHistory: boolean;
  tempPdfData?: DocumentPDFData;
} = {
  displayVersionHistory: false,
  tempPdfData: undefined,
};

export const versionHistory = createSlice({
  name: 'versionHistory',
  initialState,
  extraReducers: builder => {
    // add PURGE case
    builder.addCase(PURGE, () => initialState);
  },
  reducers: {
    setDisplayVersionHistory: (
      state,
      action: PayloadAction<{
        displayVersionHistory: boolean;
        pdfData?: DocumentPDFData;
      }>
    ) => {
      state.displayVersionHistory = action.payload.displayVersionHistory;
      state.tempPdfData = action.payload.pdfData;
    },
  },
});

export const { setDisplayVersionHistory } = versionHistory.actions;

export default versionHistory.reducer;
