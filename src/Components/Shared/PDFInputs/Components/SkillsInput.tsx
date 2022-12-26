import { motion } from 'framer-motion';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useAnimation from '../../../../Hooks/useAnimation';
import { PDFViewContext } from '../../../PDFView/PDFViewProvider';
import TextInput from '../../Inputs/TextInput';
import { AddNewButton } from './AddNewButton';
import { SkillsList } from './SkillsList';

export const SkillsInput = () => {
  const { t } = useTranslation('SkillsInput');
  const { skills, setSkills } = useContext(PDFViewContext);
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
        label={t('skill')}
        value={skill}
        name='skill'
        onChange={e => {
          setSkill(e.target.value);
        }}
        onKeyPress={e => {
          if (e.key === 'Enter') {
            if (skill) {
              setSkills([
                ...skills,
                {
                  name: skill,
                  id: crypto.randomUUID(),
                },
              ]);
              setSkill('');
            }
          }
        }}
        fullWidth
      />
      <AddNewButton
        onClick={() => {
          if (skill) {
            setSkills([...skills, { name: skill, id: crypto.randomUUID() }]);
            setSkill('');
          }
        }}
        title={t('addSkills')}
      />
    </motion.div>
  );
};
