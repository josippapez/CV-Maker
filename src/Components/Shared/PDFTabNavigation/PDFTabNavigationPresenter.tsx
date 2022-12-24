import { logout, signInWithGoogle } from '../../../store/actions/authActions';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { ReactComponent as AcademicCap } from '../../../Styles/Assets/Images/academic-cap.svg';
import { ReactComponent as Briefcase } from '../../../Styles/Assets/Images/briefcase.svg';
import { ReactComponent as CertificateIcon } from '../../../Styles/Assets/Images/document.svg';
import { ReactComponent as Google } from '../../../Styles/Assets/Images/google.svg';
import { ReactComponent as Language } from '../../../Styles/Assets/Images/language.svg';
import { ReactComponent as Logout } from '../../../Styles/Assets/Images/logout.svg';
import { ReactComponent as Profile } from '../../../Styles/Assets/Images/profile.svg';
import { ReactComponent as Tools } from '../../../Styles/Assets/Images/tools.svg';
import { Tab } from '../PDFInputs/PDFInputsContainer';
import { Tooltip } from '../Tootlip/Tooltip';
import { useTranslation } from 'react-i18next';

type Props = {
  setSelectedTab: (tab: Tab) => void;
  selectedTab: Tab;
};

const PDFTabNavigationPresenter = (props: Props) => {
  const { t } = useTranslation('PDFTabNavigation');
  const dispatch = useAppDispatch();
  const { setSelectedTab, selectedTab } = props;
  const { user } = useAppSelector(state => state.user);

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
      <div className='w-full min-w-full flex flex-col justify-evenly items-center gap-6'>
        {user.email ? (
          <button
            className={`p-4 mt-4 mb-4 bg-[#f5f5f5] hover:bg-gray-100 rounded-md focus:outline-none focus:shadow-outline  transition-all ease-in-out duration-300`}
            type='button'
            onClick={() => {
              dispatch(logout());
            }}
          >
            <Logout height={30} />
          </button>
        ) : (
          <button
            className={`p-4 mt-4 mb-4 bg-[#f5f5f5] hover:bg-gray-100 rounded-md focus:outline-none focus:shadow-outline  transition-all ease-in-out duration-300`}
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
          >
            <Tooltip tooltipText={t(tab.tab)} delayShow={0.4}>
              <div
                id={tab.tab}
                className={`${
                  selectedTab === tab.tab ? 'bg-[#f3f3f3]' : 'hover:bg-gray-100'
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
            </Tooltip>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PDFTabNavigationPresenter;
