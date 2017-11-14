// @flow
import { LOGIN_REQUEST, LOGIN_REQUEST_FAIL, LOGIN_REQUEST_SUCCESS } from './types';
import type { Action, authState } from './types';


const initialState: authState = {
  email: '',
  password: '',
  isLoggedIn: false,
  hasError: false
};


export default function(state: authState = initialState, action: Action): authState {

  switch (action.type) {

    case LOGIN_REQUEST:
      return {
        ...state,
        email: action.payload.email,
        password: action.payload.password
      };

    case LOGIN_REQUEST_FAIL:
      return {
        ...state,
        hasError: true,
        err: action.payload
      };

    case LOGIN_REQUEST_SUCCESS:
      return {
        ...state,
        isLoggedIn: true
      };

    default:
      (action: empty);
      return state;
  }
}