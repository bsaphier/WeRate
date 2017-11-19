// @flow
import { LOGIN_REQUEST_FAIL, LOGIN_REQUEST_SUCCESS } from './types';
import type { Action, authState } from './types';


const initialState: authState = {
  isLoggedIn: false,
  hasError: false
};


export default function(state: authState = initialState, action: Action): authState {

  switch (action.type) {

    case LOGIN_REQUEST_FAIL:
      return {
        isLoggedIn: false,
        hasError: true,
        err: action.payload
      };

    case LOGIN_REQUEST_SUCCESS:
      return {
        isLoggedIn: true,
        hasError: false
      };

    default:
      (action: empty);
      return state;
  }
}