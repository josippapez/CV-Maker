import { logout, signInWithGoogle } from '@/store/actions/authActions';
import { saveDataForUser } from '@/store/actions/syncActions';
import { useAppDispatch } from '@/store/hooks';
import { ChangeLanguageButton, TemplatesButton } from '@modules/Navbar';
import { TemplatesModal } from '@modules/PDFView/CVTemplates/TemplatesModal';
import { Tab } from '@modules/PDFView/PDFInputs/PDFInputsContainer';
import { VersionHistoryModal } from '@modules/PDFView/VersionHistory/VersionHistoryModal';
import { useAuth } from '@modules/Providers';
import { useWindowSize } from '@modules/Shared/Hooks';
import { Tooltip } from '@modules/Shared/Tooltip';
import AcademicCap from '@public/Styles/Assets/Images/academic-cap.svg';
import Briefcase from '@public/Styles/Assets/Images/briefcase.svg';
import CertificateIcon from '@public/Styles/Assets/Images/document.svg';
import Google from '@public/Styles/Assets/Images/google.svg';
import Language from '@public/Styles/Assets/Images/language.svg';
import Logout from '@public/Styles/Assets/Images/logout.svg';
import Profile from '@public/Styles/Assets/Images/profile.svg';
import ProjectFolder from '@public/Styles/Assets/Images/projectFolder.svg';
import Tools from '@public/Styles/Assets/Images/tools.svg';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import { useMemo, useState } from 'react';

type Props = {
  setSelectedTab: (tab: Tab) => void;
  selectedTab: Tab;
};

export const PDFTabNavigationPresenter = ({
  setSelectedTab,
  selectedTab,
}: Props) => {
  const dispatch = useAppDispatch();
  const windowSize = useWindowSize(10);
  const { t } = useTranslation('PDFTabNavigation');
  const { user } = useAuth();
  const [displayTemplateChooseModal, setDisplayTemplateChooseModal] =
    useState(false);

  const arrayOfTabs: Array<{ tab: Tab; label: string | JSX.Element }> = useMemo(
    () => [
      {
        tab: Tab.generalInfo,
        label: (
          <Profile
            height={30}
            width={35}
            strokeWidth={2.5}
            className='fill-gray-700 stroke-gray-700'
          />
        ),
      },
      {
        tab: Tab.professionalExperience,
        label: <Briefcase height={30} width={35} className='stroke-gray-700' />,
      },
      {
        tab: Tab.projects,
        label: (
          <ProjectFolder height={30} width={35} className='stroke-gray-700' />
        ),
      },
      {
        tab: Tab.education,
        label: (
          <AcademicCap height={30} width={35} className='stroke-gray-700' />
        ),
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
    ],
    []
  );

  return (
    <div
      className={`relative z-10  ${
        windowSize.width < 500 ? 'w-16' : 'w-28'
      } py-8 shadow-sm`}
    >
      <div className='flex h-full flex-col justify-between gap-6'>
        <div className='flex w-full min-w-full flex-col items-center justify-evenly gap-2'>
          {user ? (
            <button
              className={`focus:shadow-outline mt-4 mb-4 rounded-full bg-[#f5f5f5] p-4 transition-all duration-300  ease-in-out hover:bg-gray-100 focus:outline-none`}
              type='button'
              onClick={() => {
                dispatch(logout());
              }}
            >
              <Logout height={30} />
            </button>
          ) : (
            <button
              className={`focus:shadow-outline mt-4 mb-4 rounded-full bg-[#f5f5f5] p-4 transition-all duration-300  ease-in-out hover:bg-gray-100 focus:outline-none`}
              type='button'
              onClick={() => {
                dispatch(signInWithGoogle());
              }}
            >
              <Google height={24} className='m-auto block' />
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
                  } focus:shadow-outline flex cursor-pointer
                select-none items-center
                justify-center rounded-md ${
                  windowSize.width < 500 ? 'p-3' : 'p-4'
                }
                text-center text-sm
                font-bold transition-all
                duration-300 ease-in-out focus:outline-none
              `}
                  onClick={() => {
                    setSelectedTab(tab.tab);
                  }}
                >
                  {tab.label}
                </div>
                {selectedTab === tab.tab && (
                  <motion.div
                    className={`absolute top-0 ${
                      windowSize.width < 500 ? 'left-[-10px]' : 'left-[-15px]'
                    } h-full w-1 rounded-full bg-blue-800`}
                    layoutId='bar'
                  ></motion.div>
                )}
              </Tooltip>
            </motion.div>
          ))}
        </div>
        <div className='flex w-full min-w-full flex-col items-center justify-evenly gap-2'>
          <motion.div
            key='language'
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{
              duration: 0.2,
              delay: 0.05 * (arrayOfTabs.length + 1),
            }}
          >
            <ChangeLanguageButton
              onChangeLanguage={() => dispatch(saveDataForUser())}
              dropdownPosition='right'
              className='focus:shadow-outline cursor-pointer select-none rounded-md
            p-4 text-sm
            font-bold transition-all
            duration-300 ease-in-out hover:bg-gray-100 focus:outline-none'
            />
          </motion.div>
          <motion.div
            key='templates'
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{
              duration: 0.2,
              delay: 0.05 * (arrayOfTabs.length + 2),
            }}
          >
            <TemplatesButton
              iconClassname='stroke-gray-700'
              className='focus:shadow-outline cursor-pointer select-none rounded-md
              p-4 text-sm
              font-bold transition-all
              duration-300 ease-in-out hover:bg-gray-100 focus:outline-none'
              onClick={() => setDisplayTemplateChooseModal(true)}
            />
          </motion.div>
        </div>
      </div>
      <TemplatesModal
        closeModal={() => setDisplayTemplateChooseModal(false)}
        show={displayTemplateChooseModal}
      />
      <VersionHistoryModal />
    </div>
  );
};
