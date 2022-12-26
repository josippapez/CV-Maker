import { motion } from 'framer-motion';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import useAnimation from '../../../../Hooks/useAnimation';
import { PDFViewContext } from '../../../PDFView/PDFViewProvider';
import { AddNewButton } from './AddNewButton';
import EducationItem from './EducationItem';

export const EducationInput = () => {
  const { education, setEducation } = useContext(PDFViewContext);
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
          educationList={education}
          setEducation={setEducation}
          index={index}
        />
      ))}
      <AddNewButton
        onClick={() => {
          setEducation([
            ...education,
            {
              url: '',
              course: '',
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
        title={t('addEducation')}
      />
    </motion.div>
  );
};
