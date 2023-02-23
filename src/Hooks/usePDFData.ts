import { useCallback, useMemo } from 'react';
import {
  Certificate,
  Education,
  GeneralInfo,
  LanguageSkill,
  ProfessionalExperience,
  Skill,
} from '../Components/PDFView/models';
import {
  cacheAllData,
  cacheCertificates,
  cacheEducation,
  cacheGeneralInfo,
  cacheLanguages,
  cacheProfessionalExperience,
  cacheSkills,
  PDFData,
  pdfDataSelector,
  setLoaded,
} from '../store/reducers/pdfData';
import { setTemplate, TemplateName } from '../store/reducers/template';
import { useAppDispatch, useAppSelector } from './../store/hooks';

const usePDFData = () => {
  const dispatch = useAppDispatch();
  const {
    certificates,
    education,
    generalInfo,
    languages,
    professionalExperience,
    skills,
    loaded,
  } = useAppSelector(pdfDataSelector);
  const template = useAppSelector(state => state.template);

  const setDataLoaded = useCallback(
    (loaded: boolean) => dispatch(setLoaded(loaded)),
    [dispatch]
  );
  const setGeneralInfo = useCallback(
    (generalInfo: GeneralInfo) => dispatch(cacheGeneralInfo(generalInfo)),
    [dispatch]
  );
  const setProfessionalExperience = useCallback(
    (professionalExperience: ProfessionalExperience[]) =>
      dispatch(cacheProfessionalExperience(professionalExperience)),
    [dispatch]
  );
  const setCertificates = useCallback(
    (certificates: Certificate[]) => dispatch(cacheCertificates(certificates)),
    [dispatch]
  );
  const setEducation = useCallback(
    (education: Education[]) => dispatch(cacheEducation(education)),
    [dispatch]
  );
  const setLanguages = useCallback(
    (languages: LanguageSkill[]) => dispatch(cacheLanguages(languages)),
    [dispatch]
  );
  const setSkills = useCallback(
    (skills: Skill[]) => dispatch(cacheSkills(skills)),
    [dispatch]
  );
  const setAllData = useCallback(
    (data: PDFData) => dispatch(cacheAllData(data)),
    [dispatch]
  );
  const setActiveTemplate = useCallback(
    (template: TemplateName) => dispatch(setTemplate(template)),
    [dispatch]
  );

  const state = useMemo(() => {
    return {
      certificates,
      education,
      generalInfo,
      languages,
      professionalExperience,
      skills,
      loaded,
      template,
    };
  }, [
    certificates,
    education,
    generalInfo,
    languages,
    professionalExperience,
    skills,
    loaded,
    template,
  ]);

  return {
    ...state,
    setDataLoaded,
    setGeneralInfo,
    setProfessionalExperience,
    setCertificates,
    setEducation,
    setLanguages,
    setSkills,
    setAllData,
    setActiveTemplate,
  };
};

export default usePDFData;
