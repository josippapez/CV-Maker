import usePDFData from '@/Hooks/usePDFData';
import { Operations } from '@/store/reducers/pdfData';
import { motion } from 'framer-motion';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useAnimation from '../../../../Hooks/useAnimation';
import { Education } from '../../../PDFView/models';
import { DateInput } from '../../Inputs/DateInput';
import TextInput from '../../Inputs/TextInput';
import ToggleInput from '../../Inputs/ToggleInput';
import { DeleteButton } from './DeleteButton';

interface Props {
  education: Education;
  index: number;
}

const arrayOfEducationInputs: Array<{
  inputName: string;
  inputValue: keyof Education;
  type: string;
}> = [
  { inputName: 'school', inputValue: 'school', type: 'text' },
  { inputName: 'location', inputValue: 'location', type: 'text' },
  { inputName: 'degree', inputValue: 'degree', type: 'text' },
  { inputName: 'fieldOfStudy', inputValue: 'fieldOfStudy', type: 'text' },
  { inputName: 'startDate', inputValue: 'startDate', type: 'date' },
  { inputName: 'endDate', inputValue: 'endDate', type: 'date' },
  {
    inputName: 'currentlyEnrolled',
    inputValue: 'currentlyEnrolled',
    type: 'toggle',
  },
];

const arrayOfCourseInputs: Array<{
  inputName: keyof Education;
  inputValue: keyof Education;
  type: string;
}> = [
  { inputName: 'course', inputValue: 'course', type: 'text' },
  { inputName: 'url', inputValue: 'url', type: 'text' },
  { inputName: 'startDate', inputValue: 'startDate', type: 'date' },
  { inputName: 'endDate', inputValue: 'endDate', type: 'date' },
  {
    inputName: 'currentlyEnrolled',
    inputValue: 'currentlyEnrolled',
    type: 'toggle',
  },
];

const EducationItem = (props: Props) => {
  const { t } = useTranslation('EducationInput');
  const { setEducation, education: educationList } = usePDFData();
  const { education, index } = props;

  const { combinedStyleFinal, combinedStyleInitial } = useAnimation({
    amountY: 10,
  });
  const [selectedEducation, setSelectedEducation] = useState<
    'school' | 'course'
  >(education.course ? 'course' : 'school');

  const getEducationInputs = () => {
    if (selectedEducation === 'course') {
      return arrayOfCourseInputs;
    }
    return arrayOfEducationInputs;
  };

  const handleSelectedEducation = (value: string) => {
    setEducation(
      Operations.UPDATE,
      {
        url: '',
        course: '',
        location: '',
        school: '',
        degree: '',
        fieldOfStudy: '',
        startDate: '',
        endDate: '',
        description: '',
        currentlyEnrolled: false,
      },
      index
    );
    if (value === 'school') {
      return setSelectedEducation('school');
    }
    return setSelectedEducation('course');
  };

  const handleSetData = useCallback(
    (value: string | boolean, inputName: string) => {
      setEducation(
        Operations.UPDATE,
        {
          [inputName]: value,
        },
        index
      );
    },
    [educationList, index]
  );

  return (
    <motion.div
      key={`EducationInput-${index}`}
      initial={combinedStyleInitial}
      animate={combinedStyleFinal}
      transition={{ duration: 0.2 }}
      className='relative mt-4 flex flex-col gap-4 rounded-md p-10 first:mt-0 focus-within:bg-green-100'
    >
      <DeleteButton
        onClick={() => {
          setEducation(Operations.REMOVE, undefined, index);
        }}
      />
      <div className='flex flex-row gap-4'>
        <button
          onClick={() => handleSelectedEducation('school')}
          className={`${
            selectedEducation === 'school'
              ? 'bg-green-500 text-white'
              : 'bg-white text-green-500'
          } rounded-md p-2`}
        >
          {t('school')}
        </button>
        <button
          onClick={() => handleSelectedEducation('course')}
          className={`${
            selectedEducation === 'course'
              ? 'bg-green-500 text-white'
              : 'bg-white text-green-500'
          } rounded-md p-2`}
        >
          {t('course')}
        </button>
      </div>
      {getEducationInputs().map((input, currentIndex) => (
        <div key={`input-${index}-${currentIndex}`}>
          {input.type === 'date' ? (
            <DateInput
              type='month'
              disabled={
                education.currentlyEnrolled && input.inputValue === 'endDate'
              }
              label={t(`${input.inputValue}`)}
              value={education[input.inputValue] as string}
              setData={date => handleSetData(date, input.inputValue)}
              resetData={() => handleSetData('', input.inputValue)}
              format={{
                month: 'short',
                year: 'numeric',
              }}
            />
          ) : (
            input.type !== 'toggle' && (
              <TextInput
                label={t(`${input.inputName}`)}
                defaultValue={education[input.inputValue] as string}
                name={input.inputName}
                onChange={e => handleSetData(e.target.value, input.inputValue)}
                fullWidth
              />
            )
          )}
          {input.type === 'toggle' && (
            <ToggleInput
              label={t('present')}
              name={input.inputName}
              checked={education.currentlyEnrolled}
              wrapperClassName='mt-4'
              onChange={e => handleSetData(e.target.checked, input.inputValue)}
              fullWidth
            />
          )}
        </div>
      ))}
      <TextInput
        key={`${index}-${getEducationInputs().length - 1}-input`}
        label={t('description')}
        defaultValue={education.description}
        name='education-description'
        onChange={e => {
          setEducation(
            Operations.UPDATE,
            {
              description: e.target.value,
            },
            index
          );
        }}
        fullWidth
        textarea
      />
    </motion.div>
  );
};

export default EducationItem;
