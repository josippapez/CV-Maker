import { Operations } from '@/store/reducers/pdfData';
import { AddNewButton } from '@modules/PDFView/PDFInputs/Components/AddNewButton';
import { ProfessionalExperienceItem } from '@modules/PDFView/PDFInputs/Components/ProfessionalExperienceItem';
import { ReorderProvider, useReorderProvider } from '@modules/Shared/Hooks';
import { useAnimation } from '@modules/Shared/Hooks/useAnimation';
import { usePDFData } from '@modules/Shared/Hooks/usePDFData';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';

export const ProfessionalExperienceInput = () => {
  const { setProfessionalExperience, professionalExperience } = usePDFData();
  const { t } = useTranslation('ProfessionalExperienceInput');
  const animation = useAnimation({
    amountY: 10,
  });
  const reorderContextValue = useReorderProvider({
    items: professionalExperience,
    setFunction: setProfessionalExperience,
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
        {reorderList?.map((experience, index) => (
          <ProfessionalExperienceItem
            animation={animation}
            index={index}
            experience={experience}
            setProfessionalExperience={setProfessionalExperience}
            t={t}
            key={experience.id || `no-id-provided-${experience.company}`}
          />
        ))}
      </ReorderProvider>
      <AddNewButton
        hidden={isDragging}
        onClick={() => {
          setProfessionalExperience(Operations.ADD, {
            company: '',
            position: '',
            startDate: '',
            endDate: '',
            description: '',
            location: '',
            currentlyEnrolled: false,
            id: crypto.randomUUID(),
          });
        }}
        title={t('addExperience')}
      />
    </motion.div>
  );
};
