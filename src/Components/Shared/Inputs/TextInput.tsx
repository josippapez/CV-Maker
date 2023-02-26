import { useMemo } from 'react';

type Props = {
  name?: string;
  id?: string;
  label?: string;
  type?: 'text' | 'number' | 'email' | 'password' | 'tel';
  placeholder?: string;
  value?: string | number;
  defaultValue?: string | number;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onBlur?: (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  fullWidth?: boolean;
  textarea?: boolean;
  inline?: boolean;
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

const TextInput = (props: Props) => {
  const {
    name,
    id,
    label,
    type,
    placeholder,
    value = undefined,
    defaultValue = undefined,
    onChange: change,
    onBlur: blur,
    error,
    disabled,
    required,
    className,
    fullWidth,
    textarea,
    inline,
    onKeyPress: keypress,
  } = props;

  const defaultTextAreaProps = {
    placeholder,
    name,
    id,
    disabled,
    required,
    className: `h-auto max-h-64 w-full rounded-md p-2 ring-0 transition-all duration-300 ease-in-out focus:ring-2 focus:ring-indigo-500 sm:text-sm
  ${
    error
      ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 focus:ring-red-500'
      : 'border-gray-300'
  } ${className || ''}`,
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (!change) return;

      change(e);
    },
    onBlur: (e: React.FocusEvent<HTMLTextAreaElement>) => {
      if (!blur) return;

      blur(e);
    },
  };

  const defaultInputProps = {
    placeholder,
    type,
    name,
    id,
    disabled,
    required,
    className: `h-10 w-full rounded-md px-4 ring-0 transition-all duration-300 ease-in-out focus:ring-2 focus:ring-indigo-500 sm:text-sm
    ${
      error
        ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 focus:ring-red-500'
        : 'border-gray-300'
    } ${className || ''}`,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!change) return;

      change(e);
    },
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
      if (!blur) return;

      blur(e);
    },
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!keypress) return;

      keypress(e);
    },
  };

  const shouldInputRerender = localStorage.getItem('preventVersionHistory');

  return (
    <div
      className={`flex ${inline ? 'flex-row items-center gap-4' : 'flex-col'} ${
        fullWidth ? 'w-full' : ''
      } drop-shadow-sm`}
    >
      {label && <label className='font-medium text-gray-700'>{label}</label>}
      {textarea &&
        (typeof value !== 'undefined' ? (
          <textarea
            autoComplete={name}
            value={value}
            rows={5}
            maxLength={490}
            {...defaultTextAreaProps}
          />
        ) : (
          <textarea
            key={shouldInputRerender}
            autoComplete={name}
            defaultValue={defaultValue}
            rows={5}
            maxLength={490}
            {...defaultTextAreaProps}
          />
        ))}
      {!textarea &&
        (typeof value !== 'undefined' ? (
          <input autoComplete={name} value={value} {...defaultInputProps} />
        ) : (
          <input
            key={shouldInputRerender}
            autoComplete={name}
            defaultValue={defaultValue}
            {...defaultInputProps}
          />
        ))}
      {error && <p className='mt-2 text-sm text-red-600'>{error}</p>}
    </div>
  );
};

TextInput.defaultProps = {
  name: 'input',
  label: 'input',
  type: 'text',
};

export default TextInput;
