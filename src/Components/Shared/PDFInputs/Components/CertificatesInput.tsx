import { motion } from 'framer-motion';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import useAnimation from '../../../../Hooks/useAnimation';
import { Certificate } from '../../../PDFView/models';
import { PDFViewContext } from '../../../PDFView/PDFViewProvider';
import TextInput from '../../Inputs/TextInput';
import { AddNewButton } from './AddNewButton';
import { DeleteButton } from './DeleteButton';

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
  const { setCertificates, certificates } = useContext(PDFViewContext);
  const { t } = useTranslation('CertificatesInput');
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
      {certificates.map((certificate, index) => (
        <motion.div
          key={index + '-' + 'CertificatesInput'}
          initial={combinedStyleInitial}
          animate={combinedStyleFinal}
          exit={combinedStyleInitial}
          transition={{ duration: 0.2 }}
          className='flex flex-col gap-4 p-10 relative focus-within:bg-green-100 rounded-md first:mt-0 mt-4 transition-all'
        >
          <DeleteButton
            onClick={() => {
              setCertificates(
                certificates.filter((certificate, i) => i !== index)
              );
            }}
          />
          {arrayOfCertificatesInputs.map((input, currentIndex) => (
            <TextInput
              key={index + '-' + 'CertificatesInput' + '-' + currentIndex}
              label={t(`${input.inputValue}`)}
              value={certificate[input.inputValue]}
              name={input.inputValue}
              onChange={e => {
                setCertificates(
                  certificates.map((certificate, i) => {
                    if (i === index) {
                      return {
                        ...certificate,
                        [input.inputValue]: e.target.value,
                      };
                    }
                    return certificate;
                  })
                );
              }}
              fullWidth
            />
          ))}
          <TextInput
            key={
              index +
              '-' +
              'CertificatesInput' +
              '-' +
              (arrayOfCertificatesInputs.length - 1)
            }
            label={t('description')}
            value={certificate.description}
            name='certificate-description'
            onChange={e => {
              setCertificates(
                certificates.map((certificate, i) => {
                  if (i === index) {
                    return {
                      ...certificate,
                      description: e.target.value,
                    };
                  }
                  return certificate;
                })
              );
            }}
            fullWidth
            textarea
          />
        </motion.div>
      ))}
      <AddNewButton
        onClick={() => {
          setCertificates([
            ...certificates,
            {
              institution: '',
              name: '',
              description: '',
              date: '',
            },
          ]);
        }}
        title={t('addCertification')}
      />
    </motion.div>
  );
};
