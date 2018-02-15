// @flow
/* globals console */
import type { ActionCreator } from 'redux';
import type { ThunkAction } from 'redux-thunk';
import type { Login } from '../Auth/types';
import type { User } from '../Users/types';
import type { Root, AppRootChangedAction } from './types';
import { LOGIN_ROOT, ROOT_CHANGED, APP_ROOT } from './types';
import { checkAuth, signinRequest, signOutRequest, loginRequest, loginFail } from '../Auth/action-creators';
import { resetData, fetchInitialData } from '../Loader/action-creators';




export const changeAppRoot: ActionCreator = (root: Root): AppRootChangedAction => ({
  type: ROOT_CHANGED,
  root
});

export const appInitialized: ThunkAction = () => {
  return dispatch => {
    // this is a good place for app initialization code
    dispatch(changeAppRoot(LOGIN_ROOT));
  };
};

export const login: ThunkAction = (userCred: Login | User) => async dispatch => {
  // login/signup logic would go here, and when it's done, switch app roots
  const { verified, approved } = await dispatch(signinRequest(userCred));
  console.log('login * authActionResponse: ', { verified, approved });
  if (verified && approved) {
    /** fetchInitialData will set the Loader reducer state */
    await dispatch(fetchInitialData()); // don't wait for this in the future -> a loading screen should display at the app root
    dispatch(changeAppRoot(APP_ROOT));
  }
  return approved;
};

export const logout: ThunkAction = () => async dispatch => {
  await dispatch(signOutRequest());
  dispatch(changeAppRoot(LOGIN_ROOT));
  dispatch(resetData());
};

// export const signup: ThunkAction = (signupUser: User) => async dispatch => {
//   await dispatch(signupRequest(userCred));
// };

export const checkIfLoggedIn: ThunkAction = () => async dispatch => {
  dispatch(loginRequest());
  const signedIn = await dispatch(checkAuth());
  console.log('checkIfLoggedIn * signedIn: ', signedIn);
  if (signedIn) {
    dispatch(fetchInitialData());
    dispatch(changeAppRoot(APP_ROOT));
  } else {
    dispatch(loginFail());
  }
};


// function _LoginOrSignupGenerator(action: ActionCreator) {
//   return (userCred: Login | User | empty) => async dispatch => {
//     // login/signup logic would go here, and when it's done, we switch app roots
//     const authActionResponse = await dispatch(signinRequest(userCred));
//     if (authActionResponse) {
//       /** fetchInitialData will set the Loader reducer state */
//       await dispatch(fetchInitialData()); // don't wait for this in the future -> a loading screen should display at the app root
//       dispatch(changeAppRoot(APP_ROOT));
//     }
//     return authActionResponse;
//   };
// }


export default {
  login,
  logout,
  // signup,
  changeAppRoot,
  appInitialized,
  checkIfLoggedIn
};
