import { combineReducers, createStore } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { APIResponse } from '../utils';

const initialState: State = {};

export interface State {
  data?: APIResponse;
  status?: 'success' | 'error';
}

interface Action extends State {
  type: 'API_DATA';
}

export default function dataReducer(state = initialState, action: Action) {
  switch (action.type) {
    case 'API_DATA':
      return {
        ...state,
        data: action.data,
        status: action.status,
      };
    default:
      return state;
  }
}

export const rootReducer = combineReducers({
  dishData: dataReducer,
  form: formReducer,
});

export const store = createStore(rootReducer);

export type RootState = ReturnType<typeof store.getState>;

export const { dispatch } = store;
