import { AnimatePresence, motion } from 'framer-motion';
import usePDFData from '../../../../Hooks/usePDFData';

export const SkillsList = () => {
  const { skills, setSkills } = usePDFData();

  const removeSelf = (index: number) => {
    const newSkills = [...skills];
    newSkills.splice(index, 1);
    setSkills(newSkills);
  };

  return (
    <div className='mb-4 flex flex-wrap'>
      <AnimatePresence>
        {skills.map((skill, index) => (
          <motion.div
            key={skill.id}
            className={`mr-2 mb-2 rounded-md bg-green-500 p-3 text-white`}
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
