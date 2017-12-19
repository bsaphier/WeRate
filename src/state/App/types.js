// @flow
export const APP_ROOT: 'root.MAIN' = 'root.MAIN';
export const LOGIN_ROOT: 'root.LOGIN' = 'root.LOGIN';
export const ROOT_CHANGED: 'ROOT_CHANGED' = 'ROOT_CHANGED';
export const SET_PLACE_FILTER: 'SET_PLACE_FILTER' = 'SET_PLACE_FILTER';
export const SET_PLACE_FILTER_ORDER: 'SET_PLACE_FILTER_ORDER' = 'SET_PLACE_FILTER_ORDER';

export const FILTER_ASCENDING: 'filter.order.ascending' = 'filter.order.ascending';
export const FILTER_DESCENDING: 'filter.order.descending' = 'filter.order.descending';
export const FILTER_PLACES_BY_TAGS: 'filter.places.byTags' = 'filter.places.byTags';
export const FILTER_PLACES_SHOW_ALL: 'filter.places.showAll' = 'filter.places.showAll';
export const FILTER_PLACES_BY_REVIEW_COUNT: 'filter.places.byReviewCount' = 'filter.places.byReviewCount';


export type FilterOrder =
  | typeof FILTER_ASCENDING
  | typeof FILTER_DESCENDING;

export type PlaceFilterVisibility =
  | typeof FILTER_PLACES_BY_TAGS
  | typeof FILTER_PLACES_SHOW_ALL
  | typeof FILTER_PLACES_BY_REVIEW_COUNT;

export type PlaceFilter = {|
  order: FilterOrder,
  filterItems: Array<any>,
  visibility: PlaceFilterVisibility
|};


export type Root = typeof APP_ROOT | typeof LOGIN_ROOT | void;

export type rootState = {| +root: Root, +placeFilter: PlaceFilter |};


export type AppRootChangedAction = {| +type: typeof ROOT_CHANGED, root: Root |};
export type PlacesFilterAction = {| +type: typeof SET_PLACE_FILTER, payload: PlaceFilter |};
export type PlacesFilterOrderAction = {| +type: typeof SET_PLACE_FILTER_ORDER, order: FilterOrder |};


export type Action =
  | empty
  | PlacesFilterAction
  | AppRootChangedAction
  | PlacesFilterOrderAction;
