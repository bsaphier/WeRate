// @flow
export const ADD_PLACE: 'ADD_PLACE' = 'ADD_PLACE';
export const ADD_PLACES: 'ADD_PLACES' = 'ADD_PLACES';
export const REMOVE_PLACE: 'REMOVE_PLACE' = 'REMOVE_PLACE';

export type Id = string;
export type Address = {};
export type AllIds = Array<Id>;


// A place is the core object that users are concerned with but exists only within a group.
// A place has many reviews
export type Place = {|
  id: Id,
  createdBy?: any,
  name: string,
  tagIds?: Array<any>,
  reviewIds?: Array<any>,
  description?: string,
  address?: Address,
  phone1?: string,
  phone2?: string,
  email?: string,
  website?: string
|};

export type Places = Array<Place>;
export type PlacesById = { [id: Id]: Place };


export type placesState = {|
  byId: PlacesById,
  allIds: AllIds
|};


export type AddPlaceAction = {| +type: typeof ADD_PLACE, payload: Place |};
export type AddPlacesAction = {| +type: typeof ADD_PLACES, payload: Places |};
export type RemovePlaceAction = {| +type: typeof REMOVE_PLACE, payload: Place |};

export type Action =
  | empty
  | AddPlaceAction
  | AddPlacesAction
  | RemovePlaceAction;

