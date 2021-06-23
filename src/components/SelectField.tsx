import {
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
} from '@material-ui/core';
import { ReactNode } from 'react';
import { WrappedFieldProps } from 'redux-form';

interface SelectFieldRenderProps extends WrappedFieldProps {
  label: string;
  name: string;
  children: ReactNode;
}

export const SelectFieldRender = ({
  input,
  label,
  name,
  meta: { touched, error },
  children,
  ...custom
}: SelectFieldRenderProps) => (
  <div style={{ marginBottom: '1rem', width: '100%' }}>
    {/* error prop must be a boolean, double exclamation mark converts it from string to bool */}
    <FormControl style={{ width: '100%' }} error={touched && !!error}>
      <InputLabel style={{ left: '0.9rem', top: '-0.5rem' }} htmlFor={name}>
        {label}
      </InputLabel>
      <Select label={label} {...input} {...custom} variant="outlined">
        {children}
      </Select>
      {touched && error && <FormHelperText>{touched && error}</FormHelperText>}
    </FormControl>
  </div>
);
