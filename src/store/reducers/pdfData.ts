import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  Certificate,
  Education,
  GeneralInfo,
  LanguageSkill,
  ProfessionalExperience,
} from '../../Components/PDFView/models';

export interface PDFData {
  generalInfo: GeneralInfo;
  professionalExperience: ProfessionalExperience[];
  certificates: Certificate[];
  education: Education[];
  languages: LanguageSkill[];
}

const initialState: Partial<PDFData> = {
  generalInfo: {
    profilePicture: null,
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
    Instagram: '',
    Twitter: '',
  },
  professionalExperience: [],
  certificates: [],
  education: [],
  languages: [],
};

export const pdfData = createSlice({
  name: 'pdfData',
  initialState,
  reducers: {
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
  },
});

export const {
  cacheGeneralInfo,
  cacheProfessionalExperience,
  cacheEducation,
  cacheCertificates,
  cacheLanguages,
} = pdfData.actions;

export default pdfData.reducer;
