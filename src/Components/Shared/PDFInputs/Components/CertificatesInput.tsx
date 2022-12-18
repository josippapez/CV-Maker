import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import useAnimation from '../../../../Hooks/useAnimation';
import { ReactComponent as DeleteIcon } from '../../../../Styles/Assets/Images/deleteIcon.svg';
import { Certificate } from '../../../PDFView/models';
import TextInput from '../../Inputs/TextInput';

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
          className='flex flex-col gap-4 p-4 relative focus-within:bg-slate-200 rounded-md border border-gray-400 first:mt-0 mt-4'
        >
          <button
            className='absolute top-0 right-0'
            onClick={() => {
              setCertificates(
                certificates.filter((certificate, i) => i !== index)
              );
            }}
          >
            <DeleteIcon
              className='hover:stroke-red-600'
              width={30}
              height={30}
            />
          </button>
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
      <button
        className='w-full border-2 rounded-md p-1 focus:border-slate-400'
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
      >
        {t('addCertification')}
      </button>
    </div>
  );
};
