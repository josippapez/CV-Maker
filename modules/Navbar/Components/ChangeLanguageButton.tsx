import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { usePathname, useRouter } from '@/translations/navigation';
import Translate from '@public/Styles/Assets/Images/translate.svg';
import { useLocale, useTranslations } from 'next-intl';
import { FC, MouseEvent, useState } from 'react';

interface Props {
  dropdownPosition?: 'left' | 'right' | 'bottom' | 'top';
  onChangeLanguage?: () => void | Promise<void>;
  className?: string;
}

export const ChangeLanguageButton: FC<Props> = ({
  dropdownPosition = 'left',
  className,
  onChangeLanguage,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('Navbar');

  const [displayLanguageDropdown, setDisplayLanguageDropdown] =
    useState<boolean>(false);

  const handleSelectLanguage = async (e: MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    e.preventDefault();
    if (onChangeLanguage) {
      if (!target.dataset.locale) return;
      localStorage.setItem('locale', target.dataset.locale);
      await onChangeLanguage?.();
    }
    router.push(pathname, {
      locale: target.dataset.locale,
    });
  };

  const selectedLanguageClass = (language: string) => {
    const classNames =
      'w-full cursor-pointer px-6 py-1 hover:bg-gray-200 hover:dark:bg-gray-200 hover:dark:text-almost-black';
    if (locale === language) {
      return `${classNames} bg-gray-600 text-slight-gray hover:bg-gray-600 hover:text-slight-gray`;
    }
    return classNames;
  };

  return (
    <Popover onOpenChange={isOpen => setDisplayLanguageDropdown(isOpen)}>
      <PopoverTrigger
        className={` ${
          displayLanguageDropdown
            ? 'bg-gray-100 dark:bg-almost-black-input'
            : ''
        } relative flex items-center justify-center ${className}`}
      >
        <Translate height={30} width={35} />
      </PopoverTrigger>
      <PopoverContent side={dropdownPosition} asChild>
        <div className={`flex w-fit flex-col rounded-md border py-3 !bg-gray-100 dark:!bg-almost-black-input`}>
          <button
            data-locale='en-US'
            className={`${selectedLanguageClass('en-US')}`}
            onClick={handleSelectLanguage}
          >
            {t('English')}
          </button>
          <button
            data-locale='hr'
            className={`${selectedLanguageClass('hr')}`}
            onClick={handleSelectLanguage}
          >
            {t('Croatian')}
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
