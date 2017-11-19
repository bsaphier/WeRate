// @flow
export const FETCHING_DATA: 'FETCHING_DATA' = 'FETCHING_DATA';
export const FETCHING_DATA_FAIL: 'FETCHING_DATA_FAIL' = 'FETCHING_DATA_FAIL';
export const FETCHING_DATA_SUCCESS: 'FETCHING_DATA_SUCCESS' = 'FETCHING_DATA_SUCCESS';


export type Err = string;

export type loaderState = {
  +isFetching: boolean,
  +hasError: boolean,
  +errorMessage: Err,
  +initialStateLoaded: boolean
};

export type FetchDataAction = {| +type: typeof FETCHING_DATA |};
export type FetchDataFailAction = {| +type: typeof FETCHING_DATA_FAIL, error: any |};
export type FetchDataSuccessAction = {| +type: typeof FETCHING_DATA_SUCCESS |};

export type Action =
  | empty
  | FetchDataAction
  | FetchDataFailAction
  | FetchDataSuccessAction;
