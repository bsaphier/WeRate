// @flow
import type { ActionCreator } from 'redux';
import type { ThunkAction } from 'redux-thunk';
import type { Err, Login, LogoutRequestAction, LoginRequestFailAction, LoginRequestSuccessAction } from './types';
import type { User } from '../User/types';
import { LOGOUT_REQUEST, LOGIN_REQUEST_FAIL, LOGIN_REQUEST_SUCCESS } from './types';
import { whoAmI, logoutUser, createAuthUser, authenticateUser } from '../../data/auth-actions';
import { getUserFromDb, createUserInDb } from '../../data/firestore-actions';



export const loginRequestFail: ActionCreator = (err: Err): LoginRequestFailAction => ({
  type: LOGIN_REQUEST_FAIL,
  payload: err
});

export const loginRequestSuccess: ActionCreator = (user: User): LoginRequestSuccessAction => ({
  type: LOGIN_REQUEST_SUCCESS,
  payload: user
});

export const logoutRequest: ActionCreator = (): LogoutRequestAction => ({
  type: LOGOUT_REQUEST
});


export const checkAuth: ThunkAction = () => {
  return async dispatch => {
    const authenticatedUser = whoAmI();
    if (authenticatedUser) {
      dispatch(logInAuthenticatedUser(authenticatedUser));
    }
  };
};


export const logInAuthenticatedUser: ThunkAction = (authUser) => {
  return async dispatch => {
    try {
      const userFromDb = await getUserFromDb(authUser.uid);
      dispatch(loginRequestSuccess(userFromDb));
    } catch (error) {
      dispatch(loginRequestFail(error));
    }
  };
};


export const loginRequest: ThunkAction = (login: Login) => {
  return async dispatch => {
    try {
      const authenticatedUser = await authenticateUser(login);
      dispatch(logInAuthenticatedUser(authenticatedUser));
    } catch (error) {
      dispatch(loginRequestFail(error));
    }
  };
};


export const signupRequest: ThunkAction = (signup: Login & User) => {
  return async dispatch => {
    try {
      const newAuthUser = await createAuthUser(signup);
      const newUser = await createUserInDb(newAuthUser);
      dispatch(loginRequestSuccess(newUser));
    } catch (error) {
      dispatch(loginRequestFail(error));
    }
  };
};


export const logout: ThunkAction = () => dispatch => {
  logoutUser();
  dispatch(logoutRequest());
};


export default {
  logout,
  loginRequest,
  signupRequest,
  loginRequestFail,
  loginRequestSuccess
};
