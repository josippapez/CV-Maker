import { combineReducers } from '@reduxjs/toolkit';
import pdfData from './pdfData';

export const reducers = combineReducers({ pdfData });

export type RootState = ReturnType<typeof reducers>;
