import { PayloadAction } from '@reduxjs/toolkit';
import { Certificate, Education, GeneralInfo, LanguageSkill, ProfessionalExperience } from '../../Components/PDFView/PDFViewContainer';
export interface PDFData {
    generalInfo: GeneralInfo;
    professionalExperience: ProfessionalExperience[];
    certificates: Certificate[];
    education: Education[];
    languages: LanguageSkill[];
}
export declare const pdfData: import("@reduxjs/toolkit").Slice<Partial<PDFData>, {
    cacheGeneralInfo: (state: import("immer/dist/internal").WritableDraft<Partial<PDFData>>, action: PayloadAction<GeneralInfo>) => void;
    cacheProfessionalExperience: (state: import("immer/dist/internal").WritableDraft<Partial<PDFData>>, action: PayloadAction<ProfessionalExperience[]>) => void;
    cacheCertificates: (state: import("immer/dist/internal").WritableDraft<Partial<PDFData>>, action: PayloadAction<Certificate[]>) => void;
    cacheEducation: (state: import("immer/dist/internal").WritableDraft<Partial<PDFData>>, action: PayloadAction<Education[]>) => void;
    cacheLanguages: (state: import("immer/dist/internal").WritableDraft<Partial<PDFData>>, action: PayloadAction<LanguageSkill[]>) => void;
}, "pdfData">;
export declare const cacheGeneralInfo: import("@reduxjs/toolkit").ActionCreatorWithPayload<GeneralInfo, string>, cacheProfessionalExperience: import("@reduxjs/toolkit").ActionCreatorWithPayload<ProfessionalExperience[], string>, cacheEducation: import("@reduxjs/toolkit").ActionCreatorWithPayload<Education[], string>, cacheCertificates: import("@reduxjs/toolkit").ActionCreatorWithPayload<Certificate[], string>, cacheLanguages: import("@reduxjs/toolkit").ActionCreatorWithPayload<LanguageSkill[], string>;
declare const _default: import("redux").Reducer<Partial<PDFData>, import("redux").AnyAction>;
export default _default;
