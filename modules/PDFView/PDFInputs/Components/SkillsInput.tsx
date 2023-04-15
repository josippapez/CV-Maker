import { Operations } from '@/store/reducers/pdfData';
import { AddNewButton } from '@modules/PDFView/PDFInputs/Components/AddNewButton';
import { SkillsList } from '@modules/PDFView/PDFInputs/Components/SkillsList';
import { useAnimation } from '@modules/Shared/Hooks/useAnimation';
import { usePDFData } from '@modules/Shared/Hooks/usePDFData';
import { TextInput } from '@modules/Shared/Inputs/TextInput';
import { getRandomValues } from 'crypto';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import { useId, useState } from 'react';

export const SkillsInput = () => {
  const { t } = useTranslation('SkillsInput');
  const { setSkills } = usePDFData();
  const [skill, setSkill] = useState('');

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
      <SkillsList />
      <TextInput
        label={t('skill').toString()}
        value={skill}
        name='skill'
        onChange={e => {
          setSkill(e.target.value);
        }}
        onKeyPress={e => {
          if (e.key === 'Enter') {
            if (skill) {
              setSkills(Operations.ADD, {
                name: skill,
                id: window.crypto.getRandomValues(new Uint32Array(1))[0].toString(),
              });
              setSkill('');
            }
          }
        }}
        fullWidth
      />
      <AddNewButton
        onClick={() => {
          if (skill) {
            setSkills(Operations.ADD, {
              name: skill,
              id: window.crypto.getRandomValues(new Uint32Array(1))[0].toString(),
            });
            setSkill('');
          }
        }}
        title={t('addSkills')}
      />
    </motion.div>
  );
};
