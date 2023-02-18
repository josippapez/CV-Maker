import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import useAnimation from '../../../../Hooks/useAnimation';
import usePDFData from '../../../../Hooks/usePDFData';
import { LanguageProficiencyLevel } from '../../../PDFView/models';
import TextInput from '../../Inputs/TextInput';
import { AddNewButton } from './AddNewButton';
import { DeleteButton } from './DeleteButton';

export const LanguagesInput = () => {
  const { languages, setLanguages } = usePDFData();
  const { t } = useTranslation('LanguagesInput');
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
      {languages.map((language, index) => (
        <motion.div
          key={index + '-' + 'LanguagesInput'}
          initial={combinedStyleInitial}
          animate={combinedStyleFinal}
          exit={combinedStyleInitial}
          transition={{ duration: 0.2 }}
          className='relative mt-4 flex flex-col gap-4 rounded-md p-10 first:mt-0 focus-within:bg-green-100'
        >
          <DeleteButton
            onClick={() => {
              setLanguages(languages.filter((language, i) => i !== index));
            }}
          />
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
          <div className='mt-2 flex'>
            <label className='w-1/4 self-center font-medium'>
              {t('level')}
            </label>
            <select
              className='w-3/4 rounded-md border-2 p-1 focus:border-slate-400'
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
      <AddNewButton
        onClick={() => {
          setLanguages([
            ...languages,
            { name: '', proficiency: LanguageProficiencyLevel.BEGINNER },
          ]);
        }}
        title={t('addLanguage')}
      />
    </motion.div>
  );
};
