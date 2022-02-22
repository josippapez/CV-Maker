export interface ProfessionalExperience {
    company: string;
    location: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
}
export interface GeneralInfo {
    firstName: string;
    lastName: string;
    aboutMe: string;
    position: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    zip: string;
    country: string;
    website: string;
    LinkedIn: string;
    GitHub: string;
    Facebook: string;
    Instagram: string;
    Twitter: string;
}
export interface Certificate {
    name: string;
    date: string;
    institution: string;
    description: string;
}
export interface Education {
    school: string;
    location: string;
    degree: string;
    fieldOfStudy: string;
    startDate: string;
    endDate: string;
    description: string;
}
export declare enum LanguageProficiencyLevel {
    BEGINNER = "Beginner",
    CONVERSATIONAL = "Conversational",
    FLUENT = "Fluent",
    NATIVE = "Native"
}
export interface LanguageSkill {
    name: string;
    proficiency: LanguageProficiencyLevel;
}
declare const PDFView: () => JSX.Element;
export default PDFView;
