import { getDataForUser } from '@/store/actions/syncActions';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  Operations,
  PDFData,
  cacheAllData,
  cacheCertificates,
  cacheEducation,
  cacheGeneralInfo,
  cacheLanguages,
  cacheProfessionalExperience,
  cacheProjects,
  cacheSkills,
  pdfDataSelector,
  setLoaded,
} from '@/store/reducers/pdfData';
import { TemplateName, setTemplate } from '@/store/reducers/template';
import {
  Certificate,
  Education,
  GeneralInfo,
  LanguageSkill,
  ProfessionalExperience,
  Project,
  Skill,
} from '@modules/PDFView/models';
import { useDebouncedFunction } from '@modules/Shared/Hooks/useDebouncedFunction';
import { useCallback, useMemo } from 'react';

export const usePDFData = () => {
  const dispatch = useAppDispatch();
  const {
    certificates,
    education,
    generalInfo,
    languages,
    professionalExperience,
    skills,
    loaded,
    projects,
  } = useAppSelector(pdfDataSelector);
  const template = useAppSelector(state => state.template);

  const setDataLoaded = useCallback(
    (loaded: boolean) => dispatch(setLoaded(loaded)),
    [dispatch]
  );
  const setGeneralInfo = useDebouncedFunction((value: Partial<GeneralInfo>) =>
    dispatch(cacheGeneralInfo(value))
  );
  const setProfessionalExperience = useDebouncedFunction(
    (
      operation: Operations,
      professionalExperience?: Partial<ProfessionalExperience>,
      index?: number
    ) =>
      dispatch(
        cacheProfessionalExperience({
          operation,
          experience: professionalExperience,
          index,
        })
      )
  );
  const setCertificates = useDebouncedFunction(
    (
      operation: Operations,
      certificate?: Partial<Certificate>,
      index?: number
    ) =>
      dispatch(
        cacheCertificates({
          operation,
          certificate,
          index,
        })
      )
  );
  const setEducation = useDebouncedFunction(
    (operation: Operations, education?: Partial<Education>, index?: number) =>
      dispatch(
        cacheEducation({
          operation,
          education,
          index,
        })
      )
  );
  const setLanguages = useDebouncedFunction(
    (
      operation: Operations,
      language?: Partial<LanguageSkill>,
      index?: number
    ) =>
      dispatch(
        cacheLanguages({
          operation,
          language,
          index,
        })
      )
  );
  const setSkills = useDebouncedFunction(
    (operation: Operations, skill?: Partial<Skill>, index?: number) =>
      dispatch(
        cacheSkills({
          operation,
          skill,
          index,
        })
      ),
    0
  );
  const setProjects = useDebouncedFunction(
    (operation: Operations, project?: Partial<Project>, index?: number) =>
      dispatch(
        cacheProjects({
          operation,
          project,
          index,
        })
      )
  );
  const setAllData = useDebouncedFunction((data: PDFData) =>
    dispatch(cacheAllData(data))
  );
  const setActiveTemplate = useDebouncedFunction((template: TemplateName) =>
    dispatch(setTemplate(template))
  );
  const getUserData = useCallback(() => {
    dispatch(
      getDataForUser({
        preventVersionHistory: Boolean(
          localStorage.getItem('preventVersionHistory')
        ),
      })
    );
  }, []);

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
      projects,
    };
  }, [
    certificates,
    education,
    generalInfo,
    languages,
    professionalExperience,
    skills,
    projects,
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
    setProjects,
    setAllData,
    setActiveTemplate,
    getUserData,
  };
};
