import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../../store/hooks';
import { setTemplate, TemplateName } from '../../../store/reducers/template';
import style from './TemplatesModal.module.scss';

type Props = {
  closeModal(): void;
};

const Carousell = (props: Props) => {
  const { t } = useTranslation('CVTemplates');
  const { closeModal } = props;
  const dispatch = useAppDispatch();
  return (
    <div className='flex flex-wrap justify-center items-center mt-3'>
      {Object.entries(TemplateName).map(value => {
        const templateName = value[1];
        return (
          <div
            key={templateName}
            className={`${style.template} ${
              style[value[0]]
            } rounded-md hover:ring-2 hover:ring-blue-400 cursor-pointer transition-all`}
            onClick={() => {
              dispatch(setTemplate(templateName));
              closeModal();
            }}
          >
            <div className={`${style.templateImage} ${style[value[0]]}`} />
            <div className={`${style.templateName} dark:text-white`}>
              {t(templateName)}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Carousell;
