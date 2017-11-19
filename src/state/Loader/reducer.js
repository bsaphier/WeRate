// @flow
import { FETCHING_DATA, FETCHING_DATA_FAIL, FETCHING_DATA_SUCCESS } from './types';
import type { Action, loaderState } from './types';


const initialState: loaderState = {
  initialStateLoaded: false,
  isFetching: false,
  hasError: false,
  errorMessage: ''
};


export default function(state: loaderState = initialState, action: Action): loaderState {

  switch (action.type) {

    case FETCHING_DATA:
      return {
        ...state,
        isFetching: true
      };

    case FETCHING_DATA_FAIL:
      return {
        ...state,
        isFetching: false,
        hasError: true,
        errorMessage: action.error
      };

    case FETCHING_DATA_SUCCESS:
      return {
        ...state,
        isFetching: false,
        initialStateLoaded: true
      };

    default:
      (action: empty);
      return state;
  }
}
