import storage from '@/storage';
import { combineReducers } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';
import pdfData from './pdfData';
import template from './template';
import versionHistory from './versionHistory';

const pdfReducerPersistConfig = {
  key: 'pdf-loaded-data',
  storage: storage,
  blacklist: ['loaded'],
};

export const reducers = combineReducers({
  pdfData: persistReducer(pdfReducerPersistConfig, pdfData),
  template,
  versionHistory,
});
