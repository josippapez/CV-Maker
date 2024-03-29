import { Operations } from '@/store/reducers/pdfData';
import { AddNewButton } from '@modules/PDFView/PDFInputs/Components/AddNewButton';
import { EducationItem } from '@modules/PDFView/PDFInputs/Components/EducationItem';
import { ReorderProvider, useReorderProvider } from '@modules/Shared/Hooks';
import { useAnimation } from '@modules/Shared/Hooks/useAnimation';
import { usePDFData } from '@modules/Shared/Hooks/usePDFData';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export const EducationInput = () => {
  const { education, setEducation } = usePDFData();
  const t = useTranslations('EducationInput');
  const animation = useAnimation({
    amountY: 10,
  });
  const reorderContextValue = useReorderProvider({
    items: education,
    setFunction: setEducation,
  });

  const { isDragging, reorderList } = reorderContextValue;
  const { combinedStyleFinal, combinedStyleInitial } = animation;

  return (
    <motion.div
      initial={combinedStyleInitial}
      animate={combinedStyleFinal}
      exit={combinedStyleInitial}
      transition={{ duration: 0.1 }}
    >
      <ReorderProvider reorderContextValue={reorderContextValue}>
        {reorderList?.map((item, index) => (
          <EducationItem
            key={
              item.id ||
              `no-id-provided-${
                item.school ||
                item.degree ||
                item.fieldOfStudy ||
                item.location ||
                item.url
              }`
            }
            education={item}
            index={index}
            animation={animation}
            setEducation={setEducation}
            t={t}
          />
        ))}
      </ReorderProvider>
      <AddNewButton
        hidden={isDragging}
        onClick={() => {
          setEducation(Operations.ADD, {
            url: '',
            course: '',
            location: '',
            school: '',
            degree: '',
            fieldOfStudy: '',
            startDate: '',
            endDate: '',
            description: '',
            currentlyEnrolled: false,
            id: window.crypto.getRandomValues(new Uint32Array(1))[0].toString(),
          });
        }}
        title={t('addEducation')}
      />
    </motion.div>
  );
};
