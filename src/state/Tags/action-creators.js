// @flow
import { ADD_TAG, ADD_TAGS, EDIT_TAG, REMOVE_TAG } from './types';
import { createTagInDb, deleteTagFromDb, modifyTagInDb } from '../../utils/firestore-actions';
import type { Tag, Tags, AddTagAction, AddTagsAction, EditTagAction, RemoveTagAction } from './types';
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
  return async dispatch => {
    await deleteTagFromDb(tag.id);
    dispatch(removeTag(tag));
  };
};



export default {
  addTag,
  addTags,
  removeTag,
  createTag,
  deleteTag
};
