import { useTranslation } from 'react-i18next';
import {
  Certificate,
  Education,
  GeneralInfo,
  LanguageProficiencyLevel,
  LanguageSkill,
  ProfessionalExperience,
} from '../../PDFView/PDFViewContainer';
import PDFTabNavigation from '../PDFTabNavigation/PDFTabNavigationContainer';
import { Tab } from './PDFInputsContainer';
import style from './PDFInputsPresenter.module.scss';

type Props = {
  generalInfo: GeneralInfo;
  setGeneralInfo: (generalInfo: GeneralInfo) => void;
  professionalExperience: ProfessionalExperience[];
  setProfessionalExperience: (
    professionalExperience: ProfessionalExperience[]
  ) => void;
  selectedTab: Tab;
  setSelectedTab: (tab: Tab) => void;
  certificates: Certificate[];
  setCertificates: (certificates: Certificate[]) => void;
  educations: Education[];
  setEducation: (education: Education[]) => void;
  languages: LanguageSkill[];
  setLanguages: (languages: LanguageSkill[]) => void;
};

const arrayOfGeneralInputs: Array<{
  inputName: string;
  inputValue: keyof GeneralInfo;
  type: string;
}> = [
  { inputName: 'First name', inputValue: 'firstName', type: 'text' },
  { inputName: 'Last name', inputValue: 'lastName', type: 'text' },
  { inputName: 'Position', inputValue: 'position', type: 'text' },
  { inputName: 'Email', inputValue: 'email', type: 'email' },
  { inputName: 'Phone', inputValue: 'phone', type: 'text' },
  { inputName: 'City', inputValue: 'city', type: 'text' },
  { inputName: 'Country', inputValue: 'country', type: 'text' },
  { inputName: 'Website', inputValue: 'website', type: 'text' },
  { inputName: 'LinkedIn', inputValue: 'LinkedIn', type: 'text' },
  { inputName: 'GitHub', inputValue: 'GitHub', type: 'text' },
  { inputName: 'Twitter', inputValue: 'Twitter', type: 'text' },
  { inputName: 'Facebook', inputValue: 'Facebook', type: 'text' },
];

const arrayOfGeneralTextAreas: Array<{
  inputName: string;
  inputValue: keyof GeneralInfo;
}> = [{ inputName: 'About me', inputValue: 'aboutMe' }];

const arrayOfProfessionalExperienceInputs: Array<{
  inputName: string;
  inputValue: keyof ProfessionalExperience;
  type: string;
}> = [
  { inputName: 'Company', inputValue: 'company', type: 'text' },
  { inputName: 'Position', inputValue: 'position', type: 'text' },
  { inputName: 'Location', inputValue: 'location', type: 'text' },
  { inputName: 'Start date', inputValue: 'startDate', type: 'date' },
  { inputName: 'End date', inputValue: 'endDate', type: 'date' },
];

const arrayOfCertificatesInputs: Array<{
  inputName: string;
  inputValue: keyof Certificate;
  type: string;
}> = [
  { inputName: 'Name', inputValue: 'name', type: 'text' },
  { inputName: 'Date', inputValue: 'date', type: 'date' },
  { inputName: 'Institution', inputValue: 'institution', type: 'text' },
];

const arrayOfEducationInputs: Array<{
  inputName: string;
  inputValue: keyof Education;
  type: string;
}> = [
  { inputName: 'School', inputValue: 'school', type: 'text' },
  { inputName: 'Location', inputValue: 'location', type: 'text' },
  { inputName: 'Degree', inputValue: 'degree', type: 'text' },
  { inputName: 'Field of study', inputValue: 'fieldOfStudy', type: 'text' },
  { inputName: 'Start date', inputValue: 'startDate', type: 'date' },
  { inputName: 'End date', inputValue: 'endDate', type: 'date' },
];

