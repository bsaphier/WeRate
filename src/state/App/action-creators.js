// @flow
import type { ActionCreator } from 'redux';
import type { ThunkAction } from 'redux-thunk';
import type { Login } from '../Auth/types';
import type { User } from '../User/types';
import type { Root, PlaceFilter, FilterOrder, PlacesFilterAction, PlacesFilterOrderAction, AppRootChangedAction } from './types';
import { LOGIN_ROOT, ROOT_CHANGED, APP_ROOT, SET_PLACE_FILTER, SET_PLACE_FILTER_ORDER, FILTER_ALPH_DESCENDING, FILTER_PLACES_SHOW_ALL, FILTER_PLACES_BY_TAGS, FILTER_PLACES_BY_REVIEW_COUNT } from './types';
import { checkAuth, signupRequest, signinRequest } from '../Auth/action-creators';
import { fetchInitialData } from '../Loader/action-creators';




export const changeAppRoot: ActionCreator = (root: Root): AppRootChangedAction => ({
  type: ROOT_CHANGED,
  root
});

export const setPlaceFilter: ActionCreator = (placeFilter: PlaceFilter): PlacesFilterAction => ({
  type: SET_PLACE_FILTER,
  payload: placeFilter
});

export const setPlaceFilterOrder: ActionCreator = (order: FilterOrder): PlacesFilterOrderAction => ({
  type: SET_PLACE_FILTER_ORDER,
  payload: order
});

export const appInitialized: ThunkAction = () => {
  return dispatch => {
    // this is a good place for app initialization code
    dispatch(changeAppRoot(LOGIN_ROOT));
  };
};

export const login: ThunkAction = _LoginOrSignupGenerator(signinRequest);

export const signup: ThunkAction = _LoginOrSignupGenerator(signupRequest);

export const checkIfLoggedIn: ThunkAction = _LoginOrSignupGenerator(checkAuth);


export const resetPlaceFilter: ThunkAction = () => {
  return dispatch => {
    const placeFilter: PlaceFilter = {
      filterItems: [],
      order: FILTER_ALPH_DESCENDING,
      visibility: FILTER_PLACES_SHOW_ALL
    };
    dispatch(setPlaceFilter(placeFilter));
  };
};

export const setPlaceFilterByTags: ThunkAction = (tags: Array<any>, order: FilterOrder = FILTER_ALPH_DESCENDING) => {
  return dispatch => {
    const placeFilter: PlaceFilter = {
      filterItems: tags,
      order,
      visibility: FILTER_PLACES_BY_TAGS
    };
    dispatch(setPlaceFilter(placeFilter));
  };
};

export const setPlaceFilterByReviewCount: ThunkAction = (order: FilterOrder = FILTER_ALPH_DESCENDING) => {
  return dispatch => {
    const placeFilter: PlaceFilter = {
      filterItems: [],
      order,
      visibility: FILTER_PLACES_BY_REVIEW_COUNT
    };
    dispatch(setPlaceFilter(placeFilter));
  };
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