type Props = {
  name?: string;
  id?: string;
  label?: string;
  placeholder?: string;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  fullWidth?: boolean;
};

const ToggleInput = (props: Props) => {
  const {
    name,
    id,
    label,
    placeholder,
    onChange,
    onBlur,
    error,
    disabled,
    required,
    className,
    fullWidth,
    checked,
  } = props;
  return (
    <div
      className={`flex flex-col ${fullWidth ? 'w-full' : ''} drop-shadow-sm`}
    >
      {label && <label className='font-medium text-gray-700'>{label}</label>}
      <input
        placeholder={placeholder}
        type='checkbox'
        name={name}
        id={id}
        autoComplete={name}
        checked={checked}
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
        className={`sm:text-sm border rounded-md h-4 px-4 focus:ring-indigo-500 focus:border-indigo-500 w-full
        ${
          error
            ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 focus:ring-red-500'
            : 'border-gray-300'
        } ${className || ''}`}
      />
      {error && <p className='mt-2 text-sm text-red-600'>{error}</p>}
    </div>
  );
};

ToggleInput.defaultProps = {
  name: 'input',
  id: 'input',
  label: 'input',
  type: 'text',
};

export default ToggleInput;
