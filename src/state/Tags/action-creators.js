// @flow
/* globals console */
import { editPlace } from '../Places/action-creators';
import { ADD_TAG, ADD_TAGS, EDIT_TAG, RESET_TAGS, REMOVE_TAG } from './types';
import { createTagInDb, deleteTagFromDb, modifyTagInDb } from '../../utils/firestore-actions';
import type { Tag, Tags, AddTagAction, AddTagsAction, EditTagAction, ResetTagsAction, RemoveTagAction } from './types';
import type { ThunkAction } from 'redux-thunk';
import type { ActionCreator } from 'redux';



export const addTag: ActionCreator = (tag: Tag): AddTagAction => ({
  type: ADD_TAG,
  payload: tag
});

export const modifyTag: ActionCreator = (tag: Tag): EditTagAction => ({
  type: EDIT_TAG,
  payload: tag
});

export const removeTag: ActionCreator = (tag: Tag): RemoveTagAction => ({
  type: REMOVE_TAG,
  payload: tag
});


export const addTags: ActionCreator = (tags: Tags): AddTagsAction => ({
  type: ADD_TAGS,
  payload: tags
});


export const resetTags: ActionCreator = (): ResetTagsAction => ({
  type: RESET_TAGS
});



export const createTag: ThunkAction = (tag: Tag) => {
  return async dispatch => {
    const newTag = await createTagInDb(tag);
    dispatch(addTag(newTag));
    return newTag;
  };
};


export const editTag: ThunkAction = (tag: Tag) => {
  return async dispatch => {
    try {
      await modifyTagInDb(tag);
      dispatch(modifyTag(tag));
    } catch (error) {
      console.log('editTag', error);
    }
  };
};


export const deleteTag: ThunkAction = (tag: Tag) => {
  return async (dispatch, getState) => {
    const { places } = getState();
    const { placeIds } = tag;
    try {
      await deleteTagFromDb(tag.id);
      dispatch(removeTag(tag));
      placeIds.forEach(placeId => {
        const place = places[placeId];
        const { tagIds } = place;
        const updatedTagIds = tagIds.filter(tagId => tag.id !== tagId);
        dispatch(editPlace({ ...place, tagIds: updatedTagIds }));
      });
    } catch (error) {
      console.log('editTag', error);
    }
  };
};



export default {
  addTag,
  addTags,
  removeTag,
  createTag,
  deleteTag,
  resetTags
};
