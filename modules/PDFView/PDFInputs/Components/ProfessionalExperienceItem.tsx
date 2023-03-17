import { Operations } from '@/store/reducers/pdfData';
import { DeleteButton } from '@modules/PDFView/PDFInputs/Components/DeleteButton';
import { ReorderButton } from '@modules/PDFView/PDFInputs/Components/ReorderButton';
import { ProfessionalExperience } from '@modules/PDFView/models';
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
  setProfessionalExperience: (
    operation: Operations,
    data?: Partial<ProfessionalExperience> | Partial<ProfessionalExperience>[],
    index?: number
  ) => void;
  experience: ProfessionalExperience;
  index: number;
  t: TFunction;
};

const arrayOfProfessionalExperienceInputs: Array<{
  inputName: string;
  inputValue: keyof ProfessionalExperience;
  type: string;
  textarea?: boolean;
}> = [
  { inputName: 'Company', inputValue: 'company', type: 'text' },
  { inputName: 'Position', inputValue: 'position', type: 'text' },
  { inputName: 'Location', inputValue: 'location', type: 'text' },
  { inputName: 'Start date', inputValue: 'startDate', type: 'date' },
  { inputName: 'End date', inputValue: 'endDate', type: 'date' },
  { inputName: 'Present', inputValue: 'currentlyEnrolled', type: 'toggle' },
  {
    inputName: 'Description',
    inputValue: 'description',
    type: 'text',
    textarea: true,
  },
];

export const ProfessionalExperienceItem: FC<Props> = ({
  animation: { combinedStyleFinal, combinedStyleInitial },
  setProfessionalExperience,
  experience,
  index,
  t,
}) => {
  const { setIsDragging, isDragging, stopReorder } = useContext(ReorderContext);
  const y = useMotionValue(0);
  const controls = useDragControls();

  return (
    <Reorder.Item
      key={experience.id}
      value={experience}
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
          setProfessionalExperience(Operations.REMOVE, experience, index);
        }}
      />
      <motion.div
        key={`professionalExperience-${index}`}
        initial={combinedStyleInitial}
        animate={combinedStyleFinal}
        exit={combinedStyleInitial}
        transition={{ duration: 0.2, when: 'beforeChildren' }}
        className='relative gap-4 p-10'
      >
        <AnimatePresence>
          <AnimatePresence>
            {isDragging && (
              <motion.div
                className='gap-4'
                initial={{
                  height: 0,
                  opacity: 0,
                  display: 'none',
                }}
                animate={{
                  opacity: 1,
                  display: 'flex',
                  transition: {
                    delay: 0.2,
                    duration: 0.05,
                  },
                }}
                exit={{
                  opacity: 0,
                  display: 'none',
                }}
              >
                {experience.company}
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {!isDragging && (
              <div className='flex flex-col gap-4'>
                {arrayOfProfessionalExperienceInputs.map(
                  (input, currentIndex) => (
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
                      {input.type === 'date' ? (
                        <DateInput
                          type='month'
                          disabled={
                            experience.currentlyEnrolled &&
                            input.inputValue === 'endDate'
                          }
                          label={t(`${input.inputValue}`).toString()}
                          value={experience[input.inputValue] as string}
                          setData={date => {
                            setProfessionalExperience(
                              Operations.UPDATE,
                              {
                                [input.inputValue]: date,
                              },
                              index
                            );
                          }}
                          resetData={() => {
                            setProfessionalExperience(
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
                      ) : (
                        input.type !== 'toggle' && (
                          <TextInput
                            label={t(`${input.inputValue}`).toString()}
                            defaultValue={
                              experience[input.inputValue] as string
                            }
                            name={input.inputValue}
                            onChange={e => {
                              setProfessionalExperience(
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
                        )
                      )}
                      {input.type === 'toggle' && (
                        <ToggleInput
                          label={t(`${input.inputValue}`).toString()}
                          name={input.inputValue}
                          checked={experience.currentlyEnrolled}
                          wrapperClassName='mt-4'
                          onChange={e => {
                            setProfessionalExperience(
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
                  )
                )}
              </div>
            )}
          </AnimatePresence>
        </AnimatePresence>
      </motion.div>
    </Reorder.Item>
  );
};
