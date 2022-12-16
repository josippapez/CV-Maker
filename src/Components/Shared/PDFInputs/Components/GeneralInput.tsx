import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import useAnimation from '../../../../Hooks/useAnimation';
import { GeneralInfo } from '../../../PDFView/models';
import TextInput from '../../Inputs/TextInput';

interface Props {
  selectedTab: boolean;
  generalInfo: GeneralInfo;
  setGeneralInfo: (generalInfo: GeneralInfo) => void;
}

const arrayOfGeneralInputs: Array<{
  inputName: string;
  inputValue: keyof Omit<GeneralInfo, 'profilePicture'>;
  type: 'text' | 'email' | 'tel' | 'number' | 'password';
}> = [
  { inputName: 'First name', inputValue: 'firstName', type: 'text' },
  { inputName: 'Last name', inputValue: 'lastName', type: 'text' },
  { inputName: 'Date of birth', inputValue: 'dob', type: 'text' },
  { inputName: 'Position', inputValue: 'position', type: 'text' },
  { inputName: 'Email', inputValue: 'email', type: 'email' },
  { inputName: 'Phone', inputValue: 'phone', type: 'text' },
  { inputName: 'City', inputValue: 'city', type: 'text' },
  { inputName: 'Country', inputValue: 'country', type: 'text' },
  { inputName: 'Website', inputValue: 'website', type: 'text' },
  { inputName: 'LinkedIn', inputValue: 'LinkedIn', type: 'text' },
  { inputName: 'GitHub', inputValue: 'GitHub', type: 'text' },
  { inputName: 'Twitter', inputValue: 'Twitter', type: 'text' },
  { inputName: 'Facebook', inputValue: 'Facebook', type: 'text' },
];

const arrayOfGeneralTextAreas: Array<{
  inputName: string;
  inputValue: keyof Omit<GeneralInfo, 'profilePicture'>;
}> = [{ inputName: 'About me', inputValue: 'aboutMe' }];

export const GeneralInput = (props: Props) => {
  const { t } = useTranslation();
  const { combinedStyleFinal, combinedStyleInitial } = useAnimation({
    amountY: 10,
  });
  const { selectedTab, generalInfo, setGeneralInfo } = props;

  return (
    <div hidden={!selectedTab}>
      <div className='flex flex-col gap-6'>
        <motion.div
          key={'GeneralInput'}
          initial={combinedStyleInitial}
          animate={selectedTab ? combinedStyleFinal : combinedStyleInitial}
          transition={{ duration: 0.2 }}
          className='flex justify-center items-center'
        >
          {generalInfo.profilePicture ? (
            <>
              <img
                className='w-32 h-32 rounded-full'
                style={{ objectFit: 'cover' }}
                src={
                  generalInfo.profilePicture ? generalInfo.profilePicture : ''
                }
                alt='profile picture'
              />
              <button
                className='p-2 ml-2 rounded-full bg-red-500 text-white'
                onClick={() => {
                  setGeneralInfo({
                    ...generalInfo,
                    profilePicture: null,
                  });
                }}
              >
                {t('Remove')}
              </button>
            </>
          ) : (
            <input
              className='w-full p-2'
              type='file'
              accept='image/png, image/gif, image/jpeg'
              onChange={e => {
                if (e.target.files) {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = e => {
                      const image = e.target?.result as string;
                      if (image) {
                        setGeneralInfo({
                          ...generalInfo,
                          profilePicture: image,
                        });
                      }
                    };
                    reader.readAsDataURL(file);
                  }
                }
              }}
            />
          )}
        </motion.div>
        {arrayOfGeneralInputs.map((input, index) => (
          <motion.div
            key={index + '-' + 'GeneralInput' + '-' + t(`${input.inputValue}`)}
            animate={selectedTab ? combinedStyleFinal : combinedStyleInitial}
            initial={combinedStyleInitial}
            transition={{
              delay: (index + 1) * 0.035,
              duration: 0.2,
            }}
          >
            <TextInput
              label={t(`${input.inputValue}`)}
              type={input.type}
              value={generalInfo[input.inputValue]}
              name={input.inputValue}
              onChange={e => {
                setGeneralInfo({
                  ...generalInfo,
                  [input.inputValue]: e.target.value,
                });
              }}
              fullWidth
            />
          </motion.div>
        ))}
        {arrayOfGeneralTextAreas.map((input, index) => (
          <motion.div
            key={index + '-' + 'GeneralInput' + '-' + t(`${input.inputValue}`)}
            animate={selectedTab ? combinedStyleFinal : combinedStyleInitial}
            initial={combinedStyleInitial}
            transition={{
              delay: (arrayOfGeneralInputs.length + 1) * 0.035,
              duration: 0.2,
            }}
          >
            <TextInput
              label={t(`${input.inputValue}`)}
              textarea
              value={generalInfo[input.inputValue]}
              name={input.inputValue}
              onChange={e => {
                setGeneralInfo({
                  ...generalInfo,
                  [input.inputValue]: e.target.value,
                });
              }}
              fullWidth
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};
