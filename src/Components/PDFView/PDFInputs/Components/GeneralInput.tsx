import { GeneralInfo } from '@/Components/PDFView/models';
import { DateInput } from '@/Components/Shared/Inputs/DateInput';
import TextInput from '@/Components/Shared/Inputs/TextInput';
import useAnimation from '@/Hooks/useAnimation';
import usePDFData from '@/Hooks/usePDFData';
import Plus from '@public/Styles/Assets/Images/plus.svg';
import Compressor from 'compressorjs';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const arrayOfGeneralInputs: Array<{
  inputName: string;
  inputValue: keyof Omit<GeneralInfo, 'profilePicture'>;
  type: 'text' | 'date' | 'email' | 'tel' | 'number' | 'password';
}> = [
  { inputName: 'First name', inputValue: 'firstName', type: 'text' },
  { inputName: 'Last name', inputValue: 'lastName', type: 'text' },
  { inputName: 'Date of birth', inputValue: 'dob', type: 'date' },
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
  const { generalInfo, setGeneralInfo } = usePDFData();
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
          className='flex items-center justify-center'
        >
          {generalInfo.profilePicture ? (
            <div className='flex w-full flex-col'>
              <label className='font-medium text-gray-700'>
                {t('profilePicture')}
              </label>
              <div className='flex flex-row justify-center'>
                <img
                  className='h-24 w-24 rounded-3xl'
                  style={{ objectFit: 'cover' }}
                  src={
                    generalInfo.profilePicture ? generalInfo.profilePicture : ''
                  }
                  alt='profile picture'
                />
                <button
                  className='ml-2 h-fit self-center rounded-full bg-red-500 p-2 text-white'
                  onClick={() => {
                    setGeneralInfo({
                      profilePicture: '',
                    });
                  }}
                >
                  {t('remove')}
                </button>
              </div>
            </div>
          ) : (
            <div className='flex w-full flex-col'>
              <label className='font-medium text-gray-700'>
                {t('profilePicture')}
              </label>
              <label
                htmlFor='profilePicture'
                className='flex h-24 w-24 cursor-pointer items-center justify-center self-center rounded-3xl border border-dashed border-blue-500 bg-blue-100 hover:bg-blue-300'
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
            </div>
          )}
        </motion.div>
        {arrayOfGeneralInputs.map((input, index) => (
          <AnimatePresence
            key={index + '-' + 'GeneralInput' + '-' + t(`${input.inputValue}`)}
          >
            <motion.div
              animate={combinedStyleFinal}
              initial={combinedStyleInitial}
              exit={combinedStyleInitial}
              transition={{
                delay: (index + 1) * 0.035,
                duration: 0.2,
              }}
            >
              {input.type === 'date' ? (
                <DateInput
                  label={t(`${input.inputValue}`)}
                  value={generalInfo[input.inputValue]}
                  setData={date => {
                    setGeneralInfo({
                      [input.inputValue]: date,
                    });
                  }}
                  resetData={() => {
                    setGeneralInfo({
                      [input.inputValue]: undefined,
                    });
                  }}
                  startYear={new Date().getFullYear() - 18}
                />
              ) : (
                <TextInput
                  label={t(`${input.inputValue}`)}
                  type={input.type}
                  defaultValue={generalInfo[input.inputValue]}
                  name={input.inputName}
                  onChange={e => {
                    setGeneralInfo({
                      [input.inputValue]: e.currentTarget.value,
                    });
                  }}
                />
              )}
            </motion.div>
          </AnimatePresence>
        ))}
        {arrayOfGeneralTextAreas.map((input, index) => (
          <AnimatePresence
            key={index + '-' + 'GeneralInput' + '-' + t(`${input.inputValue}`)}
          >
            <motion.div
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
                defaultValue={generalInfo[input.inputValue]}
                name={input.inputName}
                onChange={e => {
                  setGeneralInfo({
                    [input.inputValue]: e.currentTarget.value,
                  });
                }}
                fullWidth
              />
            </motion.div>
          </AnimatePresence>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};
