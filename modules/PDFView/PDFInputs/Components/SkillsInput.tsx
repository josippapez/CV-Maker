import { useAnimation, usePDFData } from '@/Hooks';
import { TextInput } from '@modules/Shared';
import { Operations } from '@/store/reducers/pdfData';
import { AddNewButton, SkillsList } from '@modules/PDFView/PDFInputs';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

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
                id: crypto.randomUUID(),
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
              id: crypto.randomUUID(),
            });
            setSkill('');
          }
        }}
        title={t('addSkills')}
      />
    </motion.div>
  );
};
