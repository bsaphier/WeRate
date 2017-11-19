// @flow
import type { ActionCreator } from 'redux';
import type { ThunkAction } from 'redux-thunk';
import type { Err, Login, LoginRequestFailAction, LoginRequestSuccessAction } from './types';
import { LOGIN_REQUEST_FAIL, LOGIN_REQUEST_SUCCESS } from './types';
import { createUser, authenticateUser } from '../../data/auth-actions';
import { fetchingData } from '../Loader/action-creators';


// export const loginRequest: ActionCreator = (login: Login): LoginRequestAction => ({
//   type: LOGIN_REQUEST,
//   payload: login
// });

export const loginRequestFail: ActionCreator = (err: Err): LoginRequestFailAction => ({
  type: LOGIN_REQUEST_FAIL,
  payload: err
});

export const loginRequestSuccess: ActionCreator = (): LoginRequestSuccessAction => ({
  type: LOGIN_REQUEST_SUCCESS
});


export const loginRequest: ThunkAction = (login: Login) => {
  return dispatch => {
    dispatch(fetchingData());
    authenticateUser(login)
      .then(user => {
        console.log(user);
        dispatch(loginRequestSuccess());
      })
      .catch(reject => {
        console.log(reject);
        dispatch(loginRequestFail(reject));
      });
  };
};


export const signupRequest: ThunkAction = (login: Login) => {
  return dispatch => {
    dispatch(fetchingData());
    createUser(login)
      .then(user => {
        console.log(user);
        dispatch()
        dispatch(loginRequestSuccess());
      })
      .catch(reject => {
        console.log(reject);
        dispatch(loginRequestFail(reject));
      });
  };
};


export default {
  loginRequest,
  signupRequest,
  loginRequestFail,
  loginRequestSuccess
};
