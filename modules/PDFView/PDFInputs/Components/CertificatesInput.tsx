import { Operations } from '@/store/reducers/pdfData';
import { AddNewButton } from '@modules/PDFView/PDFInputs/Components/AddNewButton';
import { CertificateItem } from '@modules/PDFView/PDFInputs/Components/CertificateItem';
import { ReorderProvider, useReorderProvider } from '@modules/Shared/Hooks';
import { useAnimation } from '@modules/Shared/Hooks/useAnimation';
import { usePDFData } from '@modules/Shared/Hooks/usePDFData';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export const CertificatesInput = () => {
  const { setCertificates, certificates } = usePDFData();
  const t = useTranslations('CertificatesInput');
  const animation = useAnimation({
    amountY: 10,
  });
  const reorderContextValue = useReorderProvider({
    items: certificates,
    setFunction: setCertificates,
  });

  const { isDragging, reorderList } = reorderContextValue;
  const { combinedStyleFinal, combinedStyleInitial } = animation;

  return (
    <motion.div
      className='relative'
      initial={combinedStyleInitial}
      animate={combinedStyleFinal}
      exit={combinedStyleInitial}
      transition={{ duration: 0.1 }}
    >
      <ReorderProvider reorderContextValue={reorderContextValue}>
        {reorderList?.map((certificate, index) => (
          <CertificateItem
            animation={animation}
            index={index}
            certificate={certificate}
            setCertificates={setCertificates}
            t={t}
            key={
              certificate.id ||
              `no-id-provided-${
                certificate.name || certificate.institution || certificate.date
              }`
            }
          />
        ))}
      </ReorderProvider>
      <AddNewButton
        hidden={isDragging}
        onClick={() => {
          setCertificates(Operations.ADD, {
            name: '',
            date: '',
            institution: '',
            description: '',
            id: window.crypto.getRandomValues(new Uint32Array(1))[0].toString(),
          });
        }}
        title={t('addCertification')}
      />
    </motion.div>
  );
};
