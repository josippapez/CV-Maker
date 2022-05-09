import { RefObject } from 'react';
import { useTranslation } from 'react-i18next';
import { scrollPosition } from '../../../Hooks/usePreventBodyScroll';
import { Tab } from '../PDFInputs/PDFInputsContainer';
import './PDFTabNavigationPresenter.css';

type Props = {
  position: scrollPosition | null;
  disableScroll: () => void;
  enableScroll: () => void;
  setSelectedTab: (tab: Tab) => void;
  selectedTab: Tab;
  horizontalScroll: RefObject<HTMLDivElement>;
};

const PDFTabNavigationPresenter = (props: Props) => {
  const {
    position,
    disableScroll,
    enableScroll,
    horizontalScroll,
    setSelectedTab,
    selectedTab,
  } = props;
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
    <div className='w-full relative navigation mb-2'>
      <div className='navigation-hint'>
        {(position === scrollPosition.left ||
          position === scrollPosition.inbetween) && (
          <div className='left-arrow' />
        )}
        {(position === scrollPosition.right ||
          position === scrollPosition.inbetween) && (
          <div className='right-arrow' />
        )}
      </div>
      <div
        ref={horizontalScroll}
        className='overflow-auto scroll w-full min-w-full flex justify-evenly'
        onMouseEnter={() => {
          disableScroll();
        }}
        onMouseLeave={() => {
          enableScroll();
        }}
      >
        {arrayOfTabs.map(tab => (
          <div
            key={tab.tab}
            id={tab.tab}
            className={`tab-button px-4 py-2
              ${
                selectedTab === tab.tab ? 'border-blue-500' : 'border-gray-200'
              }`}
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
