// @flow
import { LOGIN_REQUEST, LOGOUT_REQUEST, LOGIN_REQUEST_FAIL, LOGIN_REQUEST_SUCCESS, LOGIN_PENDING } from './types';
import type { Action, authState } from './types';


const initialState: authState = {
  err: '',
  isLoggedIn: false,
  hasError: false,
  isLoading: false,
  user: {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    admin: false,
    approved: false,
    business: '',
    phone: '',
    website: '',
    reviewIds: [],
  }
};


export default function(state: authState = initialState, action: Action): authState {

  switch (action.type) {

    case LOGIN_REQUEST:
      return {
        isLoggedIn: false,
        hasError: false,
        isLoading: true,
        err: '',
        user: { ...state.user }
      };

    case LOGIN_PENDING:
      return {
        isLoggedIn: false,
        hasError: false,
        isLoading: false,
        err: '',
        user: { ...initialState.user }
      };

    case LOGIN_REQUEST_FAIL:
      return {
        isLoggedIn: false,
        hasError: true,
        isLoading: false,
        err: action.payload,
        user: { ...initialState.user }
      };

    case LOGIN_REQUEST_SUCCESS:
      return {
        isLoggedIn: true,
        hasError: false,
        isLoading: false,
        err: '',
        user: action.payload
      };
    
    case LOGOUT_REQUEST:
      return {
        isLoggedIn: false,
        hasError: false,
        isLoading: false,
        err: '',
        user: { ...initialState.user }
      };

    default:
      (action: empty);
      return state;
  }
}