import { AnimatePresence, motion } from 'framer-motion';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import useAnimation from '../../../../Hooks/useAnimation';
import { ProfessionalExperience } from '../../../PDFView/models';
import { PDFViewContext } from '../../../PDFView/PDFViewProvider';
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
  {
    inputName: 'Description',
    inputValue: 'description',
    type: 'text',
    textarea: true,
  },
];

export const ProfessionalExperienceInput = () => {
  const { setProfessionalExperience, professionalExperience } =
    useContext(PDFViewContext);
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
          className='flex flex-col gap-4 p-10 relative focus-within:bg-green-100 rounded-md first:mt-0 mt-4'
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
                <TextInput
                  label={t(`${input.inputValue}`)}
                  value={experience[input.inputValue]}
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
                {input.inputValue === 'endDate' && (
                  <ToggleInput
                    label={t('present')}
                    name={input.inputValue}
                    checked={experience.endDate === t('present')}
                    wrapperClassName='mt-4'
                    onChange={e => {
                      setProfessionalExperience(
                        professionalExperience.map((experience, i) => {
                          if (i === index) {
                            return {
                              ...experience,
                              endDate: e.target.checked ? t('present') : '',
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
            },
          ]);
        }}
        title={t('addExperience')}
      />
    </motion.div>
  );
};
