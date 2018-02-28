// @flow
/* globals console */
import type { ActionCreator } from 'redux';
import type { ThunkAction } from 'redux-thunk';
import type { Err, Login, LoginRequestAction, LoginPendingAction, LogoutRequestAction, LoginRequestFailAction, LoginRequestSuccessAction } from './types';
import type { User } from '../Users/types';
import { LOGIN_REQUEST, LOGOUT_REQUEST, LOGIN_PENDING, LOGIN_REQUEST_FAIL, LOGIN_REQUEST_SUCCESS } from './types';
import { whoAmI, logoutUser, signInWithEmailAndPassword } from '../../utils/auth-actions';
import { getUserFromDb, createPendingUserInDb } from '../../utils/firestore-actions';



export const loginRequest: ActionCreator = (): LoginRequestAction => ({
  type: LOGIN_REQUEST
});

export const loginPending: ActionCreator = (): LoginPendingAction => ({
  type: LOGIN_PENDING
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
      const docRef = await getUserFromDb(authUser.uid);
      console.log('setuser * docRef: ', docRef);
      if (docRef.exists) {
        const userFromDb = docRef.data();
        console.log('setuser * userFromDb: ', userFromDb);
        dispatch(loginSuccess(userFromDb));
        return userFromDb.approved;
      } else {
        dispatch(loginFail());
      }
      return false;
    } catch (error) {
      dispatch(loginFail(`${error}`));
    }
    return false;
  };
};


export const signinRequest: ThunkAction = (login: Login) => {
  return async dispatch => {
    dispatch(loginRequest());
    try {
      const { user: signedInUser } = await signInWithEmailAndPassword(login);
      console.log('signinRequest * signedInUser: ', signedInUser);
      const isApprovedUser = await dispatch(setUser(signedInUser));
      return { verified: true, approved: isApprovedUser };
    } catch (error) {
      dispatch(loginFail(`${error}`));
    }
    return { verified: false, approved: false };
  };
};


export const signupRequest: ThunkAction = (signupUser: Login & User) => {
  return async dispatch => {
    let newPendinguser = {};
    const { email, confirmEmail, firstName, lastName, business, phone, website } = signupUser;
    dispatch(loginRequest());
    try {
      if (email != confirmEmail) throw `'Email' must match 'Confirm Email'`;
      const user = { email, firstName, lastName, business, phone, website };
      newPendinguser = await createPendingUserInDb(user);
      dispatch(loginPending());
      // TODO: close the form to redirect user
    } catch (error) {
      dispatch(loginFail(`${error}`));
      return false;
    }
    return newPendinguser;
  };
};


export const signOutRequest: ThunkAction = () => {
  return async dispatch => {
    try {
      await logoutUser();
      dispatch(logoutRequest());
      return true;
    } catch (error) {
      return false;
    }
  };
};


export const checkAuth: ThunkAction = () => {
  return async dispatch => {
    const authenticatedUser = whoAmI();
    console.log('checkAuth * authenticatedUser :', authenticatedUser);
    if (authenticatedUser) {
      await dispatch(setUser(authenticatedUser));
      return true;
    }
    return false;
  };
};



export default {
  setUser,
  checkAuth,
  loginFail,
  loginSuccess,
  loginRequest,
  signupRequest,
  signinRequest,
  signOutRequest
};
