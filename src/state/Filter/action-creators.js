// @flow
import type { ActionCreator } from 'redux';
import type { ThunkAction } from 'redux-thunk';
import type { Tag } from '../Tags/types';
import type { filterState, FilterOrder, FilterVisibility, PlacesFilterAction, PlacesFilterTagsAction, PlacesFilterOrderAction, PlacesFilterStringAction, PlacesFilterVisibilityAction } from './types';
import { SET_PLACE_FILTER, SET_PLACE_FILTER_VIS, SET_PLACE_FILTER_TAGS, SET_PLACE_FILTER_ORDER, FILTER_ALPH_ASCENDING, FILTER_ALPH_DESCENDING, FILTER_RATING_ASCENDING, FILTER_PLACES_SHOW_ALL, FILTER_PLACES_BY_TAGS, FILTER_PLACES_BY_NAME, FILTER_RATING_DESCENDING, SET_PLACE_FILTER_STR } from './types';



export const setPlaceFilter: ActionCreator = (placeFilter: filterState): PlacesFilterAction => ({
  type: SET_PLACE_FILTER,
  payload: placeFilter
});

export const setPlaceFilterVis: ActionCreator = (visibility: FilterVisibility): PlacesFilterVisibilityAction => ({
  type: SET_PLACE_FILTER_VIS,
  payload: visibility
});

export const setPlaceFilterOrder: ActionCreator = (order: FilterOrder): PlacesFilterOrderAction => ({
  type: SET_PLACE_FILTER_ORDER,
  payload: order
});

export const setPlaceFilterTags: ActionCreator = (tags: Array<Tag>): PlacesFilterTagsAction => ({
  type: SET_PLACE_FILTER_TAGS,
  payload: tags
});

export const setPlaceFilterSearchString: ActionCreator = (searchString: string): PlacesFilterStringAction => ({
  type: SET_PLACE_FILTER_STR,
  payload: searchString
});


export const filterPlacesByTags: ThunkAction = _VisPlacesGenerator(FILTER_PLACES_BY_TAGS);

export const filterPlacesByName: ThunkAction = _VisPlacesGenerator(FILTER_PLACES_BY_NAME);

export const filterPlacesShowAll: ThunkAction = _VisPlacesGenerator(FILTER_PLACES_SHOW_ALL);

export const orderPlacesByNameAsc: ThunkAction = _OrderPlacesGenerator(FILTER_ALPH_ASCENDING);

export const orderPlacesByNameDes: ThunkAction = _OrderPlacesGenerator(FILTER_ALPH_DESCENDING);

export const orderPlacesByReviewAvgAsc: ThunkAction = _OrderPlacesGenerator(FILTER_RATING_ASCENDING);

export const orderPlacesByReviewAvgDsc: ThunkAction = _OrderPlacesGenerator(FILTER_RATING_DESCENDING);

export const resetPlaceFilter: ThunkAction = () => {
  return dispatch => {
    const placeFilter: filterState = {
      searchString: '',
      filterItems: [],
      order: FILTER_ALPH_DESCENDING,
      visibility: FILTER_PLACES_SHOW_ALL
    };
    dispatch(setPlaceFilter(placeFilter));
  };
};

export default {
  resetPlaceFilter,
  setPlaceFilter,
  setPlaceFilterVis,
  setPlaceFilterOrder,
  setPlaceFilterTags,
  setPlaceFilterSearchString,
  filterPlacesByTags,
  filterPlacesByName,
  filterPlacesShowAll,
  orderPlacesByNameAsc,
  orderPlacesByNameDes,
  orderPlacesByReviewAvgAsc,
  orderPlacesByReviewAvgDsc,
};


function _VisPlacesGenerator(filter) {
  return () => dispatch => {
    dispatch(setPlaceFilterVis(filter));
  };
}

function _OrderPlacesGenerator(filter) {
  return () => dispatch => {
    dispatch(setPlaceFilterOrder(filter));
  };
}
