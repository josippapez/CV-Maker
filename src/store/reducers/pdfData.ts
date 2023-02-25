import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  Certificate,
  Education,
  GeneralInfo,
  LanguageSkill,
  Skill,
} from '../../Components/PDFView/models';
import { ProfessionalExperience } from './../../Components/PDFView/models/ProfessionalExperience';

export enum Operations {
  ADD,
  UPDATE,
  REMOVE,
}

interface ArrayUpdatePayload<T> {
  operation: Operations;
  item?: T;
  index?: number;
}

function updateArray<T>(array: T[], payload: ArrayUpdatePayload<T>) {
  const { operation, item, index } = payload;
  switch (operation) {
    case Operations.ADD:
      if (item) {
        array.push(item);
      }
      break;
    case Operations.UPDATE:
      if (index !== undefined && item) {
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
  loaded: boolean;
}

export interface PDFDataWithTimestamp extends PDFData {
  timestamp: number;
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
  timestamp: 0,
  loaded: false,
};

export const pdfData = createSlice({
  name: 'pdfData',
  initialState,
  reducers: {
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
      state.professionalExperience = action.payload.professionalExperience;
      state.certificates = action.payload.certificates;
      state.education = action.payload.education;
      state.languages = action.payload.languages;
      state.skills = action.payload.skills;
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
        experience?: Partial<ProfessionalExperience>;
        index?: number;
      }>
    ) => {
      const { operation, experience, index } = action.payload;
      updateArray(state.professionalExperience, {
        operation,
        item: experience,
        index,
      });
    },
    cacheCertificates: (
      state,
      action: PayloadAction<{
        operation: Operations;
        certificate?: Partial<Certificate>;
        index?: number;
      }>
    ) => {
      const { operation, certificate, index } = action.payload;
      updateArray(state.certificates, {
        operation,
        item: certificate,
        index,
      });
    },
    cacheEducation: (
      state,
      action: PayloadAction<{
        operation: Operations;
        education?: Partial<Education>;
        index?: number;
      }>
    ) => {
      const { operation, education, index } = action.payload;
      updateArray(state.education, {
        operation,
        item: education,
        index,
      });
    },
    cacheLanguages: (
      state,
      action: PayloadAction<{
        operation: Operations;
        language?: Partial<LanguageSkill>;
        index?: number;
      }>
    ) => {
      const { operation, language, index } = action.payload;
      updateArray(state.languages, {
        operation,
        item: language,
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
  setLoaded,
} = pdfData.actions;

export const pdfDataSelector = createSelector(
  (state: { pdfData: PDFDataWithTimestamp }) => state.pdfData,
  pdfData => pdfData
);

export default pdfData.reducer;
