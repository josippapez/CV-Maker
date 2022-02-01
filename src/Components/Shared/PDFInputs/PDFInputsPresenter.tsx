import { useEffect, useRef } from 'react';
import { Input, ProfessionalExperience } from '../../PDFView/PDFViewContainer';

type Props = {
  generalInfo: Input;
  setGeneralInfo: (generalInfo: Input) => void;
  professionalExperience: ProfessionalExperience[];
  setProfessionalExperience: (
    professionalExperience: ProfessionalExperience[]
  ) => void;
  updateInstance: () => void;
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

const arrayOfProfessionalExperience: Array<keyof ProfessionalExperience> = [
  'company',
  'position',
  'startDate',
  'endDate',
  'description',
];

const PDFInputsPresenter = (props: Props) => {
  const {
    generalInfo,
    setGeneralInfo,
    professionalExperience,
    setProfessionalExperience,
    updateInstance,
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
  }, [generalInfo]);

  return (
    <div className='flex-col h-full'>
      {arrayOfInputs.map(input => (
        <div key={input.inputValue} className='flex mt-2 only:first:mt-0'>
          <label className='w-1/4'>{input.inputName}</label>
          <input
            className='w-3/4 border-2 rounded-md p-1 focus:outline-slate-400'
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
            className='w-3/4 border-2 rounded-md p-1 max-h-64 min-h-[8rem] focus:outline-slate-400'
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
  );
};

export default PDFInputsPresenter;
