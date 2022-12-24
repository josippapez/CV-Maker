import useAnimation from '../../../../Hooks/useAnimation';
import { motion } from 'framer-motion';
import { DeleteButton } from './DeleteButton';

interface Props {
  skills: string[];
  skill: string;
  index: number;
  setSkills: (skills: string[]) => void;
}

export const SkillsItem = (props: Props) => {
  const { combinedStyleFinal, combinedStyleInitial } = useAnimation({
    amountY: 10,
  });

  const { skills, setSkills, skill, index } = props;

  return (
    <motion.div
      initial={combinedStyleInitial}
      animate={combinedStyleFinal}
      transition={{ duration: 0.2 }}
      className='relative bg-green-500 text-white rounded-md mr-2 mb-2 p-3 w-fit'
    >
      <DeleteButton
        color='gray'
        colorHover='hover:stroke-gray-700'
        positionTop={-10}
        positionRight={-10}
        onClick={() => {
          setSkills(skills.filter((skill, i) => i !== index));
        }}
      />
      {skill}
    </motion.div>
  );
};
