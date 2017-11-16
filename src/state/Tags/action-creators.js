// @flow
import { ADD_TAG, REMOVE_TAG } from './types';
import { createTagInDb, deleteTagFromDb, loadAllTagsFromDb } from '../../data/firestore-actions';
import type { Tag, Tags, AddTagAction, RemoveTagAction } from './types';
import type { ThunkAction } from 'redux-thunk';
import type { ActionCreator } from 'redux';


export const addTag: ActionCreator = (tag: Tag): AddTagAction => ({
  type: ADD_TAG,
  payload: tag
});


export const removeTag: ActionCreator = (tag: Tag): RemoveTagAction => ({
  type: REMOVE_TAG,
  payload: tag
});


export const loadAllTags: ThunkAction = () => {
  return dispatch => {
    return loadAllTagsFromDb()
      .then((allTags: Tags) => {
        allTags.forEach((tag: Tag) => {
          dispatch(addTag(tag));
        });
      });
  };
};


export const createTag: ThunkAction = (tag: Tag) => {
  return dispatch => {
    return createTagInDb(tag)
      .then((newTag: Tag): Tag => {
        dispatch(addTag(newTag));
        return newTag;
      });
  };
};


export const deleteTag: ThunkAction = (tag: Tag) => {
  return dispatch => {
    return deleteTagFromDb(tag.id)
      .then(() => dispatch(removeTag(tag)));
  };
};


export default {
  addTag,
  removeTag,
  createTag,
  deleteTag,
  loadAllTags
};
