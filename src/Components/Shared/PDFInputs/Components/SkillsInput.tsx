import { AnimatePresence, motion } from 'framer-motion';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PDFViewContext } from '../../../PDFView/PDFViewProvider';
import TextInput from '../../Inputs/TextInput';
import { AddNewButton } from './AddNewButton';
import { SkillsItem } from './SkillsItem';

interface Props {
  selectedTab: boolean;
}

export const SkillsInput = (props: Props) => {
  const { t } = useTranslation('SkillsInput');
  const { skills, setSkills } = useContext(PDFViewContext);
  const [skill, setSkill] = useState('');

  const { selectedTab } = props;

  return (
    <div hidden={!selectedTab}>
      <div className='flex flex-wrap mb-4'>
        <AnimatePresence>
          {skills.map((skill, index) => (
            <motion.div
              key={`SkillsInput-${index}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
            >
              <SkillsItem
                skill={skill}
                skills={skills}
                setSkills={setSkills}
                index={index}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
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
              setSkills([...skills, skill]);
              setSkill('');
            }
          }
        }}
        fullWidth
      />
      <AddNewButton
        onClick={() => {
          if (skill) {
            setSkills([...skills, skill]);
            setSkill('');
          }
        }}
        title={t('addSkills')}
      />
    </div>
  );
};
