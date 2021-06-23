import { reset } from 'redux-form';
import { dispatch } from '../store';

export interface FormValues {
  name?: string;
  preparation_time?: string;
  type?: 'pizza' | 'soup' | 'sandwich';
  diameter?: number;
  no_of_slices?: number;
  spiciness_scale?: number;
  slices_of_bread?: number;
}

export const formatFormValues = (values: FormValues) => {
  // destructure out redundant fields
  const { spiciness_scale, slices_of_bread: wPizzaOut, ...withPizza } = values;
  const {
    no_of_slices: wsoupOut,
    diameter: wsoupDiameterOut,
    slices_of_bread,
    ...withsoup
  } = values;
  const {
    no_of_slices,
    diameter,
    spiciness_scale: wSandwichOut,
    ...withSandwich
  } = values;

  switch (values.type) {
    case 'pizza':
      return withPizza;
    case 'soup':
      return values.spiciness_scale
        ? withsoup
        : { withsoup, spiciness_scale: 5 };
    case 'sandwich':
      return withSandwich;
  }
};

export interface APIResponse extends FormValues {
  id: number;
}

export const submitDish = async (values: FormValues) => {
  const response = await fetch(
    'https://frosty-wood-6558.getsandbox.com:443/dishes',
    {
      body: JSON.stringify(formatFormValues(values)),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }
  );

  const data: APIResponse = await response.json();

  dispatch(reset('dish-form'));
  return dispatch({
    type: 'API_DATA',
    data: data,
    status: response.ok ? 'success' : 'error',
  });
};
