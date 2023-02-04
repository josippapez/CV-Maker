import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../../store/hooks';
import { setTemplate, TemplateName } from '../../../store/reducers/template';
import style from './TemplatesModal.module.scss';

type Props = {
  closeModal(): void;
};

const Carousel = (props: Props) => {
  const { t } = useTranslation('CVTemplates');
  const { closeModal } = props;
  const dispatch = useAppDispatch();
  return (
    <div className='mt-3 flex flex-wrap items-center justify-center'>
      {Object.entries(TemplateName).map(value => {
        const templateName = value[1];
        return (
          <div
            key={templateName}
            className={`${style.template} ${
              style[value[0]]
            } cursor-pointer rounded-md transition-all hover:ring-2 hover:ring-blue-400`}
            onClick={() => {
              dispatch(setTemplate(templateName));
              closeModal();
            }}
          >
            <div className={`${style.templateImage} ${style[value[0]]}`} />
            <div className={`${style.templateName} text-white`}>
              {t(templateName)}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Carousel;
