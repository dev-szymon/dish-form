import { TextField } from '@material-ui/core';
import { WrappedFieldProps } from 'redux-form';

interface TextFieldProps extends WrappedFieldProps {
  label: string;
}
export const TextFieldRender = ({
  label,
  meta: { touched, invalid, error },
  input,
  ...custom
}: TextFieldProps) => {
  return (
    <TextField
      style={{ marginBottom: '1rem' }}
      variant="outlined"
      label={label}
      error={touched && invalid}
      helperText={touched && error}
      {...input}
      {...custom}
    />
  );
};
