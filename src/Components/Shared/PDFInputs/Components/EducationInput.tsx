import { useTranslation } from 'react-i18next';
import useAnimation from '../../../../Hooks/useAnimation';
import { Education } from '../../../PDFView/models';
import TextInput from '../../Inputs/TextInput';
import ToggleInput from '../../Inputs/ToggleInput';
import style from '../PDFInputsPresenter.module.scss';
import { motion } from 'framer-motion';

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
          key={index}
          initial={combinedStyleInitial}
          animate={selectedTab ? combinedStyleFinal : combinedStyleInitial}
          transition={{ duration: 0.2 }}
          className='flex flex-col gap-4 p-4 relative focus-within:bg-slate-200 rounded-md'
        >
          <button
            className={style['delete-button']}
            onClick={() => {
              setEducation(
                educations.filter(
                  (item, existingIndex) => existingIndex !== index
                )
              );
            }}
          />
          {arrayOfEducationInputs.map((input, currentIndex) => (
            <>
              <TextInput
                key={index + t(`${input.inputValue}`)}
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
                  key={index + '-' + t(`${input.inputValue}`)}
                  label={t('present')}
                  name={input.inputValue}
                  checked={education.endDate === t('present')}
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
            </>
          ))}
          <TextInput
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
      <button
        className='w-full border-2 rounded-md p-1 focus:border-slate-400'
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
      >
        {t('addEducation')}
      </button>
    </div>
  );
};
