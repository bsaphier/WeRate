// @flow
import { LOGOUT_REQUEST, LOGIN_REQUEST_FAIL, LOGIN_REQUEST_SUCCESS } from './types';
import type { Action, authState } from './types';


const initialState: authState = {
  isLoggedIn: false,
  hasError: false,
  err: ''
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
        hasError: false,
        err: ''
      };
    
    case LOGOUT_REQUEST:
      return {
        isLoggedIn: false,
        hasError: false,
        err: ''
      };

    default:
      (action: empty);
      return state;
  }
}