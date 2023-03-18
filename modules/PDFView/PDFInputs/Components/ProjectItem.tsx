import { Operations } from '@/store/reducers/pdfData';
import { DeleteButton } from '@modules/PDFView/PDFInputs/Components/DeleteButton';
import { ReorderButton } from '@modules/PDFView/PDFInputs/Components/ReorderButton';
import { Project } from '@modules/PDFView/models';
import { ReorderContext, useAnimation } from '@modules/Shared/Hooks';
import { DateInput } from '@modules/Shared/Inputs/DateInput';
import { TextInput } from '@modules/Shared/Inputs/TextInput';
import { ToggleInput } from '@modules/Shared/Inputs/ToggleInput';
import {
  AnimatePresence,
  Reorder,
  motion,
  useDragControls,
  useMotionValue,
} from 'framer-motion';
import { TFunction } from 'next-i18next';
import { FC, useContext } from 'react';

type Props = {
  animation: ReturnType<typeof useAnimation>;
  setProjects: (
    operation: Operations,
    data?: Partial<Project> | Partial<Project>[],
    index?: number
  ) => void;
  project: Project;
  index: number;
  t: TFunction;
};

const arrayOfInputs: Array<{
  inputName: string;
  inputValue: keyof Project;
  type: 'text' | 'date' | 'email' | 'tel' | 'number' | 'password' | 'toggle';
  textarea?: boolean;
}> = [
  { inputName: 'name', inputValue: 'name', type: 'text' },
  { inputName: 'startDate', inputValue: 'startDate', type: 'date' },
  { inputName: 'endDate', inputValue: 'endDate', type: 'date' },
  {
    inputName: 'currentlyWorking',
    inputValue: 'currentlyWorking',
    type: 'toggle',
  },
  { inputName: 'owner', inputValue: 'owner', type: 'text' },
  { inputName: 'url', inputValue: 'url', type: 'text' },
  {
    inputName: 'description',
    inputValue: 'description',
    type: 'text',
    textarea: true,
  },
];

export const ProjectItem: FC<Props> = ({
  animation: { combinedStyleFinal, combinedStyleInitial },
  setProjects,
  project,
  index,
  t,
}) => {
  const y = useMotionValue(0);
  const controls = useDragControls();
  const { setIsDragging, isDragging, stopReorder } = useContext(ReorderContext);

  const animation = {
    initial: combinedStyleInitial,
    animate: combinedStyleFinal,
    exit: combinedStyleInitial,
  };

  return (
    <Reorder.Item
      value={project}
      style={{
        y,
        position: 'relative',
      }}
      onDragEnd={() => {
        setIsDragging(false);
      }}
      className='mt-4 select-none rounded-md transition-colors first:mt-0 hover:bg-green-100'
      dragListener={false}
      dragControls={controls}
    >
      <ReorderButton
        controls={controls}
        setIsDragging={value => {
          setIsDragging(value);
          if (value) stopReorder();
        }}
      />
      <DeleteButton
        positionTop={8}
        positionRight={20}
        onClick={() => {
          setProjects(Operations.REMOVE, project, index);
        }}
      />
      <motion.div
        {...animation}
        animate={{
          ...combinedStyleFinal,
          transition: {
            delay: isDragging ? 0.2 : 0,
          },
        }}
        transition={{ duration: 0.2, when: 'beforeChildren' }}
        className='relative flex flex-col gap-4 p-10 '
      >
        <AnimatePresence>
          {isDragging && (
            <motion.div
              initial={combinedStyleInitial}
              animate={{
                ...combinedStyleFinal,
                transition: {
                  duration: 0.2,
                  delay: (arrayOfInputs.length - 1) * 0.05,
                },
              }}
              exit={{
                ...combinedStyleInitial,
                transition: {
                  duration: 0.05,
                },
              }}
            >
              {project.name}
            </motion.div>
          )}
        </AnimatePresence>

        {!isDragging && (
          <motion.div className='flex flex-col gap-4'>
            {arrayOfInputs.map((input, currentIndex) => (
              <motion.div
                key={`professionalExperience-${index}-${currentIndex}-input`}
                {...animation}
                transition={{
                  duration: 0.2,
                  delay: currentIndex * 0.05,
                }}
              >
                {input.type !== 'date' && input.type !== 'toggle' && (
                  <TextInput
                    label={t(`${input.inputValue}`).toString()}
                    defaultValue={project[input.inputValue] as string}
                    name={input.inputValue}
                    onChange={e => {
                      setProjects(
                        Operations.UPDATE,
                        {
                          [input.inputValue]: e.target.value,
                        },
                        index
                      );
                    }}
                    fullWidth
                    textarea={input.textarea}
                  />
                )}
                {input.type === 'date' && (
                  <DateInput
                    type='month'
                    disabled={
                      project.currentlyWorking && input.inputValue === 'endDate'
                    }
                    label={t(`${input.inputValue}`).toString()}
                    value={project[input.inputValue] as string}
                    setData={date => {
                      setProjects(
                        Operations.UPDATE,
                        {
                          [input.inputValue]: date,
                        },
                        index
                      );
                    }}
                    resetData={() => {
                      setProjects(
                        Operations.UPDATE,
                        {
                          [input.inputValue]: '',
                        },
                        index
                      );
                    }}
                    format={{
                      month: 'short',
                      year: 'numeric',
                    }}
                  />
                )}
                {input.type === 'toggle' && (
                  <ToggleInput
                    label={t(`${input.inputValue}`).toString()}
                    name={input.inputValue}
                    checked={project.currentlyWorking}
                    wrapperClassName='mt-4'
                    onChange={e => {
                      setProjects(
                        Operations.UPDATE,
                        {
                          [input.inputValue]: e.target.checked,
                        },
                        index
                      );
                    }}
                    fullWidth
                  />
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </Reorder.Item>
  );
};
