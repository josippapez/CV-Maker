import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import useAnimation from '../../../../Hooks/useAnimation';
import usePDFData from '../../../../Hooks/usePDFData';
import { ProfessionalExperience } from '../../../PDFView/models';
import { DateInput } from '../../Inputs/DateInput';
import TextInput from '../../Inputs/TextInput';
import ToggleInput from '../../Inputs/ToggleInput';
import { AddNewButton } from './AddNewButton';
import { DeleteButton } from './DeleteButton';

const arrayOfProfessionalExperienceInputs: Array<{
  inputName: string;
  inputValue: keyof ProfessionalExperience;
  type: string;
  textarea?: boolean;
}> = [
  { inputName: 'Company', inputValue: 'company', type: 'text' },
  { inputName: 'Position', inputValue: 'position', type: 'text' },
  { inputName: 'Location', inputValue: 'location', type: 'text' },
  { inputName: 'Start date', inputValue: 'startDate', type: 'date' },
  { inputName: 'End date', inputValue: 'endDate', type: 'date' },
  { inputName: 'Present', inputValue: 'currentlyEnrolled', type: 'toggle' },
  {
    inputName: 'Description',
    inputValue: 'description',
    type: 'text',
    textarea: true,
  },
];

export const ProfessionalExperienceInput = () => {
  const { setProfessionalExperience, professionalExperience } = usePDFData();
  const { t } = useTranslation('ProfessionalExperienceInput');
  const { combinedStyleFinal, combinedStyleInitial } = useAnimation({
    amountY: 10,
  });

  return (
    <motion.div
      initial={combinedStyleInitial}
      animate={combinedStyleFinal}
      exit={combinedStyleInitial}
      transition={{ duration: 0.1, when: 'beforeChildren' }}
    >
      {professionalExperience.map((experience, index) => (
        <motion.div
          key={`professionalExperience-${index}`}
          initial={combinedStyleInitial}
          animate={combinedStyleFinal}
          exit={combinedStyleInitial}
          transition={{ duration: 0.2, when: 'beforeChildren' }}
          className='relative mt-4 flex flex-col gap-4 rounded-md p-10 first:mt-0 focus-within:bg-green-100'
        >
          <DeleteButton
            onClick={() => {
              setProfessionalExperience(
                professionalExperience.filter(
                  (experience, existingIndex) => existingIndex !== index
                )
              );
            }}
          />
          <AnimatePresence>
            {arrayOfProfessionalExperienceInputs.map((input, currentIndex) => (
              <motion.div
                key={`professionalExperience-${index}-${currentIndex}-input`}
                initial={combinedStyleInitial}
                animate={combinedStyleFinal}
                exit={combinedStyleInitial}
                transition={{
                  duration: 0.2,
                  delay: currentIndex * 0.05,
                }}
              >
                {input.type === 'date' ? (
                  <DateInput
                    type='month'
                    disabled={
                      experience.currentlyEnrolled &&
                      input.inputValue === 'endDate'
                    }
                    label={t(`${input.inputValue}`)}
                    value={experience[input.inputValue] as string}
                    setData={date => {
                      setProfessionalExperience(
                        professionalExperience.map((experience, i) => {
                          if (i === index) {
                            return {
                              ...experience,
                              [input.inputValue]: date,
                            };
                          }
                          return experience;
                        })
                      );
                    }}
                    resetData={() => {
                      setProfessionalExperience(
                        professionalExperience.map((experience, i) => {
                          if (i === index) {
                            return {
                              ...experience,
                              [input.inputValue]: '',
                            };
                          }
                          return experience;
                        })
                      );
                    }}
                    format={{
                      month: 'short',
                      year: 'numeric',
                    }}
                  />
                ) : (
                  input.type !== 'toggle' && (
                    <TextInput
                      label={t(`${input.inputValue}`)}
                      value={experience[input.inputValue] as string}
                      name={input.inputValue}
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
                      fullWidth
                      textarea={input.textarea}
                    />
                  )
                )}
                {input.type === 'toggle' && (
                  <ToggleInput
                    label={t(`${input.inputValue}`)}
                    name={input.inputValue}
                    checked={experience.currentlyEnrolled}
                    wrapperClassName='mt-4'
                    onChange={e => {
                      setProfessionalExperience(
                        professionalExperience.map((experience, i) => {
                          if (i === index) {
                            return {
                              ...experience,
                              currentlyEnrolled: e.target.checked,
                            };
                          }
                          return experience;
                        })
                      );
                    }}
                    fullWidth
                  />
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ))}
      <AddNewButton
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
              currentlyEnrolled: false,
            },
          ]);
        }}
        title={t('addExperience')}
      />
    </motion.div>
  );
};
