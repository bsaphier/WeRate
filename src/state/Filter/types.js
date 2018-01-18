// @flow
export const SET_PLACE_FILTER: 'SET_PLACE_FILTER' = 'SET_PLACE_FILTER';
export const SET_PLACE_FILTER_ORDER: 'SET_PLACE_FILTER_ORDER' = 'SET_PLACE_FILTER_ORDER';

export const FILTER_ALPH_ASCENDING: 'filter.order.alphabetically.ascending' = 'filter.order.alphabetically.ascending';
export const FILTER_ALPH_DESCENDING: 'filter.order.alphabetically.descending' = 'filter.order.alphabetically.descending';
export const FILTER_RATING_ASCENDING: 'filter.order.rating.ascending' = 'filter.order.rating.ascending';
export const FILTER_RATING_DESCENDING: 'filter.order.rating.descending' = 'filter.order.rating.descending';
export const FILTER_PLACES_BY_TAGS: 'filter.places.byTags' = 'filter.places.byTags';
export const FILTER_PLACES_SHOW_ALL: 'filter.places.showAll' = 'filter.places.showAll';
export const FILTER_PLACES_BY_REVIEW_COUNT: 'filter.places.byReviewCount' = 'filter.places.byReviewCount';


export type FilterOrder =
  | typeof FILTER_ALPH_ASCENDING
  | typeof FILTER_ALPH_DESCENDING
  | typeof FILTER_RATING_ASCENDING
  | typeof FILTER_RATING_DESCENDING;

export type PlaceFilterVisibility =
  | typeof FILTER_PLACES_BY_TAGS
  | typeof FILTER_PLACES_SHOW_ALL
  | typeof FILTER_PLACES_BY_REVIEW_COUNT;

export type PlaceFilter = {
  order: FilterOrder,
  filterItems: Array<any>,
  visibility: PlaceFilterVisibility
};


export type PlacesFilterAction = {| +type: typeof SET_PLACE_FILTER, payload: PlaceFilter |};
export type PlacesFilterOrderAction = {| +type: typeof SET_PLACE_FILTER_ORDER, payload: FilterOrder |};


export type Action =
  | empty
  | PlacesFilterAction
  | PlacesFilterOrderAction;
