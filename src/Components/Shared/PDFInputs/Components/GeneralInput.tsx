import Compressor from 'compressorjs';
import { AnimatePresence, motion } from 'framer-motion';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import useAnimation from '../../../../Hooks/useAnimation';
import { ReactComponent as Plus } from '../../../../Styles/Assets/Images/plus.svg';
import { GeneralInfo } from '../../../PDFView/models';
import { PDFViewContext } from '../../../PDFView/PDFViewProvider';
import TextInput from '../../Inputs/TextInput';

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

export const GeneralInput = () => {
  const { generalInfo, setGeneralInfo } = useContext(PDFViewContext);
  const { t } = useTranslation('GeneralInput');
  const { combinedStyleFinal, combinedStyleInitial } = useAnimation({
    amountY: 10,
  });

  return (
    <motion.div
      className='flex flex-col gap-6'
      initial={combinedStyleInitial}
      animate={combinedStyleFinal}
      exit={combinedStyleInitial}
      transition={{ duration: 0.1 }}
    >
      <AnimatePresence>
        <motion.div
          key={'GeneralInput'}
          initial={combinedStyleInitial}
          animate={combinedStyleFinal}
          exit={combinedStyleInitial}
          transition={{ duration: 0.2 }}
          className='flex justify-center items-center'
        >
          {generalInfo.profilePicture ? (
            <>
              <img
                className='w-24 h-24 rounded-3xl'
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
                    profilePicture: undefined,
                  });
                }}
              >
                {t('Remove')}
              </button>
            </>
          ) : (
            <>
              <label
                htmlFor='profilePicture'
                className='flex justify-center items-center cursor-pointer w-24 h-24 bg-blue-100 rounded-3xl border border-dashed border-blue-500 hover:bg-blue-300'
              >
                <Plus height={30} className='fill-blue-600' />
              </label>
              <input
                className='hidden'
                type='file'
                id='profilePicture'
                name='profilePicture'
                accept='image/png, image/gif, image/jpeg'
                onChange={e => {
                  if (e.target.files) {
                    const file = e.target.files[0];

                    if (!file) {
                      return;
                    }

                    if (file.size < 1000000) {
                      const reader = new FileReader();
                      reader.readAsDataURL(file);
                      reader.onload = () => {
                        if (typeof reader.result === 'string') {
                          setGeneralInfo({
                            ...generalInfo,
                            profilePicture: reader.result,
                          });
                        }
                      };
                      return;
                    }

                    const compressor = new Compressor(file, {
                      quality: 0.6,
                      success(result) {
                        const reader = new FileReader();
                        reader.readAsDataURL(result);
                        reader.onload = () => {
                          if (typeof reader.result === 'string') {
                            setGeneralInfo({
                              ...generalInfo,
                              profilePicture: reader.result,
                            });
                          }
                        };
                        reader.onerror = error => {

                          compressor.abort();
                        };
                      },
                      error(err) {
                        console.log(err.message);
                      },
                    });
                  }
                }}
              />
            </>
          )}
        </motion.div>
        {arrayOfGeneralInputs.map((input, index) => (
          <motion.div
            key={index + '-' + 'GeneralInput' + '-' + t(`${input.inputValue}`)}
            animate={combinedStyleFinal}
            initial={combinedStyleInitial}
            exit={combinedStyleInitial}
            transition={{
              delay: (index + 1) * 0.035,
              duration: 0.2,
            }}
          >
            <TextInput
              label={t(`${input.inputValue}`)}
              type={input.type}
              value={generalInfo[input.inputValue]}
              name={input.inputName}
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
            animate={combinedStyleFinal}
            initial={combinedStyleInitial}
            exit={combinedStyleInitial}
            transition={{
              delay: (arrayOfGeneralInputs.length + 1) * 0.035,
              duration: 0.2,
            }}
          >
            <TextInput
              label={t(`${input.inputValue}`)}
              textarea
              value={generalInfo[input.inputValue]}
              name={input.inputName}
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
      </AnimatePresence>
    </motion.div>
  );
};
