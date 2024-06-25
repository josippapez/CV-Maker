import { usePDFData } from '@modules/Shared/Hooks/usePDFData';
import { TemplateName } from '@/store/reducers/template';
import style from './TemplatesModal.module.scss';
import { useTranslations } from 'next-intl';

type Props = {
  closeModal(): void;
};

export const Carousel = (props: Props) => {
  const t = useTranslations('Templates');
  const { closeModal } = props;
  const { setActiveTemplate } = usePDFData();
  return (
    <div className='h-full pt-5 mt-3 flex flex-wrap overflow-auto justify-center'>
      {Object.entries(TemplateName).map(value => {
        const templateName = value[1];
        return (
          <div
            key={templateName}
            className={`${style.template} ${
              style[value[0]]
            } cursor-pointer h-fit rounded-md transition-all hover:ring-2 hover:ring-blue-400`}
            onClick={() => {
              setActiveTemplate(value[1]);
              closeModal();
            }}
          >
            <div className={`${style.templateImage} ${style[value[0]]}`} />
            <div className={`${style.templateName} text-white`}>
              {/* {t(templateName)} */}
              {templateName}
            </div>
          </div>
        );
      })}
    </div>
  );
};
