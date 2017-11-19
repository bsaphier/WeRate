/* global console */// @flow
import type { ActionCreator } from 'redux';
import type { ThunkAction } from 'redux-thunk';
import type { Err, Login, LoginRequestFailAction, LoginRequestSuccessAction } from './types';
import { LOGIN_REQUEST_FAIL, LOGIN_REQUEST_SUCCESS } from './types';
import { createUser, authenticateUser } from '../../data/auth-actions';
import { fetchingData } from '../Loader/action-creators';
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


export const loginRequest: ThunkAction = (login: Login) => {
  return async dispatch => {
    dispatch(fetchingData());
    try {
      const authenticatedUser = await authenticateUser(login);
      console.log(authenticatedUser);
      const userFromDb: User = await getUserFromDb(authenticatedUser.uid);
      console.log(userFromDb);
      dispatch(loginRequestSuccess(userFromDb));
    } catch (error) {
      dispatch(loginRequestFail(error));
    }
    // authenticateUser(login)
    //   .then(user => {
    //     console.log(user);
    //     getUserFromDb()
    //     dispatch(logInSuccess());
    //     dispatch(loginRequestSuccess());
    //   })
    //   .catch(reject => {
    //     dispatch(loginRequestFail(reject));
    //   });
  };
};


export const signupRequest: ThunkAction = (login: Login) => {
  return async dispatch => {
    dispatch(fetchingData());
    try {
      const newAuthUser = await createUser(login);
      console.log(newAuthUser);
      const newUser: User = await createUserInDb(newAuthUser.uid, { email: login.email });
      dispatch(loginRequestSuccess(newUser));
    } catch (error) {
      dispatch(loginRequestFail(error));
    }
    // createUser(login)
    //   .then(user => {
    //     dispatch()
    //     dispatch(loginRequestSuccess());
    //   })
    //   .catch(reject => dispatch(loginRequestFail(reject)));
  };
};


export default {
  loginRequest,
  signupRequest,
  loginRequestFail,
  loginRequestSuccess
};
