import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import useAnimation from '../../../../Hooks/useAnimation';
import { Certificate } from '../../../PDFView/models';
import TextInput from '../../Inputs/TextInput';
import { AddNewButton } from './AddNewButton';
import { DeleteButton } from './DeleteButton';

interface Props {
  selectedTab: boolean;
  setCertificates: (certificates: Certificate[]) => void;
  certificates: Certificate[];
}

const arrayOfCertificatesInputs: Array<{
  inputName: string;
  inputValue: keyof Certificate;
  type: string;
}> = [
  { inputName: 'Name', inputValue: 'name', type: 'text' },
  { inputName: 'Date', inputValue: 'date', type: 'date' },
  { inputName: 'Institution', inputValue: 'institution', type: 'text' },
];

export const CertificatesInput = (props: Props) => {
  const { t } = useTranslation();
  const { combinedStyleFinal, combinedStyleInitial } = useAnimation({
    amountY: 10,
  });
  const { selectedTab, setCertificates, certificates } = props;
  return (
    <div hidden={!selectedTab}>
      {certificates.map((certificate, index) => (
        <motion.div
          key={index + '-' + 'CertificatesInput'}
          initial={combinedStyleInitial}
          animate={selectedTab ? combinedStyleFinal : combinedStyleInitial}
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
    </div>
  );
};
