// @flow
import type { User } from '../Users/types';

export const LOGIN_PENDING: 'LOGIN_PENDING' = 'LOGIN_PENDING';
export const LOGIN_REQUEST: 'LOGIN_REQUEST' = 'LOGIN_REQUEST';
export const LOGOUT_REQUEST: 'LOGOUT_REQUEST' = 'LOGOUT_REQUEST';
export const SET_ERROR_MESSAGE: 'SET_ERROR_MESSAGE' = 'SET_ERROR_MESSAGE';
export const LOGIN_REQUEST_FAIL: 'LOGIN_REQUEST_FAIL' = 'LOGIN_REQUEST_FAIL';
export const LOGIN_REQUEST_SUCCESS: 'LOGIN_REQUEST_SUCCESS' = 'LOGIN_REQUEST_SUCCESS';


export type Err = any;


export type Login = {|
  email: string,
  password: string,
  confirmPassword?: string
|};


export type authState = {|
  user: User,
  isLoggedIn: boolean,
  hasError: boolean,
  isLoading: boolean,
  err?: Err
|};


export type LoginRequestAction = {| +type: typeof LOGIN_REQUEST |};
export type LoginPendingAction = {| +type: typeof LOGIN_PENDING |};
export type LogoutRequestAction = {| +type: typeof LOGOUT_REQUEST |};
export type SetErrorMessageAction = {| +type: typeof SET_ERROR_MESSAGE, payload: Err |};
export type LoginRequestFailAction = {| +type: typeof LOGIN_REQUEST_FAIL, payload: Err |};
export type LoginRequestSuccessAction = {| +type: typeof LOGIN_REQUEST_SUCCESS, payload: User |};


export type Action =
  | empty
  | LoginRequestAction
  | LoginPendingAction
  | LogoutRequestAction
  | SetErrorMessageAction
  | LoginRequestFailAction
  | LoginRequestSuccessAction;
