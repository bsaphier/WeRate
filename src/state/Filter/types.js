// @flow
import type { Tag } from '../Tags/types';

export const SET_PLACE_FILTER: 'SET_PLACE_FILTER' = 'SET_PLACE_FILTER';
export const SET_PLACE_FILTER_STR: 'SET_PLACE_FILTER_STR' = 'SET_PLACE_FILTER_STR';
export const SET_PLACE_FILTER_VIS: 'SET_PLACE_FILTER_VIS' = 'SET_PLACE_FILTER_VIS';
export const SET_PLACE_FILTER_TAGS: 'SET_PLACE_FILTER_TAGS' = 'SET_PLACE_FILTER_TAGS';
export const SET_PLACE_FILTER_ORDER: 'SET_PLACE_FILTER_ORDER' = 'SET_PLACE_FILTER_ORDER';

export const FILTER_ALPH_ASCENDING: 'filter.order.alphabetically.ascending' = 'filter.order.alphabetically.ascending';
export const FILTER_ALPH_DESCENDING: 'filter.order.alphabetically.descending' = 'filter.order.alphabetically.descending';
export const FILTER_RATING_ASCENDING: 'filter.order.rating.ascending' = 'filter.order.rating.ascending';
export const FILTER_RATING_DESCENDING: 'filter.order.rating.descending' = 'filter.order.rating.descending';
export const FILTER_PLACES_BY_TAGS: 'filter.places.byTags' = 'filter.places.byTags';
export const FILTER_PLACES_BY_NAME: 'filter.places.byName' = 'filter.places.byName';
export const FILTER_PLACES_SHOW_ALL: 'filter.places.showAll' = 'filter.places.showAll';



export type FilterOrder =
  | typeof FILTER_ALPH_ASCENDING
  | typeof FILTER_ALPH_DESCENDING
  | typeof FILTER_RATING_ASCENDING
  | typeof FILTER_RATING_DESCENDING;

export type FilterVisibility =
  | typeof FILTER_PLACES_BY_TAGS
  | typeof FILTER_PLACES_BY_NAME
  | typeof FILTER_PLACES_SHOW_ALL;

export type filterState = {
  searchString: string,
  order: FilterOrder,
  filterItems: Array<any>,
  visibility: FilterVisibility
};


export type PlacesFilterAction = {| +type: typeof SET_PLACE_FILTER, payload: filterState |};
export type PlacesFilterTagsAction = {| +type: typeof SET_PLACE_FILTER_TAGS, payload: Array<Tag> |};
export type PlacesFilterOrderAction = {| +type: typeof SET_PLACE_FILTER_ORDER, payload: FilterOrder |};
export type PlacesFilterStringAction = {| +type: typeof SET_PLACE_FILTER_STR, payload: string |};
export type PlacesFilterVisibilityAction = {| +type: typeof SET_PLACE_FILTER_VIS, payload: FilterVisibility |};


export type Action =
  | empty
  | PlacesFilterAction
  | PlacesFilterTagsAction
  | PlacesFilterOrderAction
  | PlacesFilterStringAction
  | PlacesFilterVisibilityAction;
