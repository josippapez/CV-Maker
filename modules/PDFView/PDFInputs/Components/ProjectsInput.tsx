import { Operations } from '@/store/reducers/pdfData';
import { AddNewButton } from '@modules/PDFView/PDFInputs/Components/AddNewButton';
import { DeleteButton } from '@modules/PDFView/PDFInputs/Components/DeleteButton';
import { Project } from '@modules/PDFView/models';
import { useAnimation } from '@modules/Shared/Hooks/useAnimation';
import { usePDFData } from '@modules/Shared/Hooks/usePDFData';
import { DateInput } from '@modules/Shared/Inputs/DateInput';
import { TextInput } from '@modules/Shared/Inputs/TextInput';
import { ToggleInput } from '@modules/Shared/Inputs/ToggleInput';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';

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

export const ProjectsInput = () => {
  const { projects, setProjects } = usePDFData();
  const { t } = useTranslation('ProjectsInput');
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
      {projects?.map((project, index) => (
        <motion.div
          key={`professionalExperience-${index}`}
          initial={combinedStyleInitial}
          animate={combinedStyleFinal}
          exit={combinedStyleInitial}
          transition={{ duration: 0.2, when: 'beforeChildren' }}
          className='relative mt-4 flex flex-col gap-4 rounded-md p-10 first:mt-0 focus-within:bg-green-100'
        >
          <DeleteButton
            onClick={() => {
              setProjects(Operations.REMOVE, project, index);
            }}
          />
          <AnimatePresence>
            {arrayOfInputs.map((input, currentIndex) => (
              <motion.div
                key={`professionalExperience-${index}-${currentIndex}-input`}
                initial={combinedStyleInitial}
                animate={combinedStyleFinal}
                exit={combinedStyleInitial}
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
                          ...project,
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
                          ...project,
                          [input.inputValue]: date,
                        },
                        index
                      );
                    }}
                    resetData={() => {
                      setProjects(
                        Operations.UPDATE,
                        {
                          ...project,
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
                          ...project,
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
          </AnimatePresence>
        </motion.div>
      ))}
      <AddNewButton
        onClick={() => {
          setProjects(Operations.ADD, {
            name: '',
            startDate: '',
            endDate: '',
            currentlyWorking: false,
            owner: '',
            url: '',
          });
        }}
        title={t('addProject')}
      />
    </motion.div>
  );
};
