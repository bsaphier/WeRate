// @flow
import { ActionCreator } from 'redux';
import { LOGIN_REQUEST, LOGIN_REQUEST_FAIL, LOGIN_REQUEST_SUCCESS } from './types';
import type { Err, Login, LoginRequestAction, LoginRequestFailAction, LoginRequestSuccessAction } from './types';


export const loginRequest: ActionCreator = (login: Login): LoginRequestAction => ({
  type: LOGIN_REQUEST,
  payload: login
});

export const loginRequestFail: ActionCreator = (err: Err): LoginRequestFailAction => ({
  type: LOGIN_REQUEST_FAIL,
  payload: err
});

export const loginRequestSuccess: ActionCreator = (): LoginRequestSuccessAction => ({
  type: LOGIN_REQUEST_SUCCESS
});


export default {
  loginRequest,
  loginRequestFail,
  loginRequestSuccess
};
