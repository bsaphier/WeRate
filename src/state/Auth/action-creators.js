// @flow
/* globals console */
import type { ActionCreator } from 'redux';
import type { ThunkAction } from 'redux-thunk';
import type { Err, Login, LoginRequestAction, LoginPendingAction, LogoutRequestAction, LoginRequestFailAction, LoginRequestSuccessAction } from './types';
import type { User } from '../Users/types';
import { LOGIN_REQUEST, LOGOUT_REQUEST, LOGIN_PENDING, LOGIN_REQUEST_FAIL, LOGIN_REQUEST_SUCCESS } from './types';
import { whoAmI, logoutUser, signInWithEmailAndPassword } from '../../utils/auth-actions';
import { getUserFromDb, createPendingUserInDb } from '../../utils/firestore-actions';
import { LOGIN_ROOT } from '../App/types';
import { changeAppRoot } from '../App/action-creators';



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
      } else {
        dispatch(loginPending());
      }
    } catch (error) {
      dispatch(loginFail(`${error}`));
    }
  };
};


export const signinRequest: ThunkAction = (login: Login) => {
  return async dispatch => {
    dispatch(loginRequest());
    try {
      const { user: signedInUser } = await signInWithEmailAndPassword(login);
      console.log('signinRequest * signedInUser: ', signedInUser);
      await dispatch(setUser(signedInUser));
      return true;
    } catch (error) {
      dispatch(loginFail(`${error}`));
    }
    return false;
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
    }
    return newPendinguser;
  };
};

// export const signupConfirm: ThunkAction = (signupUser: Login & User) => {
//   return async dispatch => {
//     const { email, password, confirmPassword, firstName, lastName, business, phone, website } = signupUser;
//     const user = { email, firstName, lastName, business, phone, website };
//     dispatch(loginRequest());
//     try {
//       if (password != confirmPassword) {
//         throw `'Password' must match 'Confirm Password'`;
//       }
//       const newAuthUser = await createAuthUser(user);
//       ************
//       const newUser = await createUserInDb({ ...user, uid: newAuthUser.uid });
//       dispatch(loginSuccess(newUser));
//     } catch (error) {
//       dispatch(loginFail(`${error}`));
//     }
//   };
// };


export const logout: ThunkAction = () => {
  return async dispatch => {
    await logoutUser();
    dispatch(logoutRequest());
    dispatch(changeAppRoot(LOGIN_ROOT));
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
  logout,
  setUser,
  checkAuth,
  loginFail,
  loginSuccess,
  loginRequest,
  signupRequest,
  signinRequest,
  // signupConfirm
};
