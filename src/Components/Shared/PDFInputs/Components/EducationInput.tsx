import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import useAnimation from '../../../../Hooks/useAnimation';
import { Education } from '../../../PDFView/models';
import TextInput from '../../Inputs/TextInput';
import ToggleInput from '../../Inputs/ToggleInput';
import { AddNewButton } from './AddNewButton';
import { DeleteButton } from './DeleteButton';

interface Props {
  selectedTab: boolean;
  setEducation: (educations: Education[]) => void;
  educations: Education[];
}

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

export const EducationInput = (props: Props) => {
  const { t } = useTranslation();
  const { combinedStyleFinal, combinedStyleInitial } = useAnimation({
    amountY: 10,
  });
  const { selectedTab, setEducation, educations } = props;

  return (
    <div hidden={!selectedTab}>
      {educations.map((education, index) => (
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
                educations.filter(
                  (item, existingIndex) => existingIndex !== index
                )
              );
            }}
          />
          {arrayOfEducationInputs.map((input, currentIndex) => (
            <div key={`input-${index}-${currentIndex}`}>
              <TextInput
                label={t(`${input.inputValue}`)}
                value={education[input.inputValue]}
                name={input.inputValue}
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
                  name={input.inputValue}
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
            key={`${index}-${arrayOfEducationInputs.length - 1}-input`}
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
      ))}
      <AddNewButton
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
        title={t('addEducation')}
      />
    </div>
  );
};
