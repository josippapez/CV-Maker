type Props = {
  name?: string;
  id?: string;
  label?: string;
  type?: 'text' | 'number' | 'email' | 'password' | 'tel';
  placeholder?: string;
  value?: string | number;
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
};

const TextInput = (props: Props) => {
  const {
    name,
    id,
    label,
    type,
    placeholder,
    value,
    onChange,
    onBlur,
    error,
    disabled,
    required,
    className,
    fullWidth,
    textarea,
  } = props;
  return (
    <div
      className={`flex flex-col ${fullWidth ? 'w-full' : ''} drop-shadow-sm`}
    >
      {label && <label className='font-medium text-gray-700'>{label}</label>}
      {textarea && (
        <textarea
          placeholder={placeholder}
          name={name}
          id={id}
          autoComplete={name}
          value={value}
          onChange={e => {
            e.preventDefault();

            if (!onChange) return;

            onChange(e);
          }}
          onBlur={e => {
            e.preventDefault();

            if (!onBlur) return;

            onBlur(e);
          }}
          disabled={disabled}
          required={required}
          rows={5}
          maxLength={490}
          className={`sm:text-sm border rounded-md h-auto max-h-64 p-2 focus:ring-indigo-500 focus:border-indigo-500 w-full
        ${
          error
            ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 focus:ring-red-500'
            : 'border-gray-300'
        } ${className || ''}`}
        />
      )}
      {!textarea && (
        <input
          placeholder={placeholder}
          type={type}
          name={name}
          id={id}
          autoComplete={name}
          value={value}
          onChange={e => {
            if (!onChange) return;

            e.preventDefault();
            onChange(e);
          }}
          onBlur={e => {
            if (!onBlur) return;

            e.preventDefault();
            onBlur(e);
          }}
          disabled={disabled}
          required={required}
          className={`sm:text-sm border rounded-md h-10 px-4 focus:ring-indigo-500 focus:border-indigo-500 w-full
        ${
          error
            ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 focus:ring-red-500'
            : 'border-gray-300'
        } ${className || ''}`}
        />
      )}
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
