import { Operations } from '@/store/reducers/pdfData';
import { DeleteButton } from '@modules/PDFView/PDFInputs/Components/DeleteButton';
import { ReorderButton } from '@modules/PDFView/PDFInputs/Components/ReorderButton';
import { Certificate } from '@modules/PDFView/models';
import { ReorderContext, useAnimation } from '@modules/Shared/Hooks';
import { DateInput } from '@modules/Shared/Inputs/DateInput';
import { TextInput } from '@modules/Shared/Inputs/TextInput';
import {
  AnimatePresence,
  Reorder,
  motion,
  useDragControls,
  useMotionValue,
} from 'framer-motion';
import { TFunction } from 'next-i18next';
import { FC, useCallback, useContext } from 'react';

type Props = {
  animation: ReturnType<typeof useAnimation>;
  setCertificates: (
    operation: Operations,
    data?: Partial<Certificate> | Partial<Certificate>[],
    index?: number
  ) => void;
  certificate: Certificate;
  index: number;
  t: TFunction;
};

const arrayOfCertificatesInputs: Array<{
  inputName: string;
  inputValue: keyof Certificate;
  type: string;
}> = [
  { inputName: 'Name', inputValue: 'name', type: 'text' },
  { inputName: 'Date', inputValue: 'date', type: 'date' },
  { inputName: 'Institution', inputValue: 'institution', type: 'text' },
];

export const CertificateItem: FC<Props> = ({
  animation: { combinedStyleFinal, combinedStyleInitial },
  setCertificates,
  certificate,
  index,
  t,
}) => {
  const { setIsDragging, isDragging, stopReorder } = useContext(ReorderContext);
  const y = useMotionValue(0);
  const controls = useDragControls();

  const handleSaveData = useCallback(
    (value: string, index: number, inputName: string) => {
      setCertificates(
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
      key={certificate.id}
      value={certificate}
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
          setCertificates(Operations.REMOVE, certificate, index);
        }}
      />
      <motion.div
        initial={combinedStyleInitial}
        animate={combinedStyleFinal}
        exit={combinedStyleInitial}
        transition={{
          duration: 0.2,
          delay: isDragging ? 0.2 : 0,
          when: 'beforeChildren',
        }}
        className='relative flex flex-col gap-4 p-10 '
      >
        {isDragging && (
          <motion.div
            initial={{
              height: 50,
              opacity: 0,
            }}
            animate={{
              height: 50,
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{ duration: 0.05 }}
          >
            {certificate.name}
          </motion.div>
        )}
        <AnimatePresence>
          {!isDragging && (
            <>
              {arrayOfCertificatesInputs.map((input, currentIndex) => (
                <motion.div
                  key={`certificates-${index}-${currentIndex}-input`}
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
                      label={t(`${input.inputValue}`).toString()}
                      value={certificate[input.inputValue] as string}
                      setData={date =>
                        handleSaveData(date, index, input.inputValue)
                      }
                      resetData={() =>
                        handleSaveData('', index, input.inputValue)
                      }
                      format={{
                        month: 'short',
                        year: 'numeric',
                      }}
                    />
                  ) : (
                    <TextInput
                      key={
                        index + '-' + 'CertificatesInput' + '-' + currentIndex
                      }
                      label={t(`${input.inputValue}`).toString()}
                      defaultValue={certificate[input.inputValue]}
                      name={input.inputValue}
                      onChange={e =>
                        handleSaveData(e.target.value, index, input.inputValue)
                      }
                      fullWidth
                    />
                  )}
                </motion.div>
              ))}
              <motion.div
                key={
                  index +
                  '-' +
                  'CertificatesInput' +
                  '-' +
                  (arrayOfCertificatesInputs.length - 1)
                }
                initial={combinedStyleInitial}
                animate={combinedStyleFinal}
                exit={combinedStyleInitial}
                transition={{
                  duration: 0.2,
                  delay: arrayOfCertificatesInputs.length - 1 * 0.05,
                }}
              >
                <TextInput
                  label={t('description').toString()}
                  defaultValue={certificate.description}
                  name='certificate-description'
                  onChange={e =>
                    handleSaveData(e.target.value, index, 'description')
                  }
                  fullWidth
                  textarea
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </Reorder.Item>
  );
};