const PDFInputsPresenter = (props: Props) => {
  const { t } = useTranslation();
  const {
    generalInfo,
    setGeneralInfo,
    professionalExperience,
    setProfessionalExperience,
    setSelectedTab,
    selectedTab,
    certificates,
    setCertificates,
    educations,
    setEducation,
    languages,
    setLanguages,
  } = props;

  return (
    <div className='flex-col h-full p-4'>
      <PDFTabNavigation
        setSelectedTab={setSelectedTab}
        selectedTab={selectedTab}
      />
      <div hidden={selectedTab !== Tab.generalInfo} className={style.tab}>
        {arrayOfGeneralInputs.map(input => (
          <div key={input.inputValue} className='flex mt-2 only:first:mt-0'>
            <label className='w-1/4'>{t(`${input.inputValue}`)}</label>
            <input
              className='w-3/4 border-2 rounded-md p-1 focus:border-slate-400'
              type={input.type}
              value={generalInfo[input.inputValue]}
              onChange={e => {
                setGeneralInfo({
                  ...generalInfo,
                  [input.inputValue]: e.target.value,
                });
              }}
            />
          </div>
        ))}
        {arrayOfGeneralTextAreas.map(input => (
          <div key={input.inputValue} className='flex mt-2 only:first:mt-0'>
            <label className='w-1/4'>{t(`${input.inputValue}`)}</label>
            <textarea
              className='w-3/4 border-2 rounded-md p-1 max-h-64 min-h-[8rem] focus:border-slate-400'
              value={generalInfo[input.inputValue]}
              maxLength={490}
              onChange={e => {
                setGeneralInfo({
                  ...generalInfo,
                  [input.inputValue]: e.target.value,
                });
              }}
            />
          </div>
        ))}
      </div>
      <div
        hidden={selectedTab !== Tab.professionalExperience}
        className={style.tab}
      >
        {professionalExperience.map((experience, index) => (
          <div
            key={index}
            className='mt-2 p-4 only:first:mt-0 relative focus-within:bg-slate-200 rounded-md'
          >
            <button
              className={style['delete-button']}
              onClick={() => {
                setProfessionalExperience(
                  professionalExperience.filter(
                    (experience, existingIndex) => existingIndex !== index
                  )
                );
              }}
            />
            {arrayOfProfessionalExperienceInputs.map((input, currentIndex) => (
              <div
                className={`flex ${currentIndex === 0 ? 'mt-0' : 'mt-2'}`}
                key={index + t(`${input.inputValue}`)}
              >
                <label className='w-1/4'>{t(`${input.inputValue}`)}</label>
                <input
                  className={`border-2 rounded-md p-1 focus:border-slate-400 ${
                    input.inputValue === 'endDate' ? 'w-2/4' : 'w-3/4'
                  }`}
                  type='text'
                  value={experience[input.inputValue]}
                  onChange={e => {
                    setProfessionalExperience(
                      professionalExperience.map((experience, i) => {
                        if (i === index) {
                          return {
                            ...experience,
                            [input.inputValue]: e.target.value,
                          };
                        }
                        return experience;
                      })
                    );
                  }}
                />
                {input.inputValue === 'endDate' && (
                  <div className='flex items-center justify-center w-1/4'>
                    <input
                      type='checkbox'
                      checked={experience.endDate === 'Present'}
                      onChange={e => {
                        setProfessionalExperience(
                          professionalExperience.map((experience, i) => {
                            if (i === index) {
                              return {
                                ...experience,
                                endDate: e.target.checked ? 'Present' : '',
                              };
                            }
                            return experience;
                          })
                        );
                      }}
                    />
                    <label className='ml-2'>{t('present')}</label>
                  </div>
                )}
              </div>
            ))}
            <div className='flex mt-2'>
              <label className='w-1/4'>{t('description')}</label>
              <textarea
                className='w-3/4 border-2 rounded-md p-1 max-h-64 min-h-[8rem] focus:border-slate-400'
                value={experience.description}
                onChange={e => {
                  setProfessionalExperience(
                    professionalExperience.map((experience, existingIndex) => {
                      if (existingIndex === index) {
                        return {
                          ...experience,
                          description: e.target.value,
                        };
                      }
                      return experience;
                    })
                  );
                }}
              />
            </div>
          </div>
        ))}
        <button
          className='w-full border-2 rounded-md p-1 focus:border-slate-400'
          onClick={() => {
            setProfessionalExperience([
              ...professionalExperience,
              {
                company: '',
                position: '',
                startDate: '',
                endDate: '',
                description: '',
                location: '',
              },
            ]);
          }}
        >
          {t('addExperience')}
        </button>
      </div>
      <div hidden={selectedTab !== Tab.certificates} className={style.tab}>
        {certificates.map((certificate, index) => (
          <div
            key={index}
            className='mt-2 p-4 only:first:mt-0 relative focus-within:bg-slate-200 rounded-md'
          >
            <button
              className={style['delete-button']}
              onClick={() => {
                setCertificates(
                  certificates.filter((certificate, i) => i !== index)
                );
              }}
            />
            {arrayOfCertificatesInputs.map((input, currentIndex) => (
              <div
                className={`flex ${currentIndex === 0 ? 'mt-0' : 'mt-2'}`}
                key={index + t(`${input.inputValue}`)}
              >
                <label className='w-1/4'>{t(`${input.inputValue}`)}</label>
                <input
                  className='w-3/4 border-2 rounded-md p-1 focus:border-slate-400'
                  type='text'
                  value={certificate[input.inputValue]}
                  onChange={e => {
                    setCertificates(
                      certificates.map((certificate, i) => {
                        if (i === index) {
                          return {
                            ...certificate,
                            [input.inputValue]: e.target.value,
                          };
                        }
                        return certificate;
                      })
                    );
                  }}
                />
              </div>
            ))}
            <div className='flex mt-2'>
              <label className='w-1/4'>{t('description')}</label>
              <textarea
                className='w-3/4 border-2 rounded-md p-1 max-h-64 min-h-[8rem] focus:border-slate-400'
                value={certificate.description}
                onChange={e => {
                  setCertificates(
                    certificates.map((certificate, i) => {
                      if (i === index) {
                        return {
                          ...certificate,
                          description: e.target.value,
                        };
                      }
                      return certificate;
                    })
                  );
                }}
              />
            </div>
          </div>
        ))}
        <button
          className='w-full border-2 rounded-md p-1 focus:border-slate-400'
          onClick={() => {
            setCertificates([
              ...certificates,
              {
                institution: '',
                name: '',
                description: '',
                date: '',
              },
            ]);
          }}
        >
          {t('addCertification')}
        </button>
      </div>
      <div hidden={selectedTab !== Tab.education} className={style.tab}>
        {educations.map((education, index) => (
          <div
            key={index}
            className='mt-2 p-4 only:first:mt-0 relative focus-within:bg-slate-200 rounded-md'
          >
            <button
              className={style['delete-button']}
              onClick={() => {
                setEducation(
                  educations.filter(
                    (item, existingIndex) => existingIndex !== index
                  )
                );
              }}
            />
            {arrayOfEducationInputs.map((input, currentIndex) => (
              <div
                className={`flex ${currentIndex === 0 ? 'mt-0' : 'mt-2'}`}
                key={index + t(`${input.inputValue}`)}
              >
                <label className='w-1/4'>{t(`${input.inputValue}`)}</label>
                <input
                  className={`border-2 rounded-md p-1 focus:border-slate-400 ${
                    input.inputValue === 'endDate' ? 'w-2/4' : 'w-3/4'
                  }`}
                  type='text'
                  value={education[input.inputValue]}
                  onChange={e => {
                    setEducation(
                      educations.map((education, i) => {
                        if (i === index) {
                          return {
                            ...education,
                            [input.inputValue]: e.target.value,
                          };
                        }
                        return education;
                      })
                    );
                  }}
                />
                {input.inputValue === 'endDate' && (
                  <div className='flex items-center justify-center w-1/4'>
                    <input
                      type='checkbox'
                      checked={education.endDate === 'Present'}
                      onChange={e => {
                        setEducation(
                          educations.map((education, i) => {
                            if (i === index) {
                              return {
                                ...education,
                                endDate: e.target.checked ? 'Present' : '',
                              };
                            }
                            return education;
                          })
                        );
                      }}
                    />
                    <label className='ml-2'>{t('present')}</label>
                  </div>
                )}
              </div>
            ))}
            <div className='flex mt-2'>
              <label className='w-1/4'>{t('description')}</label>
              <textarea
                className='w-3/4 border-2 rounded-md p-1 max-h-64 min-h-[8rem] focus:border-slate-400'
                value={education.description}
                onChange={e => {
                  setEducation(
                    educations.map((item, i) => {
                      if (i === index) {
                        return { ...item, description: e.target.value };
                      }
                      return item;
                    })
                  );
                }}
              />
            </div>
          </div>
        ))}
        <button
          className='w-full border-2 rounded-md p-1 focus:border-slate-400'
          onClick={() => {
            setEducation([
              ...educations,
              {
                location: '',
                school: '',
                degree: '',
                fieldOfStudy: '',
                startDate: '',
                endDate: '',
                description: '',
              },
            ]);
          }}
        >
          {t('addEducation')}
        </button>
      </div>
      <div hidden={selectedTab !== Tab.languages} className={style.tab}>
        {languages.map((language, index) => (
          <div
            key={index}
            className='mt-2 p-4 only:first:mt-0 relative focus-within:bg-slate-200 rounded-md'
          >
            <button
              className={style['delete-button']}
              onClick={() => {
                setLanguages(languages.filter((language, i) => i !== index));
              }}
            />
            <div className='flex'>
              <label className='w-1/4'>{t('language')}</label>
              <input
                className='w-3/4 border-2 rounded-md p-1 focus:border-slate-400'
                type='text'
                value={language.name}
                onChange={e => {
                  setLanguages(
                    languages.map((language, i) => {
                      if (i === index) {
                        return {
                          ...language,
                          name: e.target.value,
                        };
                      }
                      return language;
                    })
                  );
                }}
              />
            </div>
            <div className='flex mt-2'>
              <label className='w-1/4'>{t('level')}</label>
              <select
                className='w-3/4 border-2 rounded-md p-1 focus:border-slate-400'
                value={language.proficiency}
                onChange={e => {
                  setLanguages(
                    languages.map((language, i) => {
                      if (i === index) {
                        return {
                          name: language.name,
                          proficiency: e.target
                            .value as LanguageProficiencyLevel,
                        };
                      }
                      return language;
                    })
                  );
                }}
              >
                <option value={LanguageProficiencyLevel.BEGINNER}>
                  {t(LanguageProficiencyLevel.BEGINNER)}
                </option>
                <option value={LanguageProficiencyLevel.CONVERSATIONAL}>
                  {t(LanguageProficiencyLevel.CONVERSATIONAL)}
                </option>
                <option value={LanguageProficiencyLevel.FLUENT}>
                  {t(LanguageProficiencyLevel.FLUENT)}
                </option>
                <option value={LanguageProficiencyLevel.NATIVE}>
                  {t(LanguageProficiencyLevel.NATIVE)}
                </option>
              </select>
            </div>
          </div>
        ))}
        <button
          className='w-full border-2 rounded-md p-1 focus:border-slate-400'
          onClick={() => {
            setLanguages([
              ...languages,
              { name: '', proficiency: LanguageProficiencyLevel.BEGINNER },
            ]);
          }}
        >
          {t('addLanguage')}
        </button>
      </div>
    </div>
  );
};

export default PDFInputsPresenter;
