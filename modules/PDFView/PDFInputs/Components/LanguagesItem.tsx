import { Operations } from '@/store/reducers/pdfData';
import { DeleteButton } from '@modules/PDFView/PDFInputs/Components/DeleteButton';
import { ReorderButton } from '@modules/PDFView/PDFInputs/Components/ReorderButton';
import {
  LanguageProficiencyLevel,
  LanguageSkill,
} from '@modules/PDFView/models';
import { ReorderContext, useAnimation } from '@modules/Shared/Hooks';
import { TextInput } from '@modules/Shared/Inputs/TextInput';
import {
  Reorder,
  motion,
  useDragControls,
  useMotionValue,
} from 'framer-motion';
import { TFunction } from 'next-i18next';
import { FC, useContext } from 'react';

type Props = {
  animation: ReturnType<typeof useAnimation>;
  setLanguages: (
    operation: Operations,
    data?: Partial<LanguageSkill> | Partial<LanguageSkill>[],
    index?: number
  ) => void;
  language: LanguageSkill;
  index: number;
  t: TFunction;
};

export const LanguagesItem: FC<Props> = ({
  animation: { combinedStyleFinal, combinedStyleInitial },
  setLanguages,
  language,
  index,
  t,
}) => {
  const { setIsDragging, isDragging, stopReorder } = useContext(ReorderContext);
  const y = useMotionValue(0);
  const controls = useDragControls();

  return (
    <Reorder.Item
      tabIndex={index}
      key={language.id}
      value={language}
      style={{
        y,
        position: 'relative',
      }}
      onDragEnd={() => {
        setIsDragging(false);
      }}
      className='mt-4 select-none rounded-md transition-colors first:mt-0 hover:bg-green-100 dark:hover:bg-green-900'
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
          setLanguages(Operations.REMOVE, language, index);
        }}
      />

      {isDragging && (
        <motion.div
          className='gap-4 p-10'
          initial={combinedStyleInitial}
          animate={{
            ...combinedStyleFinal,
            transition: {
              duration: 0.2,
              delay: 0.05,
            },
          }}
          exit={{
            ...combinedStyleInitial,
            transition: {
              duration: 0.05,
            },
          }}
        >
          {language.name}
        </motion.div>
      )}

      {!isDragging && (
        <motion.div
          key={index + '-' + 'LanguagesInput'}
          initial={combinedStyleInitial}
          animate={combinedStyleFinal}
          exit={combinedStyleInitial}
          transition={{ duration: 0.2 }}
          className='relative flex flex-col gap-4 p-10'
        >
          <TextInput
            key={index + '-' + 'LanguagesInput' + '-' + t('language')}
            label={t('language').toString()}
            defaultValue={language.name}
            name='language'
            onChange={e => {
              setLanguages(
                Operations.UPDATE,
                {
                  name: e.target.value,
                },
                index
              );
            }}
            fullWidth
          />

          <div className='mt-2 flex'>
            <label className='w-1/4 self-center font-medium'>
              {t('level')}
            </label>
            <select
              className='w-3/4 rounded-md border-2 p-1 focus:border-slate-400'
              value={language.proficiency}
              onChange={e => {
                setLanguages(
                  Operations.UPDATE,
                  {
                    proficiency: e.target.value as LanguageProficiencyLevel,
                  },
                  index
                );
              }}
            >
              <option value={LanguageProficiencyLevel.BEGINNER}>
                {t(LanguageProficiencyLevel.BEGINNER)}
              </option>
              <option value={LanguageProficiencyLevel.CONVERSATIONAL}>
                {t(LanguageProficiencyLevel.CONVERSATIONAL)}
              </option>
              <option value={LanguageProficiencyLevel.FLUENT}>
                {t(LanguageProficiencyLevel.FLUENT)}
              </option>
              <option value={LanguageProficiencyLevel.NATIVE}>
                {t(LanguageProficiencyLevel.NATIVE)}
              </option>
            </select>
          </div>
        </motion.div>
      )}
    </Reorder.Item>
  );
};
