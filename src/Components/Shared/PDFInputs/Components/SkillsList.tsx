import { AnimatePresence, motion } from 'framer-motion';
import { useContext } from 'react';
import { PDFViewContext } from '../../../PDFView/PDFViewProvider';

export const SkillsList = () => {
  const { skills, setSkills } = useContext(PDFViewContext);

  const removeSelf = (index: number) => {
    const newSkills = [...skills];
    newSkills.splice(index, 1);
    setSkills(newSkills);
  };

  return (
    <div className='flex flex-wrap mb-4'>
      <AnimatePresence>
        {skills.map((skill, index) => (
          <motion.div
            key={skill.id}
            className={`bg-green-500 text-white rounded-md mr-2 mb-2 p-3`}
            initial='hidden'
            animate='visible'
            exit='exit'
            variants={{
              hidden: { scale: 0.8, opacity: 0 },
              visible: { scale: 1, opacity: 1 },
              exit: { y: 10, opacity: 0 },
            }}
            transition={{ duration: 0.2 }}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05, cursor: 'pointer' }}
            onClick={() => {
              removeSelf(index);
            }}
          >
            {skill.name}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
