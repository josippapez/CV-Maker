import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import useAnimation from '../../../../Hooks/useAnimation';
import { ReactComponent as DeleteIcon } from '../../../../Styles/Assets/Images/deleteIcon.svg';
import { ProfessionalExperience } from '../../../PDFView/models';
import TextInput from '../../Inputs/TextInput';
import ToggleInput from '../../Inputs/ToggleInput';

interface Props {
  selectedTab: boolean;
  setProfessionalExperience: (
    professionalExperience: ProfessionalExperience[]
  ) => void;
  professionalExperience: ProfessionalExperience[];
}

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

export const ProfessionalExperienceInput = (props: Props) => {
  const { t } = useTranslation();
  const { combinedStyleFinal, combinedStyleInitial } = useAnimation({
    amountY: 10,
  });
  const { selectedTab, setProfessionalExperience, professionalExperience } =
    props;

  return (
    <div hidden={!selectedTab}>
      {professionalExperience.map((experience, index) => (
        <motion.div
          key={index + '-' + 'professionalExperience'}
          initial={combinedStyleInitial}
          animate={selectedTab ? combinedStyleFinal : combinedStyleInitial}
          transition={{ duration: 0.2 }}
          className='flex flex-col gap-4 p-4 relative focus-within:bg-slate-200 rounded-md border border-gray-400 first:mt-0 mt-4'
        >
          <button
            className='absolute top-0 right-0'
            onClick={() => {
              setProfessionalExperience(
                professionalExperience.filter(
                  (experience, existingIndex) => existingIndex !== index
                )
              );
            }}
          >
            <DeleteIcon className='hover:stroke-red-600' width={30} height={30} />
          </button>
          {arrayOfProfessionalExperienceInputs.map((input, currentIndex) => (
            <>
              <TextInput
                key={
                  index + '-' + 'professionalExperience' + '-' + currentIndex
                }
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
              />
              {input.inputValue === 'endDate' && (
                <ToggleInput
                  key={
                    index + '-' + 'professionalExperience' + '-' + currentIndex
                  }
                  label={t('present')}
                  name={input.inputValue}
                  checked={experience.endDate === t('present')}
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
            </>
          ))}
          <TextInput
            key={
              index +
              '-' +
              'professionalExperience' +
              '-' +
              (arrayOfProfessionalExperienceInputs.length - 1)
            }
            label={t('description')}
            value={experience.description}
            name='description'
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
            fullWidth
            textarea
          />
        </motion.div>
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
        {t('addExperience')}
      </button>
    </div>
  );
};
