import { combineReducers } from '@reduxjs/toolkit';
import pdfData from './pdfData';
import template from './template';
import user from './user';

export const reducers = combineReducers({ pdfData, template, user });
