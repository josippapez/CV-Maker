import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  Certificate,
  Education,
  GeneralInfo,
  LanguageSkill,
  ProfessionalExperience,
  Skill,
} from '../../Components/PDFView/models';

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
    profilePicture: undefined,
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
      state.loaded = true;
    },
    cacheGeneralInfo: (state, action: PayloadAction<GeneralInfo>) => {
      state.generalInfo = action.payload;
    },
    cacheProfessionalExperience: (
      state,
      action: PayloadAction<ProfessionalExperience[]>
    ) => {
      state.professionalExperience = action.payload;
    },
    cacheCertificates: (state, action: PayloadAction<Certificate[]>) => {
      state.certificates = action.payload;
    },
    cacheEducation: (state, action: PayloadAction<Education[]>) => {
      state.education = action.payload;
    },
    cacheLanguages: (state, action: PayloadAction<LanguageSkill[]>) => {
      state.languages = action.payload;
    },
    cacheSkills: (state, action: PayloadAction<Skill[]>) => {
      state.skills = action.payload;
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

export default pdfData.reducer;
