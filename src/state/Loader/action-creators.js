// @flow
import { FETCHING_DATA, FETCHING_DATA_FAIL, FETCHING_DATA_SUCCESS } from './types';
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


export const fetchData = (): ThunkAction => {
  return dispatch => {
    dispatch(fetchingData());
  };
};


export default {
  fetchData,
  fetchingData,
  fetchSuccess,
  fetchingFailed
};
