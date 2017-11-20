// @flow
import type { ActionCreator } from 'redux';
import type { ThunkAction } from 'redux-thunk';
import type { Err, Login, LogoutRequestAction, LoginRequestFailAction, LoginRequestSuccessAction } from './types';
import { LOGOUT_REQUEST, LOGIN_REQUEST_FAIL, LOGIN_REQUEST_SUCCESS } from './types';
import { logoutUser, createAuthUser, authenticateUser } from '../../data/auth-actions';
import { fetchingData, fetchingFailed, fetchSuccess } from '../Loader/action-creators';
import { getUserFromDb, createUserInDb } from '../../data/firestore-actions';
import type { User } from '../User/types';



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


export const loginRequest: ThunkAction = (login: Login) => {
  return async dispatch => {
    dispatch(fetchingData());
    try {
      const authenticatedUser = await authenticateUser(login);
      const userFromDb = await getUserFromDb(authenticatedUser.uid);
      dispatch(loginRequestSuccess(userFromDb));
    } catch (error) {
      dispatch(loginRequestFail(error));
      dispatch(fetchingFailed(error));
      return;
    }
    dispatch(fetchSuccess());
  };
};


export const signupRequest: ThunkAction = (signup: Login & User) => {
  return async dispatch => {
    dispatch(fetchingData());
    try {
      const newAuthUser = await createAuthUser(signup);
      const newUser = await createUserInDb(
        newAuthUser.uid,
        {
          email: signup.email
        }
      );
      dispatch(loginRequestSuccess(newUser));
    } catch (error) {
      dispatch(loginRequestFail(error));
      dispatch(fetchingFailed(error));
      return;
    }
    dispatch(fetchSuccess());
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
