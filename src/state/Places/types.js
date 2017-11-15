// @flow
export const ADD_PLACE: 'ADD_PLACE' = 'ADD_PLACE';
export const REMOVE_PLACE: 'REMOVE_PLACE' = 'REMOVE_PLACE';

export type Id = string;
export type Address = {};
export type AllIds = Array<Id>;


// A place is the core object that users are concerned with but exists only within a group.
// A place has many reviews
export type Place = {|
  id: Id,
  createdBy?: Id,
  name: string,
  tagIds?: Array<Id>,
  reviewIds?: Array<Id>,
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
export type RemovePlaceAction = {| +type: typeof REMOVE_PLACE, payload: Place |};

export type Action =
  | empty
  | AddPlaceAction
  | RemovePlaceAction;

