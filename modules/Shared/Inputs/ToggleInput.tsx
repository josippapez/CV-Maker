type Props = {
  labelFontWeight?:
    | 'font-medium'
    | 'font-bold'
    | 'font-normal'
    | 'font-light'
    | 'font-thin'
    | 'font-extrabold'
    | 'font-black'
    | 'font-extralight';
  inline?: boolean;
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
  wrapperClassName?: string;
};

export const ToggleInput = (props: Props) => {
  const {
    labelFontWeight = 'font-medium',
    inline = false,
    name = 'input',
    id = 'input',
    label = 'input',
    placeholder,
    onChange,
    onBlur,
    error,
    disabled,
    required,
    className,
    fullWidth,
    checked,
    wrapperClassName,
  } = props;
  return (
    <div
      className={`flex ${inline ? 'flex-row items-center gap-1' : 'flex-col'} ${
        fullWidth ? 'w-full' : ''
      } drop-shadow-sm ${wrapperClassName}`}
    >
      {label && (
        <label className={`${labelFontWeight} text-gray-700`}>{label}</label>
      )}
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
        className={`h-4 rounded-md border ${
          inline ? '' : 'w-full px-4'
        } focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm
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
