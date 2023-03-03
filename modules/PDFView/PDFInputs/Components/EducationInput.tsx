import { useAnimation, usePDFData } from '@/Hooks';
import { Operations } from '@/store/reducers/pdfData';
import { AddNewButton, EducationItem } from '@modules/PDFView/PDFInputs';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';

export const EducationInput = () => {
  const { education, setEducation } = usePDFData();
  const { t } = useTranslation('EducationInput');
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
      {education.map((item, index) => (
        <EducationItem
          key={`EducationInput-${index}`}
          education={item}
          index={index}
        />
      ))}
      <AddNewButton
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
          });
        }}
        title={t('addEducation')}
      />
    </motion.div>
  );
};
