// @flow
import type { ActionCreator } from 'redux';
import type { ThunkAction } from 'redux-thunk';
import type { Err, Login, LoginRequestAction, LogoutRequestAction, LoginRequestFailAction, LoginRequestSuccessAction } from './types';
import type { User } from '../User/types';
import { LOGIN_REQUEST, LOGOUT_REQUEST, LOGIN_REQUEST_FAIL, LOGIN_REQUEST_SUCCESS } from './types';
import { whoAmI, logoutUser, createAuthUser, signInWithEmailAndPassword } from '../../utils/auth-actions';
import { getUserFromDb, createUserInDb } from '../../utils/firestore-actions';
import { LOGIN_ROOT } from '../App/types';
import { changeAppRoot } from '../App/action-creators';



export const loginRequest: ActionCreator = (): LoginRequestAction => ({
  type: LOGIN_REQUEST
});

export const logoutRequest: ActionCreator = (): LogoutRequestAction => ({
  type: LOGOUT_REQUEST
});

export const loginFail: ActionCreator = (err: Err): LoginRequestFailAction => ({
  type: LOGIN_REQUEST_FAIL,
  payload: err
});

export const loginSuccess: ActionCreator = (user: User): LoginRequestSuccessAction => ({
  type: LOGIN_REQUEST_SUCCESS,
  payload: user
});



export const setUser: ThunkAction = (authUser) => {
  return async dispatch => {
    try {
      const userFromDb = await getUserFromDb(authUser.uid);
      dispatch(loginSuccess(userFromDb));
    } catch (error) {
      dispatch(loginFail(error));
    }
  };
};


export const signInRequest: ThunkAction = (login: Login) => {
  return async dispatch => {
    dispatch(loginRequest());
    try {
      const signedInUser = await signInWithEmailAndPassword(login);
      dispatch(setUser(signedInUser));
    } catch (error) {
      dispatch(loginFail(error));
    }
  };
};


export const signupRequest: ThunkAction = (signup: Login & User) => {
  return async dispatch => {
    dispatch(loginRequest());
    try {
      const newAuthUser = await createAuthUser(signup);
      const newUser = await createUserInDb(newAuthUser);
      dispatch(loginSuccess(newUser));
    } catch (error) {
      dispatch(loginFail(error));
      return false;
    }
    return true;
  };
};


export const logout: ThunkAction = () => {
  return async dispatch => {
    await logoutUser();
    dispatch(logoutRequest());
    dispatch(changeAppRoot(LOGIN_ROOT));
  };
};


export const checkAuth: ThunkAction = () => {
  return dispatch => {
    const authenticatedUser = whoAmI();
    if (authenticatedUser) {
      dispatch(setUser(authenticatedUser));
      return authenticatedUser;
    }
    return false;
  };
};


export default {
  logout,
  setUser,
  checkAuth,
  loginFail,
  loginSuccess,
  loginRequest,
  signupRequest,
  signInRequest
};
