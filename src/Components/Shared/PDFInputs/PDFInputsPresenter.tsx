import { Ref, useEffect, useRef, useState } from 'react';
import usePreventBodyScroll from '../../../Hooks/usePreventBodyScroll';
import {
  Certificate,
  Education,
  Input,
  ProfessionalExperience,
} from '../../PDFView/PDFViewContainer';
import PDFTabNavigation from '../PDFTabNavigation/PDFTabNavigationContainer';
import { Tab } from './PDFInputsContainer';

import './PDFInputsPresenter.css';

type Props = {
  generalInfo: Input;
  setGeneralInfo: (generalInfo: Input) => void;
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
};

const arrayOfGeneralInputs: Array<{
  inputName: string;
  inputValue: keyof Input;
  type: string;
}> = [
  { inputName: 'First name', inputValue: 'firstName', type: 'text' },
  { inputName: 'Last name', inputValue: 'lastName', type: 'text' },
  { inputName: 'Position', inputValue: 'position', type: 'text' },
  { inputName: 'Email', inputValue: 'email', type: 'email' },
  { inputName: 'Phone', inputValue: 'phone', type: 'text' },
  { inputName: 'Address', inputValue: 'address', type: 'text' },
  { inputName: 'City', inputValue: 'city', type: 'text' },
  { inputName: 'Zip', inputValue: 'zip', type: 'number' },
  { inputName: 'Country', inputValue: 'country', type: 'text' },
  { inputName: 'Website', inputValue: 'website', type: 'text' },
];

const arrayOfGeneralTextAreas: Array<{
  inputName: string;
  inputValue: keyof Input;
}> = [
  { inputName: 'About me', inputValue: 'aboutMe' },
  /*  { inputName: 'Education', inputValue: 'education' },
  { inputName: 'Skills', inputValue: 'skills' },
  { inputName: 'Languages', inputValue: 'languages' },
  { inputName: 'Interests', inputValue: 'interests' }, */
];

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
  } = props;

  return (
    <div className='flex-col h-full p-4'>
      <PDFTabNavigation
        setSelectedTab={setSelectedTab}
        selectedTab={selectedTab}
      />
      <div hidden={selectedTab !== Tab.generalInfo} className='tab'>
        {arrayOfGeneralInputs.map(input => (
          <div key={input.inputValue} className='flex mt-2 only:first:mt-0'>
            <label className='w-1/4'>{input.inputName}</label>
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
            <label className='w-1/4'>{input.inputName}</label>
            <textarea
              className='w-3/4 border-2 rounded-md p-1 max-h-64 min-h-[8rem] focus:border-slate-400'
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
      </div>
      <div hidden={selectedTab !== Tab.professionalExperience} className='tab'>
        {professionalExperience.map((experience, index) => (
          <div
            key={index}
            className='mt-2 p-4 only:first:mt-0 relative focus-within:bg-slate-200 rounded-md'
          >
            <button
              type='button'
              className='delete-button'
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
                key={index + input.inputName}
              >
                <label className='w-1/4'>{input.inputName}</label>
                <input
                  className='w-3/4 border-2 rounded-md p-1 focus:border-slate-400'
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
              </div>
            ))}
            <div className='flex mt-2'>
              <label className='w-1/4'>Description</label>
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
          Add experience
        </button>
      </div>
      <div hidden={selectedTab !== Tab.certificates} className='tab'>
        {certificates.map((certificate, index) => (
          <div
            key={index}
            className='mt-2 p-4 only:first:mt-0 relative focus-within:bg-slate-200 rounded-md'
          >
            <button
              type='button'
              className='delete-button'
              onClick={() => {
                setCertificates(
                  certificates.filter((certificate, i) => i !== index)
                );
              }}
            />
            {arrayOfCertificatesInputs.map((input, currentIndex) => (
              <div
                className={`flex ${currentIndex === 0 ? 'mt-0' : 'mt-2'}`}
                key={index + input.inputName}
              >
                <label className='w-1/4'>{input.inputName}</label>
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
              <label className='w-1/4'>Description</label>
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
          Add certificate
        </button>
      </div>
      <div hidden={selectedTab !== Tab.education} className='tab'>
        {educations.map((education, index) => (
          <div
            key={index}
            className='mt-2 p-4 only:first:mt-0 relative focus-within:bg-slate-200 rounded-md'
          >
            <button
              type='button'
              className='delete-button'
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
                key={index + input.inputName}
              >
                <label className='w-1/4'>{input.inputName}</label>
                <input
                  className='w-3/4 border-2 rounded-md p-1 focus:border-slate-400'
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
              </div>
            ))}
            <div className='flex mt-2'>
              <label className='w-1/4'>Description</label>
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
          Add education
        </button>
      </div>
    </div>
  );
};

export default PDFInputsPresenter;
