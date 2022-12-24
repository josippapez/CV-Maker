import { motion } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import useAnimation from '../../../../Hooks/useAnimation';
import { Education } from '../../../PDFView/models';
import TextInput from '../../Inputs/TextInput';
import ToggleInput from '../../Inputs/ToggleInput';
import { DeleteButton } from './DeleteButton';

interface Props {
  selectedTab: boolean;
  education: Education;
  index: number;
  setEducation: (educations: Education[]) => void;
  educations: Education[];
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
];

const EducationItem = (props: Props) => {
  const { t } = useTranslation('EducationInput');
  const { education, index, setEducation, educations, selectedTab } = props;

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
      educations.map((education, index) => {
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

  return (
    <motion.div
      key={`EducationInput-${index}`}
      initial={combinedStyleInitial}
      animate={selectedTab ? combinedStyleFinal : combinedStyleInitial}
      transition={{ duration: 0.2 }}
      className='flex flex-col gap-4 p-10 relative focus-within:bg-green-100 rounded-md first:mt-0 mt-4'
    >
      <DeleteButton
        onClick={() => {
          setEducation(
            educations.filter((item, existingIndex) => existingIndex !== index)
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
          <TextInput
            label={t(`${input.inputName}`)}
            value={education[input.inputValue]}
            name={input.inputName}
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
            fullWidth
          />
          {input.inputValue === 'endDate' && (
            <ToggleInput
              label={t('present')}
              name={input.inputName}
              checked={education.endDate === t('present')}
              wrapperClassName='mt-4'
              onChange={e => {
                setEducation(
                  educations.map((education, i) => {
                    if (i === index) {
                      return {
                        ...education,
                        endDate: e.target.checked ? t('present') : '',
                      };
                    }
                    return education;
                  })
                );
              }}
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
            educations.map((item, i) => {
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
