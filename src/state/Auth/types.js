// @flow
export const LOGIN_REQUEST: 'LOGIN_REQUEST' = 'LOGIN_REQUEST';
export const LOGIN_REQUEST_FAIL: 'LOGIN_REQUEST_FAIL' = 'LOGIN_REQUEST_FAIL';
export const LOGIN_REQUEST_SUCCESS: 'LOGIN_REQUEST_SUCCESS' = 'LOGIN_REQUEST_SUCCESS';


export type Err = { +error: string };


export type Login = {|
  email: string,
  password: string
|};


export type authState = {
  email: string,
  password: string,
  isLoggedIn: boolean,
  hasError: boolean,
  err?: Err
};


export type LoginRequestAction = {| +type: typeof LOGIN_REQUEST, payload: Login |};
export type LoginRequestFailAction = {| +type: typeof LOGIN_REQUEST_FAIL, payload: Err |};
export type LoginRequestSuccessAction = {| +type: typeof LOGIN_REQUEST_SUCCESS |};


export type Action =
  | empty
  | LoginRequestAction
  | LoginRequestFailAction
  | LoginRequestSuccessAction;
