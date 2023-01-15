import { motion } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { logout, signInWithGoogle } from '../../../store/actions/authActions';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { ReactComponent as AcademicCap } from '../../../Styles/Assets/Images/academic-cap.svg';
import { ReactComponent as Briefcase } from '../../../Styles/Assets/Images/briefcase.svg';
import { ReactComponent as CertificateIcon } from '../../../Styles/Assets/Images/document.svg';
import { ReactComponent as Google } from '../../../Styles/Assets/Images/google.svg';
import { ReactComponent as Language } from '../../../Styles/Assets/Images/language.svg';
import { ReactComponent as Logout } from '../../../Styles/Assets/Images/logout.svg';
import { ReactComponent as Profile } from '../../../Styles/Assets/Images/profile.svg';
import { ReactComponent as Tools } from '../../../Styles/Assets/Images/tools.svg';
import TemplatesModal from '../../PDFView/CVTemplates/TemplatesModal';
import ChangeLanguageButton from '../Navbar/Components/ChangeLanguageButton';
import TemplatesButton from '../Navbar/Components/TemplatesButton';

import { Tab } from '../PDFInputs/PDFInputsContainer';
import { Tooltip } from '../Tootlip/Tooltip';

type Props = {
  setSelectedTab: (tab: Tab) => void;
  selectedTab: Tab;
};

const PDFTabNavigationPresenter = (props: Props) => {
  const { t } = useTranslation('PDFTabNavigation');
  const dispatch = useAppDispatch();

  const { setSelectedTab, selectedTab } = props;
  const { user } = useAppSelector(state => state.user);

  const [displayTemplateChooseModal, setDisplayTemplateChooseModal] =
    useState(false);

  const arrayOfTabs: Array<{ tab: Tab; label: string | JSX.Element }> = [
    {
      tab: Tab.generalInfo,
      label: (
        <Profile
          height={30}
          width={35}
          strokeWidth={2.5}
          className='stroke-gray-700 fill-gray-700'
        />
      ),
    },
    {
      tab: Tab.professionalExperience,
      label: <Briefcase height={30} width={35} className='stroke-gray-700' />,
    },
    {
      tab: Tab.education,
      label: <AcademicCap height={30} width={35} className='stroke-gray-700' />,
    },
    {
      tab: Tab.certificates,
      label: (
        <CertificateIcon height={30} width={35} className='stroke-gray-700' />
      ),
    },
    {
      tab: Tab.languages,
      label: <Language height={30} width={35} className='fill-gray-700' />,
    },
    {
      tab: Tab.skills,
      label: <Tools height={30} width={35} className='fill-gray-700' />,
    },
  ];

  return (
    <div className='p-6 w-32 relative shadow-sm z-10'>
      <div className='flex flex-col justify-between h-full'>
        <div className='w-full min-w-full flex flex-col justify-evenly items-center gap-2'>
          {user.email ? (
            <button
              className={`p-4 mt-4 mb-4 bg-[#f5f5f5] hover:bg-gray-100 rounded-full focus:outline-none focus:shadow-outline  transition-all ease-in-out duration-300`}
              type='button'
              onClick={() => {
                dispatch(logout());
              }}
            >
              <Logout height={30} />
            </button>
          ) : (
            <button
              className={`p-4 mt-4 mb-4 bg-[#f5f5f5] hover:bg-gray-100 rounded-full focus:outline-none focus:shadow-outline  transition-all ease-in-out duration-300`}
              type='button'
              onClick={() => {
                signInWithGoogle();
              }}
            >
              <Google height={24} className='block m-auto' />
            </button>
          )}
          {arrayOfTabs.map((tab, index) => (
            <motion.div
              key={tab.tab}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, delay: 0.05 * index }}
              className='relative'
            >
              <Tooltip tooltipText={t(tab.tab)} delayShow={0.4}>
                <div
                  id={tab.tab}
                  className={`${
                    selectedTab === tab.tab
                      ? 'bg-[#f3f3f3]'
                      : 'hover:bg-gray-100'
                  } p-4 font-bold flex
                items-center justify-center
                text-center rounded-md text-sm
                cursor-pointer select-none
                focus:outline-none focus:shadow-outline
                transition-all ease-in-out duration-300
              `}
                  onClick={() => {
                    setSelectedTab(tab.tab);
                  }}
                >
                  {tab.label}
                </div>
                {selectedTab === tab.tab && (
                  <motion.div
                    className='absolute top-0 left-[-20px] w-1 h-full bg-blue-800 rounded-full'
                    layoutId='bar'
                  ></motion.div>
                )}
              </Tooltip>
            </motion.div>
          ))}
        </div>
        <div className='w-full min-w-full flex flex-col justify-evenly items-center gap-2'>
          <motion.div
            key='language'
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, delay: 0.05 * arrayOfTabs.length }}
          >
            <ChangeLanguageButton
              dropdownPosition='right'
              className='p-4 font-bold rounded-md text-sm
            cursor-pointer select-none
            focus:outline-none focus:shadow-outline
            transition-all ease-in-out duration-300 hover:bg-gray-100'
            />
          </motion.div>
          <motion.div
            key='templates'
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{
              duration: 0.2,
              delay: 0.05 * (arrayOfTabs.length + 1),
            }}
          >
            <TemplatesButton
              iconClassname='stroke-gray-700'
              className='p-4 font-bold rounded-md text-sm
              cursor-pointer select-none
              focus:outline-none focus:shadow-outline
              transition-all ease-in-out duration-300 hover:bg-gray-100'
              onClick={() => setDisplayTemplateChooseModal(true)}
            />
          </motion.div>
        </div>
      </div>
      <TemplatesModal
        closeModal={() => setDisplayTemplateChooseModal(false)}
        show={displayTemplateChooseModal}
      />
    </div>
  );
};

export default PDFTabNavigationPresenter;
