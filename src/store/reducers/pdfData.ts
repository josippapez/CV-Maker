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
  loading: boolean;
  initialLoad: boolean;
  timestamp: number;
  skills: Skill[];
}

const initialState: PDFData = {
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
  loading: false,
  initialLoad: true,
  timestamp: 0,
};

export const pdfData = createSlice({
  name: 'pdfData',
  initialState,
  reducers: {
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
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setInitialLoad: (state, action: PayloadAction<boolean>) => {
      state.initialLoad = action.payload;
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
  setLoading,
  setInitialLoad,
} = pdfData.actions;

export default pdfData.reducer;
