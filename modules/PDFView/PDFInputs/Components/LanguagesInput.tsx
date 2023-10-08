import { Operations } from '@/store/reducers/pdfData';
import { AddNewButton } from '@modules/PDFView/PDFInputs/Components/AddNewButton';
import { LanguagesItem } from '@modules/PDFView/PDFInputs/Components/LanguagesItem';
import { LanguageProficiencyLevel } from '@modules/PDFView/models';
import { ReorderProvider, useReorderProvider } from '@modules/Shared/Hooks';
import { useAnimation } from '@modules/Shared/Hooks/useAnimation';
import { usePDFData } from '@modules/Shared/Hooks/usePDFData';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export const LanguagesInput = () => {
  const t = useTranslations('LanguagesInput');
  const { languages, setLanguages } = usePDFData();
  const animation = useAnimation({
    amountY: 10,
  });
  const reorderContextValue = useReorderProvider({
    items: languages,
    setFunction: setLanguages,
  });

  const { isDragging, reorderList } = reorderContextValue;
  const { combinedStyleFinal, combinedStyleInitial } = animation;

  return (
    <motion.div
      className='relative'
      initial={combinedStyleInitial}
      animate={combinedStyleFinal}
      exit={combinedStyleInitial}
      transition={{ duration: 0.1 }}
    >
      <ReorderProvider reorderContextValue={reorderContextValue}>
        {reorderList?.map((language, index) => (
          <LanguagesItem
            animation={animation}
            index={index}
            language={language}
            setLanguages={setLanguages}
            t={t}
            key={language.id || `no-id-provided-${language.name}`}
          />
        ))}
      </ReorderProvider>
      <AddNewButton
        hidden={isDragging}
        onClick={() => {
          setLanguages(Operations.ADD, {
            name: '',
            proficiency: LanguageProficiencyLevel.BEGINNER,
            id: window.crypto.getRandomValues(new Uint32Array(1))[0].toString()
          });
        }}
        title={t('addLanguage')}
      />
    </motion.div>
  );
};
