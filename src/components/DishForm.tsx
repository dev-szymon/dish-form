import { Box, Button, CircularProgress, MenuItem } from '@material-ui/core';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { Field, submit } from 'redux-form';
import { SelectFieldRender } from './SelectField';
import { TextFieldRender } from './TextField';
import DishOptions from './DishOptions';
import { validate } from '../validation';
import { submitDish } from '../utils';
import { dispatch } from '../store';

function DishForm({ valid, submitting, reset }: InjectedFormProps) {
  return (
    <form>
      <Box
        display="flex"
        flexDirection="column"
        maxWidth="400px"
        justifyContent="space-around"
      >
        <Field label="Dish name" name="name" component={TextFieldRender} />
        <Field
          label="Preparation time"
          name="preparation_time"
          component={TextFieldRender}
          type="time"
          inputProps={{
            step: 100,
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Field component={SelectFieldRender} name="type" label="type">
          <MenuItem value={'pizza'}>pizza</MenuItem>
          <MenuItem value={'soup'}>soup</MenuItem>
          <MenuItem value={'sandwich'}>sandwich</MenuItem>
        </Field>

        <DishOptions />

        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={!valid || submitting}
          onClick={() => dispatch(submit('dish-form'))}
        >
          Submit
          {submitting && <CircularProgress color="primary" size="1rem" />}
        </Button>
        <Box
          display="flex"
          width="100%"
          justifyContent="flex-end"
          marginTop="1rem"
        >
          <Button type="button" color="secondary" onClick={() => reset()}>
            Clear
          </Button>
        </Box>
      </Box>
    </form>
  );
}

export default reduxForm({
  // a unique name for the form
  form: 'dish-form',
  validate,
  onSubmit: submitDish,
})(DishForm);
