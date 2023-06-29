import { sxTextField } from '@/utils/helper/styles';
import { ErrorMessage } from '@hookform/error-message';
import { FormControl, TextField, InputAdornment } from '@mui/material';
import type { FieldErrors } from 'react-hook-form';
import PercentIcon from '@mui/icons-material/Percent';
import type { ReactNode } from 'react';
import { AttachMoneyOutlined } from '@mui/icons-material';

interface FormControlComponentProps {
  errors?: FieldErrors<any>;
  required?: boolean;
  label?: string;
  type?: string;
  sx?: any;
  error?: boolean;
  placeholder?: string;
  requiredField?: any;
  name: string;
  onChange?: Function;
  value?: any;
  // Chỉ nên xài 1 trong 2 (InputProps or startIconInputProps)
  InputProps?: any;
  startIconInputProps?: 'percent' | 'none' | 'money';
  disabled?: boolean;
  [x: string]: any;
}
const FormControlComponent = ({
  label = '',
  type = 'text',
  error = false,
  required = false,
  placeholder = '',
  requiredField,
  errors,
  name,
  onChange,
  InputProps,
  value,
  startIconInputProps = 'none',
  sx,
  disabled = false,
  ...props
}: FormControlComponentProps) => {
  const listStartIcon = [
    {
      name: 'none',
      startAdornment: <></>,
    },
    {
      name: 'percent',
      startAdornment: (
        <InputAdornment position="start">
          <PercentIcon />
        </InputAdornment>
      ),
    },
    {
      name: 'money',
      startAdornment: (
        <InputAdornment position="start">
          <AttachMoneyOutlined />
        </InputAdornment>
      ),
    },
  ];
  const startAdornmentData: ReactNode = listStartIcon.find(
    (item) => item.name === startIconInputProps
  )?.startAdornment;
  return (
    <FormControl fullWidth required={required}>
      <TextField
        sx={sx || sxTextField}
        label={label}
        type={type}
        required={required}
        error={error}
        placeholder={placeholder}
        {...requiredField}
        value={value}
        onChange={onChange}
        InputProps={{
          startAdornment: startAdornmentData,
          ...InputProps,
        }}
        className={`!rounded-sm border border-mango-text-gray-1 text-sm font-normal !text-mango-text-black-1 !outline-none ${
          disabled && 'bg-disable-input'
        }`}
        disabled={disabled}
        {...props}
      />
      {errors && (
        <ErrorMessage
          errors={errors}
          name={name}
          render={({ message }: any) => (
            <div className="ml-2 mt-1 text-sm text-text-error" role="alert">
              <span className="font-medium">{message}</span>
            </div>
          )}
        />
      )}
    </FormControl>
  );
};
export default FormControlComponent;
