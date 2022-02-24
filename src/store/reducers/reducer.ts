import { combineReducers } from '@reduxjs/toolkit';
import pdfData from './pdfData';
import template from './template';

export const reducers = combineReducers({ pdfData, template });

export type RootState = ReturnType<typeof reducers>;
