import { Operations } from '@/store/reducers/pdfData';
import { AddNewButton } from '@modules/PDFView/PDFInputs/Components/AddNewButton';
import { ProjectItem } from '@modules/PDFView/PDFInputs/Components/ProjectItem';
import { useAnimation } from '@modules/Shared/Hooks/useAnimation';
import { usePDFData } from '@modules/Shared/Hooks/usePDFData';
import {
  ReorderProvider,
  useReorderProvider,
} from '@modules/Shared/Hooks/useReorderProvider';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export const ProjectsInput = () => {
  const t = useTranslations('ProjectsInput');
  const { projects, setProjects } = usePDFData();
  const animation = useAnimation({
    amountY: 10,
  });
  const reorderContextValue = useReorderProvider({
    items: projects,
    setFunction: setProjects,
  });

  const { isDragging, reorderList } = reorderContextValue;
  const { combinedStyleFinal, combinedStyleInitial } = animation;

  return (
    <motion.div
      className='relative'
      initial={combinedStyleInitial}
      animate={combinedStyleFinal}
      exit={combinedStyleInitial}
      transition={{ duration: 0.1 }}
    >
      <ReorderProvider reorderContextValue={reorderContextValue}>
        {reorderList?.map((project, index) => (
          <ProjectItem
            key={
              project.id ||
              `no-id-provided-${project.name || project.owner || project.startDate}`
            }
            animation={animation}
            index={index}
            project={project}
            setProjects={setProjects}
            t={t}
          />
        ))}
      </ReorderProvider>
      <AddNewButton
        hidden={isDragging}
        onClick={() => {
          setProjects(Operations.ADD, {
            name: '',
            startDate: '',
            endDate: '',
            currentlyWorking: false,
            owner: '',
            url: '',
            id: window.crypto.getRandomValues(new Uint32Array(1))[0].toString()
          });
        }}
        title={t('addProject')}
      />
    </motion.div>
  );
};
