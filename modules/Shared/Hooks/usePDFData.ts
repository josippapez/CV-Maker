import {
  DocumentPDFData,
  getDataForUser,
  saveDataForUser,
} from '@/store/actions/syncActions';
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
  setModified,
} from '@/store/reducers/pdfData';
import {
  cacheAllPreviewData,
  pdfPreviewDataSelector,
} from '@/store/reducers/pdfPreviewData';
import { TemplateName, setTemplate } from '@/store/reducers/template';
import { useChangeLanguage } from '@modules/Navbar/hooks';
import {
  Certificate,
  Education,
  GeneralInfo,
  LanguageSkill,
  ProfessionalExperience,
  Project,
  Skill,
} from '@modules/PDFView/models';
import { FirebaseService } from '@modules/Services';
import { useDebouncedFunction } from '@modules/Shared/Hooks/useDebouncedFunction';
import { useDebouncedValue } from '@modules/Shared/Hooks/useDebouncedValue';
import { useCallback, useMemo, useEffect } from 'react';

const firebaseAuth = FirebaseService.getInstance().getAuth();

let tempGeneralInfo: Partial<GeneralInfo> = {};
let tempProfessionalExperience:
  | Partial<ProfessionalExperience>
  | Partial<ProfessionalExperience>[]
  | undefined = undefined;
let tempCertificates:
  | Partial<Certificate>
  | Partial<Certificate>[]
  | undefined = undefined;
let tempEducation: Partial<Education> | Partial<Education>[] | undefined =
  undefined;
let tempLanguages:
  | Partial<LanguageSkill>
  | Partial<LanguageSkill>[]
  | undefined = undefined;
let tempProjects: Partial<Project> | Partial<Project>[] | undefined = undefined;

