import { DocumentPDFData } from '@/store/actions/syncActions';
import { TemplateName } from '@/store/reducers/template';
import {
  Certificate,
  Education,
  GeneralInfo,
  LanguageSkill,
  ProfessionalExperience,
  Project,
  Skill,
} from '@modules/PDFView/models';
import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist/es/constants';

export enum Operations {
  SET,
  ADD,
  UPDATE,
  REMOVE,
}

interface ArrayUpdatePayload<T> {
  operation: Operations;
  item?: T | T[];
  index?: number;
}

const isArray = <T>(item?: T | T[]): item is T[] => Array.isArray(item);

function updateArray<T>(array: T[], payload: ArrayUpdatePayload<T>) {
  const { operation, item, index } = payload;

  const itemIsArray = isArray<T>(item);

  switch (operation) {
    case Operations.SET:
      if (itemIsArray) array = [...item];
      break;
    case Operations.ADD:
      if (item && !itemIsArray) array.push(item);
      break;
    case Operations.UPDATE:
      if (index !== undefined && item && !itemIsArray) {
        array[index] = {
          ...array[index],
          ...item,
        };
      }
      break;
    case Operations.REMOVE:
      if (index !== undefined) {
        array.splice(index, 1);
      }
      break;
    default:
      break;
  }
}

export interface PDFData {
  generalInfo: GeneralInfo;
  professionalExperience: ProfessionalExperience[];
  certificates: Certificate[];
  education: Education[];
  languages: LanguageSkill[];
  skills: Skill[];
  projects: Project[];
  loaded: boolean;
}

export interface PDFDataWithTemplate extends PDFData {
  template: TemplateName;
  timestamp: number;
  modified: boolean;
}

const initialState: PDFDataWithTemplate = {
  generalInfo: {
    profilePicture: '',
    firstName: '',
    lastName: '',
    dob: '',
    aboutMe: '',
    position: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    country: '',
    website: '',
    LinkedIn: '',
    GitHub: '',
    Facebook: '',
    Twitter: '',
  },
  professionalExperience: [],
  certificates: [],
  education: [],
  languages: [],
  skills: [],
  projects: [],
  timestamp: 0,
  template: TemplateName.CVTemplate1,
  loaded: false,
  modified: false,
};

export const pdfPreviewData = createSlice({
  name: 'pdfPreviewData',
  initialState,
  extraReducers: builder => {
    builder.addCase(PURGE, () => initialState);
  },
  reducers: {
    setModified: (state, action: PayloadAction<boolean>) => {
      state.modified = action.payload;
    },
    setLoaded: (state, action: PayloadAction<boolean>) => {
      state.loaded = action.payload;
    },
    cacheAllPreviewData: (
      state,
      action: PayloadAction<DocumentPDFData | undefined | null>
    ) => {
      if (!action.payload) {
        return;
      }
      state.timestamp = Date.now();
      state.generalInfo = action.payload.generalInfo;
      state.professionalExperience = action.payload.professionalExperience;
      state.certificates = action.payload.certificates;
      state.education = action.payload.education;
      state.languages = action.payload.languages;
      state.skills = action.payload.skills;
      state.projects = action.payload.projects;
      state.template = action.payload.template.templateName;
      state.modified = true;
    },
  },
});

export const { cacheAllPreviewData, setLoaded, setModified } =
  pdfPreviewData.actions;

export const pdfPreviewDataSelector = createSelector(
  (state: { pdfPreviewData: PDFDataWithTemplate }) => state.pdfPreviewData,
  pdfPreviewData => pdfPreviewData
);

export default pdfPreviewData.reducer;
