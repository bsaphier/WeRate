// @flow
import { ADD_TAG, REMOVE_TAG } from './types';
import type { Tag, AddTagAction, RemoveTagAction } from './types';
import type { ActionCreator } from 'redux';


export const addTag: ActionCreator = (tag: Tag): AddTagAction => ({
  type: ADD_TAG,
  payload: tag
});


export const removeTag: ActionCreator = (tag: Tag): RemoveTagAction => ({
  type: REMOVE_TAG,
  payload: tag
});


export default {
  addTag,
  removeTag
};
