import { useTranslation } from 'react-i18next';
import { ProfessionalExperience } from '../../../PDFView/models';
import TextInput from '../../Inputs/TextInput';
import ToggleInput from '../../Inputs/ToggleInput';
import style from '../PDFInputsPresenter.module.scss';
import { motion } from 'framer-motion';
import useAnimation from '../../../../Hooks/useAnimation';

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
          key={index}
          initial={combinedStyleInitial}
          animate={selectedTab ? combinedStyleFinal : combinedStyleInitial}
          transition={{ duration: 0.2 }}
          className='flex flex-col gap-4 p-4 relative focus-within:bg-slate-200 rounded-md'
        >
          <button
            className={style['delete-button']}
            onClick={() => {
              setProfessionalExperience(
                professionalExperience.filter(
                  (experience, existingIndex) => existingIndex !== index
                )
              );
            }}
          />
          {arrayOfProfessionalExperienceInputs.map((input, currentIndex) => (
            <>
              <TextInput
                key={index + '-' + t(`${input.inputValue}`)}
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
                  key={index + '-' + t(`${input.inputValue}`)}
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
            key={index + '-' + t('description')}
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
