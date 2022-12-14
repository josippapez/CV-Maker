import { RefObject } from 'react';
import { useTranslation } from 'react-i18next';
import { scrollPosition } from '../../../Hooks/usePreventBodyScroll';
import { Tab } from '../PDFInputs/PDFInputsContainer';
import style from './PDFTabNavigationPresenter.module.scss';

type Props = {
  setSelectedTab: (tab: Tab) => void;
  selectedTab: Tab;
};

const PDFTabNavigationPresenter = (props: Props) => {
  const { setSelectedTab, selectedTab } = props;
  const { t } = useTranslation();

  const arrayOfTabs: Array<{ tab: Tab; label: string }> = [
    {
      tab: Tab.generalInfo,
      label: t('generalInfo'),
    },
    {
      tab: Tab.professionalExperience,
      label: t('professionalExperience'),
    },
    {
      tab: Tab.certificates,
      label: t('certificates'),
    },
    {
      tab: Tab.education,
      label: t('education'),
    },
    {
      tab: Tab.languages,
      label: t('languages'),
    },
  ];

  return (
    <div className='p-4 w-52 relative shadow-sm'>
      <div className='overflow-auto scroll w-full min-w-full flex flex-col justify-evenly items-center gap-6'>
        {arrayOfTabs.map(tab => (
          <div
            key={tab.tab}
            id={tab.tab}
            className={`${
              selectedTab === tab.tab
                ? style.selected + ' ' + style['tab-button']
                : style['tab-button']
            } px-2 py-2
        `}
            onClick={() => {
              setSelectedTab(tab.tab);
            }}
          >
            {tab.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PDFTabNavigationPresenter;
