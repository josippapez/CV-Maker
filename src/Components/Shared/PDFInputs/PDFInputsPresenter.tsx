import { Ref, useEffect, useRef, useState } from 'react';
import usePreventBodyScroll from '../../../Hooks/usePreventBodyScroll';
import { Input, ProfessionalExperience } from '../../PDFView/PDFViewContainer';
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

const arrayOfTexAreas: Array<{
  inputName: string;
  inputValue: keyof Input;
}> = [
  { inputName: 'About me', inputValue: 'aboutMe' },
  /*  { inputName: 'Education', inputValue: 'education' },
  { inputName: 'Skills', inputValue: 'skills' },
  { inputName: 'Languages', inputValue: 'languages' },
  { inputName: 'Interests', inputValue: 'interests' }, */
];

const arrayOfProfessionalExperience: Array<{
  inputName: string;
  inputValue: keyof ProfessionalExperience;
  type: string;
}> = [
  { inputName: 'Company', inputValue: 'company', type: 'text' },
  { inputName: 'Position', inputValue: 'position', type: 'text' },
  { inputName: 'Start date', inputValue: 'startDate', type: 'date' },
  { inputName: 'End date', inputValue: 'endDate', type: 'date' },
  { inputName: 'Description', inputValue: 'description', type: 'text' },
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
  const horizontalScroll = useRef<HTMLDivElement>(null);

  const { disableScroll, enableScroll, position } =
    usePreventBodyScroll(horizontalScroll);

  useEffect(() => {
    if (updateInstanceRef.current) {
      clearTimeout(updateInstanceRef.current);
    }
    updateInstanceRef.current = setTimeout(() => {
      updateInstance();
    }, 500);
  }, [generalInfo, professionalExperience]);

  return (
    <div className='flex-col h-full p-4'>
      <div className='w-full relative navigation'>
        <div className='navigation-hint'>
          {(position === 'left' || position === 'inbetween') && (
            <div className='left-arrow' />
          )}
          {(position === 'right' || position === 'inbetween') && (
            <div className='right-arrow' />
          )}
        </div>
        <div
          ref={horizontalScroll}
          className='overflow-auto scroll w-full min-w-full'
          onMouseEnter={() => {
            disableScroll();
          }}
          onMouseLeave={() => {
            enableScroll();
          }}
        >
          <div className='border-b-4 flex'>
            <button
              className={`tab-button px-4 py-2
            ${
              selectedTab === Tab.generalInfo
                ? 'border-blue-500'
                : 'border-b-transparent'
            }`}
              onClick={() => {
                setSelectedTab(Tab.generalInfo);
              }}
            >
              General information
            </button>
            <button
              className={`tab-button px-4 py-2
           ${
             selectedTab === Tab.professionalExperience
               ? 'border-blue-500'
               : 'border-b-transparent'
           }`}
              onClick={() => {
                setSelectedTab(Tab.professionalExperience);
              }}
            >
              Professional Experience
            </button>
          </div>
        </div>
      </div>
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
        {arrayOfTexAreas.map(input => (
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
        {arrayOfProfessionalExperience.map((input, index) => (
          <div key={input.inputValue} className='flex mt-2 only:first:mt-0'>
            <label className='w-1/4'>{input.inputName}</label>
            <input
              className='w-3/4 border-2 rounded-md p-1 focus:border-slate-400'
              type={input.type}
              value={professionalExperience[index][input.inputValue]}
              onChange={e => {
                setProfessionalExperience([
                  {
                    ...professionalExperience[index],
                    [input.inputValue]: e.target.value,
                  },
                ]);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PDFInputsPresenter;
