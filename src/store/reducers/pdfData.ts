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

export interface PDFDataWithTimestamp extends PDFData {
  timestamp: number;
  modified: boolean;
}

const initialState: PDFDataWithTimestamp = {
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
  loaded: false,
  modified: false,
};

export const pdfData = createSlice({
  name: 'pdfData',
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
    cacheAllData: (
      state,
      action: PayloadAction<PDFData | undefined | null>
    ) => {
      if (!action.payload) {
        return;
      }
      state.timestamp = Date.now();
      state.generalInfo = action.payload.generalInfo;
      state.professionalExperience =
        action.payload.professionalExperience || [];
      state.certificates = action.payload.certificates || [];
      state.education = action.payload.education || [];
      state.languages = action.payload.languages || [];
      state.skills = action.payload.skills || [];
      state.projects = action.payload.projects || [];
    },
    cacheGeneralInfo: (state, action: PayloadAction<Partial<GeneralInfo>>) => {
      state.generalInfo = {
        ...state.generalInfo,
        ...action.payload,
      };
    },
    cacheProfessionalExperience: (
      state,
      action: PayloadAction<{
        operation: Operations;
        data?:
          | Partial<ProfessionalExperience>
          | Partial<ProfessionalExperience>[];
        index?: number;
      }>
    ) => {
      const { operation, data, index } = action.payload;
      if (!state.professionalExperience) state.professionalExperience = [];

      // const isDataArray = isArray(data);

      // if (isDataArray) {
      //   state.professionalExperience = [...(data as ProfessionalExperience[])];
      //   return;
      // }
      updateArray(state.professionalExperience, {
        operation,
        item: data,
        index,
      });
    },
    cacheCertificates: (
      state,
      action: PayloadAction<{
        operation: Operations;
        data?: Partial<Certificate> | Partial<Certificate>[];
        index?: number;
      }>
    ) => {
      const { operation, data, index } = action.payload;
      if (!state.certificates) state.certificates = [];

      const isDataArray = isArray(data);

      if (isDataArray) {
        state.certificates = [...(data as Certificate[])];
        return;
      }
      updateArray(state.certificates, {
        operation,
        item: data,
        index,
      });
    },
    cacheEducation: (
      state,
      action: PayloadAction<{
        operation: Operations;
        data?: Partial<Education> | Partial<Education>[];
        index?: number;
      }>
    ) => {
      const { operation, data, index } = action.payload;
      if (!state.education) state.education = [];

      const isDataArray = isArray(data);

      if (isDataArray) {
        state.education = [...(data as Education[])];
        return;
      }
      updateArray(state.education, {
        operation,
        item: data,
        index,
      });
    },
    cacheLanguages: (
      state,
      action: PayloadAction<{
        operation: Operations;
        data?: Partial<LanguageSkill> | Partial<LanguageSkill>[];
        index?: number;
      }>
    ) => {
      const { operation, data, index } = action.payload;
      if (!state.languages) state.languages = [];
      const isDataArray = isArray(data);

      if (isDataArray) {
        state.languages = [...(data as LanguageSkill[])];
        return;
      }
      updateArray(state.languages, {
        operation,
        item: data,
        index,
      });
    },
    cacheSkills: (
      state,
      action: PayloadAction<{
        operation: Operations;
        skill?: Partial<Skill>;
        index?: number;
      }>
    ) => {
      const { operation, skill, index } = action.payload;
      updateArray(state.skills, {
        operation,
        item: skill,
        index,
      });
    },
    cacheProjects: (
      state,
      action: PayloadAction<{
        operation: Operations;
        data?: Partial<Project> | Partial<Project>[];
        index?: number;
      }>
    ) => {
      const { operation, data, index } = action.payload;
      if (!state.projects) state.projects = [];
      const isDataArray = isArray(data);

      if (isDataArray) {
        state.projects = [...(data as Project[])];
        return;
      }
      updateArray(state.projects, {
        operation,
        item: data,
        index,
      });
    },
  },
});

export const {
  cacheAllData,
  cacheGeneralInfo,
  cacheProfessionalExperience,
  cacheEducation,
  cacheCertificates,
  cacheLanguages,
  cacheSkills,
  cacheProjects,
  setLoaded,
  setModified,
} = pdfData.actions;

export const pdfDataSelector = createSelector(
  (state: { pdfData: PDFDataWithTimestamp }) => state.pdfData,
  pdfData => pdfData
);

export default pdfData.reducer;
