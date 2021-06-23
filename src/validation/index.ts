import * as yup from 'yup';
import { FormValues } from '../utils';

const schema = yup.object().shape({
  name: yup.string().required('Dish name is required.'),
  type: yup
    .string()
    .matches(/(pizza|sandwich|soup)/)
    .required('Type is required.'),
  preparation_time: yup
    .string()
    .matches(/^([0-1]?\d|2[0-3])(?::([0-5]?\d))(?::([0-5]?\d))$/)
    .required('Valid preparation time is required. HH:MM:SS'),
  no_of_slices: yup
    .number()
    .positive()
    .integer()
    .when('type', {
      is: 'pizza',
      then: yup
        .number()
        .positive()
        .integer()
        .required('Slices amount is required.'),
    }),
  diameter: yup
    .number()
    .positive()
    .when('type', {
      is: 'pizza',
      then: yup.number().positive().required('Diameter is required.'),
    }),
  spiciness_scale: yup
    .number()
    .integer()
    .min(1)
    .max(10)
    .when('type', {
      is: 'soup',
      then: yup
        .number()
        .integer()
        .min(1)
        .max(10)
        .required('Diameter is required.'),
    }),
  slices_of_bread: yup
    .number()
    .integer()
    .positive()
    .when('type', {
      is: 'sandwich',
      then: yup
        .number()
        .integer()
        .positive()
        .required('Slices ammount is required.'),
    }),
});

type ErrorsObject = { [key: string]: string };

export const validate = (values: FormValues) => {
  const errors: ErrorsObject = {};
  try {
    schema.validateSync(values, { abortEarly: false });
  } catch (err) {
    err.inner.forEach(({ path, message }: ErrorsObject) => {
      errors[path] = message;
    });
  }

  return errors;
};

export default schema;
