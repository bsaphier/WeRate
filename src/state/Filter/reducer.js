// @flow
import { SET_PLACE_FILTER, SET_PLACE_FILTER_VIS, SET_PLACE_FILTER_ORDER, FILTER_ALPH_DESCENDING, FILTER_PLACES_SHOW_ALL, SET_PLACE_FILTER_STR } from './types';
import type { Action, filterState } from './types';



const INIT_STATE: filterState = {
  searchString: '',
  filterItems: [], // Tag ids
  order: FILTER_ALPH_DESCENDING,
  visibility: FILTER_PLACES_SHOW_ALL
};


export default function (state: filterState = INIT_STATE, action: Action): filterState {
  switch (action.type) {

    case SET_PLACE_FILTER:
      return { ...state, ...action.payload };

    case SET_PLACE_FILTER_STR:
      return { ...state, searchString: action.payload };

    case SET_PLACE_FILTER_VIS:
      return { ...state, visibility: action.payload };

    case SET_PLACE_FILTER_ORDER:
      return { ...state, order: action.payload };

    default:
      (action: empty);
      return state;
  }
}
