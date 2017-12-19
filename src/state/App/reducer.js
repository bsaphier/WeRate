// @flow
import { ROOT_CHANGED, SET_PLACE_FILTER, SET_PLACE_FILTER_ORDER, FILTER_DESCENDING, FILTER_PLACES_SHOW_ALL } from './types';
import type { Action, rootState } from './types';



const INIT_STATE: rootState = {
  root: undefined,
  placeFilter: {
    filterItems: [],
    order: FILTER_DESCENDING,
    visibility: FILTER_PLACES_SHOW_ALL
  }
};


export default function (state: rootState = INIT_STATE, action: Action): rootState {
  switch (action.type) {

    case ROOT_CHANGED:
      return {
        root: action.root,
        placeFilter: { ...state.placeFilter }
      };

    case SET_PLACE_FILTER:
      return {
        root: state.root,
        placeFilter: action.payload
      };

    case SET_PLACE_FILTER_ORDER:
      return {
        root: state.root,
        placeFilter: {
          ...state.placeFilter,
          order: action.order
        }
      };

    default:
      (action: empty);
      return state;
  }
}
