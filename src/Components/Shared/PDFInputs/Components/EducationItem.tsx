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
  setEducation: (educations: Education[]) => void;
  educationList: Education[];
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
  const { education, index, setEducation, educationList } = props;

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

  const handleSelectedEducation = (
    value: string,
    selectedEducationIndex: number
  ) => {
    setEducation(
      educationList.map((education, index) => {
        if (index === selectedEducationIndex) {
          return {
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
          };
        }
        return education;
      })
    );
    if (value === 'school') {
      return setSelectedEducation('school');
    }
    return setSelectedEducation('course');
  };

  const handleSetData = useCallback(
    (value: string | boolean, inputName: string) => {
      setEducation(
        educationList.map((education, i) => {
          if (i === index) {
            return {
              ...education,
              [inputName]: value,
            };
          }
          return education;
        })
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
      className='flex flex-col gap-4 p-10 relative focus-within:bg-green-100 rounded-md first:mt-0 mt-4'
    >
      <DeleteButton
        onClick={() => {
          setEducation(
            educationList.filter(
              (item, existingIndex) => existingIndex !== index
            )
          );
        }}
      />
      <div className='flex flex-row gap-4'>
        <button
          onClick={() => handleSelectedEducation('school', index)}
          className={`${
            selectedEducation === 'school'
              ? 'bg-green-500 text-white'
              : 'bg-white text-green-500'
          } p-2 rounded-md`}
        >
          {t('school')}
        </button>
        <button
          onClick={() => handleSelectedEducation('course', index)}
          className={`${
            selectedEducation === 'course'
              ? 'bg-green-500 text-white'
              : 'bg-white text-green-500'
          } p-2 rounded-md`}
        >
          {t('course')}
        </button>
      </div>
      {getEducationInputs().map((input, currentIndex) => (
        <div key={`input-${index}-${currentIndex}`}>
          {input.type === 'date' ? (
            <DateInput
              monthsPicker
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
                value={education[input.inputValue] as string}
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
        value={education.description}
        name='education-description'
        onChange={e => {
          setEducation(
            educationList.map((item, i) => {
              if (i === index) {
                return { ...item, description: e.target.value };
              }
              return item;
            })
          );
        }}
        fullWidth
        textarea
      />
    </motion.div>
  );
};

export default EducationItem;
