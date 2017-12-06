// @flow
import { FETCHING_DATA, FETCHING_DATA_FAIL, FETCHING_DATA_SUCCESS } from './types';
import { actionCreators as tagActions } from '../Tags';
import { actionCreators as placeActions } from '../Places';
import { actionCreators as reviewActions } from '../Reviews';
import { loadAllTagsFromDb, loadAllPlacesFromDb, loadAllReviewsFromDb } from '../../utils/firestore-actions';
import type { Err, FetchDataAction, FetchDataFailAction, FetchDataSuccessAction } from './types';
import type { ThunkAction } from 'redux-thunk';
import type { ActionCreator } from 'redux';



export const fetchingData: ActionCreator = (): FetchDataAction => ({
  type: FETCHING_DATA
});

export const fetchingFailed: ActionCreator = (err: Err): FetchDataFailAction => ({
  type: FETCHING_DATA_FAIL,
  error: err
});

export const fetchSuccess: ActionCreator = (): FetchDataSuccessAction => ({
  type: FETCHING_DATA_SUCCESS
});



export const fetchInitialData: ThunkAction = () => {
  return async (dispatch, getState) => {
    const appHasInitialized = getState().fetch.initialStateLoaded;

    if (!appHasInitialized) {
      dispatch(fetchingData());
      
      const allPlaces = await loadAllPlacesFromDb();
      dispatch(placeActions.addPlaces(allPlaces));
  
      const allReviews = await loadAllReviewsFromDb();
      dispatch(reviewActions.addReviews(allReviews));
  
      const allTags = await loadAllTagsFromDb();
      dispatch(tagActions.addTags(allTags));
  
      dispatch(fetchSuccess());
    }
  };
};



export default {
  fetchingData,
  fetchSuccess,
  fetchingFailed,
  fetchInitialData
};
