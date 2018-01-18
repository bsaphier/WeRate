// @flow
import { ROOT_CHANGED, SET_PLACE_FILTER, SET_PLACE_FILTER_ORDER, FILTER_ALPH_DESCENDING, FILTER_PLACES_SHOW_ALL } from './types';
import type { Action, rootState } from './types';



const INIT_STATE: rootState = {
  root: undefined,
  placeFilter: {
    filterType: '',
    filterItems: [], // Tag ids
    order: FILTER_ALPH_DESCENDING,
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
        placeFilter: {
          ...state.placeFilter,
          ...action.payload
        }
      };

    case SET_PLACE_FILTER_ORDER:
      return {
        root: state.root,
        placeFilter: {
          ...state.placeFilter,
          order: action.payload
        }
      };

    default:
      (action: empty);
      return state;
  }
}
