import { ErrorMessage } from '@hookform/error-message';
import { Delete, Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment } from '@mui/material';
import cc from 'classnames';
import { useEffect, useState } from 'react';

interface Props {
  label?: string;
  defaultValue?: string;
  placeholder?: string;
  className?: string;
  inlineStyle?: boolean;
  disabled?: boolean;
  countCharacters?: boolean;
  fullWidth?: boolean;
  register: any;
  registerOptions?: {
    name: string;
    [x: string]: any;
  };
  option?: any;
  errors: any;
  setValue?: Function;
  [x: string]: any;
  alert?: any;
  keyboardType?: string;
  onChange?: Function;
}

interface RegisterOptions {
  name: string;
  required?: boolean;
  maxLength?: number; // add the maxLength property here
}

const InputField = (props: Props) => {
  const {
    label,
    placeholder,
    className,
    register,
    registerOptions,
    errors,
    defaultValue,
    inlineStyle,
    disabled,
    fullWidth,
    setValue,
    alert,
    keyboardType,
    onChange,
    option,
    ...rest
  } = props;

  const { name, required } = registerOptions as RegisterOptions;
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [valueDefault, setValueDefault] = useState<string | undefined>('');

  useEffect(() => {
    setValueDefault(defaultValue);
  }, [defaultValue]);

  const handleClear = (e: any) => {
    if (!disabled) {
      e.preventDefault();
      setValue && setValue(name, '');
    }
  };

  const handleInputFieldChange = (e: any) => {
    register(name).onChange(e);
    onChange && onChange(e.target.value);
  };
  const newKeyBoardType = showPassword ? 'password' : 'text';
  return (
    <div
      className={cc(
        fullWidth && 'w-full', // Set width ở đây
        inlineStyle && 'flex justify-between items-center',
        'mb-5'
      )}
    >
      {label && (
        <label
          htmlFor={name}
          className={cc(
            'text-sm font-semibold text-gray-700 mb-1',
            inlineStyle ? 'w-1/5' : 'block'
          )}
        >
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        <input // CÓ thể sử dụng Input của MUI và truyền các props tương ứng
          {...register(name, registerOptions)}
          {...rest}
          className={cc(
            'pl-4 pr-9 py-3 rounded-sm md:py-2 focus:outline-none ',
            inlineStyle ? 'w-4/5' : 'w-full',
            className
          )}
          {...option}
          placeholder={placeholder}
          defaultValue={valueDefault}
          disabled={disabled}
          onChange={handleInputFieldChange}
          type={
            keyboardType === 'password'
              ? newKeyBoardType
              : keyboardType ?? 'text'
          }
        />
        {keyboardType === 'password' && (
          <InputAdornment
            position="end"
            className="absolute !right-3 top-[55%]"
          >
            <IconButton
              onClick={() => setShowPassword(!showPassword)}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        )}
        {setValue && (
          <Delete
            className={cc(
              'w-5 h-5 absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400',
              {
                'cursor-pointer': !disabled,
              }
            )}
            onClick={handleClear}
          />
        )}
      </div>

      {alert && alert}
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }: any) => (
          <div className="mt-2 text-sm text-red-700" role="alert">
            <span className="font-medium">{message}</span>
          </div>
        )}
      />
    </div>
  );
};

InputField.defaultProps = {
  placeholder: '',
  defaultValue: '',
};

export default InputField;
