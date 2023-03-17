import { Operations } from '@/store/reducers/pdfData';
import { ReorderButton } from '@modules/PDFView/PDFInputs/Components/ReorderButton';
import { Education } from '@modules/PDFView/models';
import { ReorderContext } from '@modules/Shared/Hooks';
import { useAnimation } from '@modules/Shared/Hooks/useAnimation';
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
import { useCallback, useContext, useState } from 'react';
import { DeleteButton } from './DeleteButton';

interface Props {
  education: Education;
  index: number;
  animation: ReturnType<typeof useAnimation>;
  setEducation: (
    operation: Operations,
    data?: Partial<Education> | Partial<Education>[],
    index?: number
  ) => void;
  t: TFunction;
}

const arrayOfEducationInputs: Array<{
  inputName: string;
  inputValue: keyof Education;
  type: string;
}> = [
  { inputName: 'school', inputValue: 'school', type: 'text' },
  { inputName: 'location', inputValue: 'location', type: 'text' },
  { inputName: 'degree', inputValue: 'degree', type: 'text' },
  { inputName: 'fieldOfStudy', inputValue: 'fieldOfStudy', type: 'text' },
  { inputName: 'startDate', inputValue: 'startDate', type: 'date' },
  { inputName: 'endDate', inputValue: 'endDate', type: 'date' },
  {
    inputName: 'currentlyEnrolled',
    inputValue: 'currentlyEnrolled',
    type: 'toggle',
  },
];

const arrayOfCourseInputs: Array<{
  inputName: keyof Education;
  inputValue: keyof Education;
  type: string;
}> = [
  { inputName: 'course', inputValue: 'course', type: 'text' },
  { inputName: 'url', inputValue: 'url', type: 'text' },
  { inputName: 'location', inputValue: 'location', type: 'text' },
  { inputName: 'startDate', inputValue: 'startDate', type: 'date' },
  { inputName: 'endDate', inputValue: 'endDate', type: 'date' },
  {
    inputName: 'currentlyEnrolled',
    inputValue: 'currentlyEnrolled',
    type: 'toggle',
  },
];

export const EducationItem = ({
  education,
  index,
  animation: { combinedStyleFinal, combinedStyleInitial },
  setEducation,
  t,
}: Props) => {
  const y = useMotionValue(0);
  const controls = useDragControls();
  const { setIsDragging, isDragging, stopReorder } = useContext(ReorderContext);
  const [selectedEducation, setSelectedEducation] = useState<
    'school' | 'course'
  >(education.course ? 'course' : 'school');
  const [reorderComponentHeight, setReorderComponentHeight] = useState(0);

  const animation = {
    initial: combinedStyleInitial,
    animate: combinedStyleFinal,
    exit: combinedStyleInitial,
  };

  const getEducationInputs = useCallback(() => {
    if (selectedEducation === 'course') {
      return arrayOfCourseInputs;
    }
    return arrayOfEducationInputs;
  }, [selectedEducation]);

  const handleSelectedEducation = (value: string) => {
    setEducation(
      Operations.UPDATE,
      {
        ...education,
        course: value === 'course' ? '' : undefined,
        school: value === 'school' ? '' : undefined,
      },
      index
    );
    if (value === 'school') {
      return setSelectedEducation('school');
    }
    return setSelectedEducation('course');
  };

  const handleSetData = useCallback(
    (value: string | boolean, inputName: string) => {
      setEducation(
        Operations.UPDATE,
        {
          [inputName]: value,
        },
        index
      );
    },
    [index]
  );

  return (
    <Reorder.Item
      key={education.id}
      value={education}
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
          setEducation(Operations.REMOVE, undefined, index);
        }}
      />
      <motion.div
        key={`EducationInput-${index}`}
        {...animation}
        animate={{
          ...combinedStyleFinal,
          height: isDragging ? reorderComponentHeight + 80 : 'auto',
          transition: {
            delay: isDragging ? 0.2 : 0,
          },
        }}
        transition={{ duration: 0.2 }}
        className='relative p-10'
      >
        <AnimatePresence>
          {isDragging && (
            <motion.div
              className='gap-4'
              initial={combinedStyleInitial}
              animate={{
                ...combinedStyleFinal,
                transition: {
                  duration: 0.2,
                  delay: (getEducationInputs().length - 1) * 0.05,
                },
              }}
              exit={{
                ...combinedStyleInitial,
                transition: {
                  duration: 0.05,
                },
              }}
              ref={ref => {
                setReorderComponentHeight(ref?.clientHeight || 0);
              }}
            >
              {education.course || education.school}
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {!isDragging && (
            <motion.div
              {...animation}
              transition={{ duration: 0.2, when: 'beforeChildren' }}
              className='flex flex-col gap-4'
            >
              <div className='flex flex-row gap-4'>
                <button
                  onClick={() => handleSelectedEducation('school')}
                  className={`${
                    selectedEducation === 'school'
                      ? 'bg-green-500 text-white'
                      : 'bg-white text-green-500'
                  } rounded-md p-2`}
                >
                  {t('school')}
                </button>
                <button
                  onClick={() => handleSelectedEducation('course')}
                  className={`${
                    selectedEducation === 'course'
                      ? 'bg-green-500 text-white'
                      : 'bg-white text-green-500'
                  } rounded-md p-2`}
                >
                  {t('course')}
                </button>
              </div>
              {getEducationInputs().map((input, currentIndex) => (
                <div key={`input-${index}-${currentIndex}`}>
                  {input.type === 'date' ? (
                    <DateInput
                      type='month'
                      disabled={
                        education.currentlyEnrolled &&
                        input.inputValue === 'endDate'
                      }
                      label={t(`${input.inputValue}`).toString()}
                      value={education[input.inputValue] as string}
                      setData={date => handleSetData(date, input.inputValue)}
                      resetData={() => handleSetData('', input.inputValue)}
                      format={{
                        month: 'short',
                        year: 'numeric',
                      }}
                    />
                  ) : (
                    input.type !== 'toggle' && (
                      <TextInput
                        label={t(`${input.inputName}`).toString()}
                        defaultValue={education[input.inputValue] as string}
                        name={input.inputName}
                        onChange={e =>
                          handleSetData(e.target.value, input.inputValue)
                        }
                        fullWidth
                      />
                    )
                  )}
                  {input.type === 'toggle' && (
                    <ToggleInput
                      label={t('present').toString()}
                      name={input.inputName}
                      checked={education.currentlyEnrolled}
                      wrapperClassName='mt-4'
                      onChange={e =>
                        handleSetData(e.target.checked, input.inputValue)
                      }
                      fullWidth
                    />
                  )}
                </div>
              ))}
              <TextInput
                key={`${index}-${getEducationInputs().length - 1}-input`}
                label={t('description').toString()}
                defaultValue={education.description}
                name='education-description'
                onChange={e => {
                  setEducation(
                    Operations.UPDATE,
                    {
                      description: e.target.value,
                    },
                    index
                  );
                }}
                fullWidth
                textarea
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Reorder.Item>
  );
};
