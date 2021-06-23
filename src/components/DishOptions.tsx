import { Slider, Typography } from '@material-ui/core';
import { change, Field, formValueSelector } from 'redux-form';
import { dispatch, RootState } from '../store';
import { FormValues } from '../utils';
import { TextFieldRender } from './TextField';
import { connect } from 'react-redux';

interface DishOptionsProps {
  dishType: FormValues['type'];
}

function DishOptions({ dishType }: DishOptionsProps) {
  switch (dishType) {
    case 'pizza':
      return (
        <>
          <Field
            label="Diameter"
            name="diameter"
            normalize={(value?: string) => {
              if (!value) return;
              value.replace(/./g, ',');
              return parseFloat(value);
            }}
            component={TextFieldRender}
            type="number"
            inputProps={{
              step: 0.1,
            }}
          />
          <Field
            label="Slices"
            name="no_of_slices"
            normalize={(value?: string) => {
              if (!value) return;
              return parseInt(value);
            }}
            component={TextFieldRender}
            type="number"
          />
        </>
      );
    case 'soup':
      return (
        <>
          <Typography id="spiciness_scale_label">Spiciness</Typography>
          <Slider
            key="spiciness_slider"
            name="spiciness_scale"
            defaultValue={5}
            onChange={(event, value) => {
              dispatch(change('dish-form', 'spiciness_scale', value));
            }}
            min={1}
            max={10}
            step={1}
            marks={true}
            valueLabelDisplay="auto"
            aria-labelledby="spiciness_scale_label"
          />
        </>
      );

    case 'sandwich':
      return (
        <Field
          label="Slices of bread"
          name="slices_of_bread"
          normalize={(value?: string) => {
            if (!value) return;
            return parseInt(value);
          }}
          component={TextFieldRender}
          type="number"
        />
      );
    default:
      return null;
  }
}

const mapStateToProps = (state: RootState) => {
  const selector = formValueSelector('dish-form');
  const dishType: FormValues['type'] = selector(state, 'type');
  // injects type value to the props
  return {
    dishType,
  };
};

export default connect(mapStateToProps)(DishOptions);
