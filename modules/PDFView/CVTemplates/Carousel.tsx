import { cn } from '@/lib/utils';
import { TemplateName } from '@/store/reducers/template';
import { usePDFData } from '@modules/Shared/Hooks/usePDFData';
import { useTranslations } from 'next-intl';

type Props = {
  closeModal(): void;
};

// used at build time to display correct template images
const templates = [
  'bg-[url("/Styles/Assets/Images/Template1.webp")]',
  'bg-[url("/Styles/Assets/Images/Template2.webp")]',
  'bg-[url("/Styles/Assets/Images/Template3.webp")]',
  'bg-[url("/Styles/Assets/Images/Template4.webp")]',
];

export const Carousel = (props: Props) => {
  const t = useTranslations('Templates');
  const { closeModal } = props;
  const { setActiveTemplate } = usePDFData();
  return (
    <div className='mt-3 flex h-full flex-wrap justify-center gap-3 overflow-auto pt-5'>
      {Object.entries(TemplateName).map((value, index) => {
        const templateName = value[1];
        return (
          <div
            key={templateName}
            className={cn(
              'h-fit cursor-pointer rounded-md transition-all hover:ring-2 hover:ring-blue-400',
              'h-[410px] w-[320px] hover:scale-105 max-sm:h-auto max-sm:w-full'
            )}
            onClick={() => {
              setActiveTemplate(value[1]);
              closeModal();
            }}
          >
            <div
              className={cn(
                `bg-[url("/Styles/Assets/Images/Template${index + 1}.webp")]`,
                `h-[calc(100%-2rem)] bg-contain bg-center bg-no-repeat`
              )}
            />
            <div className={`mt-3 text-center text-base text-white`}>
              {/* {t(templateName)} */}
              {templateName}
            </div>
          </div>
        );
      })}
    </div>
  );
};
