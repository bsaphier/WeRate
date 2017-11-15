// @flow
export const ADD_TAG: 'ADD_TAG' = 'ADD_TAG';
export const REMOVE_TAG: 'REMOVE_TAG' = 'REMOVE_TAG';


export type Id = string;
export type AllIds = Array<Id>;


// A tag is a tag for places.
// A tag can have many places & a place can have many tags.
export type Tag = {|
  +id: Id,
  title: string,
  placeIds: Array<string>
|};

export type Tags = Array<Tag>;
export type TagsById = { [id: Id]: Tag };

export type tagsState = {|
  byId: TagsById,
  allIds: AllIds
|};


export type AddTagAction = {| +type: typeof ADD_TAG, payload: Tag |};
export type RemoveTagAction = {| +type: typeof REMOVE_TAG, payload: Tag |};

export type Action =
  | empty
  | AddTagAction
  | RemoveTagAction;
