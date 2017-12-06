// @flow
import type { ActionCreator } from 'redux';
import type { ThunkAction } from 'redux-thunk';
import type { Login } from '../Auth/types';
import type { Root, AppRootChangedAction } from './types';
import { LOGIN_ROOT, ROOT_CHANGED, APP_ROOT } from './types';
import { checkAuth, signInRequest } from '../Auth/action-creators';
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


export const login: ThunkAction = (login: Login) => {
  return async dispatch => {
    // login logic would go here, and when it's done, we switch app roots
    const signInSuccess = await dispatch(signInRequest(login));
    if (signInSuccess) {
      dispatch(fetchInitialData()); // no need to wait for this as loading screen will display
      dispatch(changeAppRoot(APP_ROOT));
    }
  };
};


export const checkIfLoggedIn: ThunkAction = () => {
  return async dispatch => {
    const loggedInUser = await dispatch(checkAuth());
    if (loggedInUser) {
      dispatch(fetchInitialData()); // no need to wait for this as loading screen will display
      dispatch(changeAppRoot(APP_ROOT));
    }
    return loggedInUser;
  };
};



export default {
  login,
  changeAppRoot,
  appInitialized,
  checkIfLoggedIn
};