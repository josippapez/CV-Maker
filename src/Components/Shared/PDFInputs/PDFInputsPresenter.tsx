import { Ref, useEffect, useRef, useState } from 'react';
import usePreventBodyScroll from '../../../Hooks/usePreventBodyScroll';
import { Input, ProfessionalExperience } from '../../PDFView/PDFViewContainer';
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
  updateInstance: () => void;
  selectedTab: Tab;
  setSelectedTab: (tab: Tab) => void;
};

const arrayOfInputs: Array<{
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

const arrayOfTextAreas: Array<{
  inputName: string;
  inputValue: keyof Input;
}> = [
  { inputName: 'About me', inputValue: 'aboutMe' },
  /*  { inputName: 'Education', inputValue: 'education' },
  { inputName: 'Skills', inputValue: 'skills' },
  { inputName: 'Languages', inputValue: 'languages' },
  { inputName: 'Interests', inputValue: 'interests' }, */
];

const PDFInputsPresenter = (props: Props) => {
  const {
    generalInfo,
    setGeneralInfo,
    professionalExperience,
    setProfessionalExperience,
    updateInstance,
    setSelectedTab,
    selectedTab,
  } = props;

  const updateInstanceRef: { current: null | ReturnType<typeof setTimeout> } =
    useRef(null);

  useEffect(() => {
    if (updateInstanceRef.current) {
      clearTimeout(updateInstanceRef.current);
    }
    updateInstanceRef.current = setTimeout(() => {
      updateInstance();
    }, 500);
  }, [generalInfo, professionalExperience]);
  console.log(professionalExperience);

  return (
    <div className='flex-col h-full p-4'>
      <PDFTabNavigation
        setSelectedTab={setSelectedTab}
        selectedTab={selectedTab}
      />
      <div hidden={selectedTab !== Tab.generalInfo} className='tab'>
        {arrayOfInputs.map(input => (
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
        {arrayOfTextAreas.map(input => (
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
            className='flex mt-2 p-4 only:first:mt-0 relative focus-within:bg-slate-200 rounded-md'
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
            <div className='w-full'>
              <div className='flex'>
                <label className='w-1/4'>Company</label>
                <input
                  className='w-3/4 border-2 rounded-md p-1 focus:border-slate-400'
                  type='text'
                  value={experience.company}
                  onChange={e => {
                    setProfessionalExperience(
                      professionalExperience.map((experience, index) => {
                        if (index === index) {
                          return {
                            ...experience,
                            company: e.target.value,
                          };
                        }
                        return experience;
                      })
                    );
                  }}
                />
              </div>
              <div className='flex mt-2'>
                <label className='w-1/4'>Position</label>
                <input
                  className='w-3/4 border-2 rounded-md p-1 focus:border-slate-400'
                  type='text'
                  value={experience.position}
                  onChange={e => {
                    setProfessionalExperience(
                      professionalExperience.map((experience, index) => {
                        if (index === index) {
                          return {
                            ...experience,
                            position: e.target.value,
                          };
                        }
                        return experience;
                      })
                    );
                  }}
                />
              </div>
              <div className='flex mt-2'>
                <label className='w-1/4'>Location</label>
                <input
                  className='w-3/4 border-2 rounded-md p-1 focus:border-slate-400'
                  type='text'
                  value={experience.location}
                  onChange={e => {
                    setProfessionalExperience(
                      professionalExperience.map((item, i) => {
                        if (i === index) {
                          return { ...item, location: e.target.value };
                        }
                        return item;
                      })
                    );
                  }}
                />
              </div>
              <div className='flex mt-2'>
                <label className='w-1/4'>Start date</label>
                <input
                  className='w-3/4 border-2 rounded-md p-1 focus:border-slate-400'
                  type='date'
                  value={experience.startDate}
                  onChange={e => {
                    setProfessionalExperience(
                      professionalExperience.map((experience, index) => {
                        if (index === index) {
                          return {
                            ...experience,
                            startDate: e.target.value,
                          };
                        }
                        return experience;
                      })
                    );
                  }}
                />
              </div>
              <div className='flex mt-2'>
                <label className='w-1/4'>End date</label>
                <input
                  className='w-3/4 border-2 rounded-md p-1 focus:border-slate-400'
                  type='date'
                  value={experience.endDate}
                  onChange={e => {
                    setProfessionalExperience(
                      professionalExperience.map((experience, index) => {
                        if (index === index) {
                          return {
                            ...experience,
                            endDate: e.target.value,
                          };
                        }
                        return experience;
                      })
                    );
                  }}
                />
              </div>
              <div className='flex mt-2'>
                <label className='w-1/4'>Description</label>
                <textarea
                  className='w-3/4 border-2 rounded-md p-1 max-h-64 min-h-[8rem] focus:border-slate-400'
                  value={experience.description}
                  onChange={e => {
                    setProfessionalExperience(
                      professionalExperience.map((experience, index) => {
                        if (index === index) {
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
    </div>
  );
};

export default PDFInputsPresenter;
