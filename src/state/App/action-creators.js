// @flow
import type { ActionCreator } from 'redux';
import type { ThunkAction } from 'redux-thunk';
import type { Login } from '../Auth/types';
import type { User } from '../Users/types';
import type { Root, AppRootChangedAction } from './types';
import { LOGIN_ROOT, ROOT_CHANGED, APP_ROOT } from './types';
import { checkAuth, signupRequest, signinRequest, loginRequest } from '../Auth/action-creators';
import { fetchInitialData } from '../Loader/action-creators';




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

export const login: ThunkAction = _LoginOrSignupGenerator(signinRequest);

export const signup: ThunkAction = _LoginOrSignupGenerator(signupRequest);

export const checkIfLoggedIn: ThunkAction = () => async dispatch => {
  dispatch(loginRequest());
  const signedIn = await dispatch(checkAuth());
  if (signedIn) {
    dispatch(fetchInitialData());
    dispatch(changeAppRoot(APP_ROOT));
  }
};


function _LoginOrSignupGenerator(action: ActionCreator) {
  return (userCred: Login | User | empty) => async dispatch => {
    // login/signup logic would go here, and when it's done, we switch app roots
    const authActionResponse = await dispatch(action(userCred));
    if (authActionResponse) {
      /** fetchInitialData will set the Loader reducer state */
      await dispatch(fetchInitialData()); // don't wait for this in the future -> a loading screen should display at the app root
      dispatch(changeAppRoot(APP_ROOT));
    }
    return authActionResponse;
  };
}


export default {
  login,
  signup,
  changeAppRoot,
  appInitialized,
  checkIfLoggedIn
};
