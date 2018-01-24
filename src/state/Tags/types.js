// @flow
export const ADD_TAG: 'ADD_TAG' = 'ADD_TAG';
export const ADD_TAGS: 'ADD_TAGS' = 'ADD_TAGS';
export const EDIT_TAG: 'EDIT_TAG' = 'EDIT_TAG';
export const REMOVE_TAG: 'REMOVE_TAG' = 'REMOVE_TAG';


export type Id = string;
export type AllIds = Array<Id>;


// A tag is a tag for places.
// A tag can have many places & a place can have many tags.
export type Tag = {|
  id: Id,
  title: string,
  placeIds: Array<any>
|};

export type Tags = Array<Tag>;
export type TagsById = { [id: Id]: Tag };

export type tagsState = {|
  byId: TagsById,
  allIds: AllIds
|};


export type AddTagAction = {| +type: typeof ADD_TAG, payload: Tag |};
export type AddTagsAction = {| +type: typeof ADD_TAGS, payload: Tags |};
export type EditTagAction = {| +type: typeof EDIT_TAG, payload: Tag |};
export type RemoveTagAction = {| +type: typeof REMOVE_TAG, payload: Tag |};

export type Action =
  | empty
  | AddTagAction
  | AddTagsAction
  | EditTagAction
  | RemoveTagAction;
