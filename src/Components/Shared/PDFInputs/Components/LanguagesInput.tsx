import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import useAnimation from '../../../../Hooks/useAnimation';
import { ReactComponent as DeleteIcon } from '../../../../Styles/Assets/Images/deleteIcon.svg';
import {
  LanguageProficiencyLevel,
  LanguageSkill,
} from '../../../PDFView/models';
import TextInput from '../../Inputs/TextInput';

interface Props {
  selectedTab: boolean;
  setLanguages: (languages: LanguageSkill[]) => void;
  languages: LanguageSkill[];
}

export const LanguagesInput = (props: Props) => {
  const { t } = useTranslation();
  const { combinedStyleFinal, combinedStyleInitial } = useAnimation({
    amountY: 10,
  });
  const { selectedTab, setLanguages, languages } = props;
  return (
    <div hidden={!selectedTab}>
      {languages.map((language, index) => (
        <motion.div
          key={index + '-' + 'LanguagesInput'}
          initial={combinedStyleInitial}
          animate={selectedTab ? combinedStyleFinal : combinedStyleInitial}
          transition={{ duration: 0.2 }}
          className='flex flex-col gap-4 p-4 relative focus-within:bg-slate-200 border-t py-4 border-gray-400 first:mt-0 mt-4'
        >
          <button
            className='absolute top-0 right-0'
            onClick={() => {
              setLanguages(languages.filter((language, i) => i !== index));
            }}
          >
            <DeleteIcon
              className='hover:stroke-red-600'
              width={30}
              height={30}
            />
          </button>
          <div className='flex'>
            <TextInput
              key={index + '-' + 'LanguagesInput' + '-' + t('language')}
              label={t('language')}
              value={language.name}
              name='language'
              onChange={e => {
                setLanguages(
                  languages.map((language, i) => {
                    if (i === index) {
                      return {
                        ...language,
                        name: e.target.value,
                      };
                    }
                    return language;
                  })
                );
              }}
              fullWidth
            />
          </div>
          <div className='flex mt-2'>
            <label className='w-1/4 font-medium self-center'>
              {t('level')}
            </label>
            <select
              className='w-3/4 border-2 rounded-md p-1 focus:border-slate-400'
              value={language.proficiency}
              onChange={e => {
                setLanguages(
                  languages.map((language, i) => {
                    if (i === index) {
                      return {
                        name: language.name,
                        proficiency: e.target.value as LanguageProficiencyLevel,
                      };
                    }
                    return language;
                  })
                );
              }}
            >
              <option value={LanguageProficiencyLevel.BEGINNER}>
                {t(LanguageProficiencyLevel.BEGINNER)}
              </option>
              <option value={LanguageProficiencyLevel.CONVERSATIONAL}>
                {t(LanguageProficiencyLevel.CONVERSATIONAL)}
              </option>
              <option value={LanguageProficiencyLevel.FLUENT}>
                {t(LanguageProficiencyLevel.FLUENT)}
              </option>
              <option value={LanguageProficiencyLevel.NATIVE}>
                {t(LanguageProficiencyLevel.NATIVE)}
              </option>
            </select>
          </div>
        </motion.div>
      ))}
      <button
        className='w-full border-2 rounded-md p-1 focus:border-slate-400'
        onClick={() => {
          setLanguages([
            ...languages,
            { name: '', proficiency: LanguageProficiencyLevel.BEGINNER },
          ]);
        }}
      >
        {t('addLanguage')}
      </button>
    </div>
  );
};
