import { Operations } from '@/store/reducers/pdfData';
import { AddNewButton } from '@modules/PDFView/PDFInputs/Components/AddNewButton';
import { DeleteButton } from '@modules/PDFView/PDFInputs/Components/DeleteButton';
import { Certificate } from '@modules/PDFView/models';
import { useAnimation } from '@modules/Shared/Hooks/useAnimation';
import { usePDFData } from '@modules/Shared/Hooks/usePDFData';
import { DateInput } from '@modules/Shared/Inputs/DateInput';
import { TextInput } from '@modules/Shared/Inputs/TextInput';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';

const arrayOfCertificatesInputs: Array<{
  inputName: string;
  inputValue: keyof Certificate;
  type: string;
}> = [
  { inputName: 'Name', inputValue: 'name', type: 'text' },
  { inputName: 'Date', inputValue: 'date', type: 'date' },
  { inputName: 'Institution', inputValue: 'institution', type: 'text' },
];

export const CertificatesInput = () => {
  const { setCertificates, certificates } = usePDFData();
  const { t } = useTranslation('CertificatesInput');
  const { combinedStyleFinal, combinedStyleInitial } = useAnimation({
    amountY: 10,
  });

  const handleSaveData = (value: string, index: number, inputName: string) => {
    setCertificates(
      Operations.UPDATE,
      {
        [inputName]: value,
      },
      index
    );
  };

  return (
    <motion.div
      initial={combinedStyleInitial}
      animate={combinedStyleFinal}
      exit={combinedStyleInitial}
      transition={{ duration: 0.1, when: 'beforeChildren' }}
    >
      {certificates.map((certificate, index) => (
        <motion.div
          key={index + '-' + 'CertificatesInput'}
          initial={combinedStyleInitial}
          animate={combinedStyleFinal}
          exit={combinedStyleInitial}
          transition={{ duration: 0.2 }}
          className='relative mt-4 flex flex-col gap-4 rounded-md p-10 transition-all first:mt-0 focus-within:bg-green-100'
        >
          <DeleteButton
            onClick={() => {
              setCertificates(Operations.REMOVE, undefined, index);
            }}
          />
          {arrayOfCertificatesInputs.map((input, currentIndex) => (
            <>
              {input.type === 'date' ? (
                <DateInput
                  type='month'
                  label={t(`${input.inputValue}`).toString()}
                  value={certificate[input.inputValue] as string}
                  setData={date =>
                    handleSaveData(date, index, input.inputValue)
                  }
                  resetData={() => handleSaveData('', index, input.inputValue)}
                  format={{
                    month: 'short',
                    year: 'numeric',
                  }}
                />
              ) : (
                <TextInput
                  key={index + '-' + 'CertificatesInput' + '-' + currentIndex}
                  label={t(`${input.inputValue}`).toString()}
                  defaultValue={certificate[input.inputValue]}
                  name={input.inputValue}
                  onChange={e =>
                    handleSaveData(e.target.value, index, input.inputValue)
                  }
                  fullWidth
                />
              )}
            </>
          ))}
          <TextInput
            key={
              index +
              '-' +
              'CertificatesInput' +
              '-' +
              (arrayOfCertificatesInputs.length - 1)
            }
            label={t('description').toString()}
            defaultValue={certificate.description}
            name='certificate-description'
            onChange={e => handleSaveData(e.target.value, index, 'description')}
            fullWidth
            textarea
          />
        </motion.div>
      ))}
      <AddNewButton
        onClick={() => {
          setCertificates(Operations.ADD, {
            name: '',
            date: '',
            institution: '',
            description: '',
          });
        }}
        title={t('addCertification')}
      />
    </motion.div>
  );
};
