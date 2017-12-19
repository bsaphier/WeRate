// @flow
import type { ActionCreator } from 'redux';
import type { ThunkAction } from 'redux-thunk';
import type { Login } from '../Auth/types';
import type { Root, PlaceFilter, FilterOrder, PlacesFilterAction, PlacesFilterOrderAction, AppRootChangedAction } from './types';
import { LOGIN_ROOT, ROOT_CHANGED, APP_ROOT, SET_PLACE_FILTER, SET_PLACE_FILTER_ORDER, FILTER_DESCENDING, FILTER_PLACES_SHOW_ALL, FILTER_PLACES_BY_TAGS, FILTER_PLACES_BY_REVIEW_COUNT } from './types';
import { checkAuth, signInRequest } from '../Auth/action-creators';
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
  order
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


export const resetPlaceFilter: ThunkAction = () => {
  return dispatch => {
    const placeFilter: PlaceFilter = {
      filterItems: [],
      order: FILTER_DESCENDING,
      visibility: FILTER_PLACES_SHOW_ALL
    };
    dispatch(setPlaceFilter(placeFilter));
  };
};


export const setPlaceFilterByTags: ThunkAction = (tags: Array<any>, order: FilterOrder = FILTER_DESCENDING) => {
  return dispatch => {
    const placeFilter: PlaceFilter = {
      filterItems: tags,
      order,
      visibility: FILTER_PLACES_BY_TAGS
    };
    dispatch(setPlaceFilter(placeFilter));
  };
};


export const setPlaceFilterByReviewCount: ThunkAction = (order: FilterOrder = FILTER_DESCENDING) => {
  return dispatch => {
    const placeFilter: PlaceFilter = {
      filterItems: [],
      order,
      visibility: FILTER_PLACES_BY_REVIEW_COUNT
    };
    dispatch(setPlaceFilter(placeFilter));
  };
};



export default {
  login,
  changeAppRoot,
  appInitialized,
  checkIfLoggedIn
};