export const usePDFData = () => {
  const dispatch = useAppDispatch();
  const { changeLanguage } = useChangeLanguage();
  const {
    certificates,
    education,
    generalInfo,
    languages,
    professionalExperience,
    skills,
    loaded,
    projects,
    modified,
  } = useAppSelector(pdfDataSelector);
  const previewData = useAppSelector(pdfPreviewDataSelector);
  const template = useAppSelector(state => state.template);
  const currentUser = firebaseAuth.currentUser;

  const [initial, setInitial] = useDebouncedValue(true, 2000);

  console.log(
    certificates,
    education,
    generalInfo,
    languages,
    professionalExperience,
    skills,
    projects
  );

  const [saveData] = useDebouncedFunction(() => {
    if (initial) {
      setInitial(false);
      return;
    }
    dispatch(saveDataForUser());
  }, 600);

  useEffect(() => {
    if (!currentUser) return;
    saveData();
  }, [modified]);

  useEffect(() => {
    if (initial) {
      setInitial(false);
      return;
    }
    dispatch(saveDataForUser());
  }, [template]);

  const setDataLoaded = useCallback(
    (loaded: boolean) => dispatch(setLoaded(loaded)),
    [dispatch]
  );

  const [setDebouncedGeneralInfo] = useDebouncedFunction(() => {
    dispatch(
      cacheGeneralInfo({
        ...generalInfo,
        ...tempGeneralInfo,
      })
    );
    dispatch(setModified(true));
    tempGeneralInfo = {};
  });
  const setGeneralInfo = useCallback(
    (value: Partial<GeneralInfo>) => {
      tempGeneralInfo = {
        ...tempGeneralInfo,
        ...value,
      };
      setDebouncedGeneralInfo();
    },
    [generalInfo]
  );

  const [setDebouncedProfessionalExperience] = useDebouncedFunction(
    (operation: Operations, index?: number) => {
      dispatch(
        cacheProfessionalExperience({
          operation,
          data: tempProfessionalExperience,
          index,
        })
      );
      dispatch(setModified(true));
      tempProfessionalExperience = undefined;
    }
  );
  const setProfessionalExperience = useCallback(
    (
      operation: Operations,
      professionalExperienceValue?:
        | Partial<ProfessionalExperience>
        | Partial<ProfessionalExperience>[],
      index?: number
    ) => {
      if (operation === Operations.UPDATE) {
        if (index === undefined) return;
        if (!tempProfessionalExperience) {
          tempProfessionalExperience = professionalExperience[index];
        }
        tempProfessionalExperience = {
          ...tempProfessionalExperience,
          ...professionalExperienceValue,
        };
      } else {
        tempProfessionalExperience = professionalExperienceValue;
      }

      setDebouncedProfessionalExperience(operation, index);
    },
    []
  );

  const [setDebouncedCertificates] = useDebouncedFunction(
    (operation: Operations, index?: number) => {
      dispatch(
        cacheCertificates({
          operation,
          data: tempCertificates,
          index,
        })
      );
      dispatch(setModified(true));
      tempCertificates = undefined;
    }
  );
  const setCertificates = useCallback(
    (
      operation: Operations,
      certificate?: Partial<Certificate> | Partial<Certificate>[],
      index?: number
    ) => {
      if (operation === Operations.UPDATE) {
        if (index === undefined) return;
        if (!tempCertificates) {
          tempCertificates = certificates[index];
        }
        tempCertificates = {
          ...tempCertificates,
          ...certificate,
        };
      } else {
        tempCertificates = certificate;
      }

      setDebouncedCertificates(operation, index);
    },
    []
  );

  const [setDebouncedEducation] = useDebouncedFunction(
    (operation: Operations, index?: number) => {
      dispatch(
        cacheEducation({
          operation,
          data: tempEducation,
          index,
        })
      );
      dispatch(setModified(true));
      tempEducation = undefined;
    }
  );
  const setEducation = useCallback(
    (
      operation: Operations,
      educationValue?: Partial<Education> | Partial<Education>[],
      index?: number
    ) => {
      if (operation === Operations.UPDATE) {
        if (index === undefined) return;
        if (!tempEducation) {
          tempEducation = education[index];
        }
        tempEducation = {
          ...tempEducation,
          ...educationValue,
        };
      } else {
        tempEducation = educationValue;
      }

      setDebouncedEducation(operation, index);
    },
    []
  );

  const [setDebouncedLanguages] = useDebouncedFunction(
    (
      operation: Operations,

      index?: number
    ) => {
      dispatch(
        cacheLanguages({
          operation,
          data: tempLanguages,
          index,
        })
      );
      dispatch(setModified(true));
      tempLanguages = undefined;
    }
  );
  const setLanguages = useCallback(
    (
      operation: Operations,
      languageValue?: Partial<LanguageSkill> | Partial<LanguageSkill>[],
      index?: number
    ) => {
      if (operation === Operations.UPDATE) {
        if (index === undefined) return;
        if (!tempLanguages) {
          tempLanguages = languages[index];
        }
        tempLanguages = {
          ...tempLanguages,
          ...languageValue,
        };
      } else {
        tempLanguages = languageValue;
      }

      setDebouncedLanguages(operation, index);
    },
    []
  );

  const [setSkills] = useDebouncedFunction(
    (operation: Operations, skill?: Partial<Skill>, index?: number) => {
      dispatch(
        cacheSkills({
          operation,
          skill,
          index,
        })
      );
      dispatch(setModified(true));
    },
    0
  );
  const [setDebouncedProjects] = useDebouncedFunction(
    (operation: Operations, index?: number) => {
      dispatch(
        cacheProjects({
          operation,
          data: tempProjects,
          index,
        })
      );
      dispatch(setModified(true));
      tempProjects = undefined;
    }
  );
  const setProjects = useCallback(
    (
      operation: Operations,
      projectValue?: Partial<Project> | Partial<Project>[],
      index?: number
    ) => {
      if (operation === Operations.UPDATE) {
        if (index === undefined) return;
        if (!tempProjects) {
          tempProjects = projects[index];
        }
        tempProjects = {
          ...tempProjects,
          ...projectValue,
        };
      } else {
        tempProjects = projectValue;
      }

      setDebouncedProjects(operation, index);
    },
    []
  );

  const [setAllData] = useDebouncedFunction((data: PDFData) =>
    dispatch(cacheAllData(data))
  );
  const [setAllPreviewData] = useDebouncedFunction((data: DocumentPDFData) =>
    dispatch(cacheAllPreviewData(data))
  );
  const setActiveTemplate = (template: TemplateName) =>
    dispatch(setTemplate(template));
  const getUserData = useCallback(() => {
    dispatch(
      getDataForUser({
        preventVersionHistory: Boolean(
          localStorage.getItem('preventVersionHistory')
        ),
        successCallback: async pdfData => {
          if (!pdfData?.language) return;
          await changeLanguage(pdfData.language || 'en-US');
        },
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
      previewData,
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
    previewData,
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
    setAllPreviewData,
    setActiveTemplate,
    getUserData,
    dispatch,
  };
};
