import { RefObject } from 'react';
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

  const arrayOfTabs: Array<{ tab: Tab; label: string }> = [
    {
      tab: Tab.generalInfo,
      label: 'General Info',
    },
    {
      tab: Tab.professionalExperience,
      label: 'Professional Experience',
    },
    {
      tab: Tab.certificates,
      label: 'Certificates',
    },
    {
      tab: Tab.education,
      label: 'Education',
    },
    {
      tab: Tab.languages,
      label: 'Languages',
    },
  ];

  return (
    <div className='w-full relative navigation'>
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
        className='overflow-auto scroll w-full min-w-full'
        onMouseEnter={() => {
          disableScroll();
        }}
        onMouseLeave={() => {
          enableScroll();
        }}
      >
        <div className='border-b-4 flex'>
          {arrayOfTabs.map(tab => (
            <div
              key={tab.tab}
              className={`tab-button px-4 py-2
              ${
                selectedTab === tab.tab
                  ? 'border-blue-500'
                  : 'border-b-transparent'
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
    </div>
  );
};

export default PDFTabNavigationPresenter;
