// @flow
import { combineReducers } from 'redux';
import type { Reducer } from 'redux';
import { ADD_PLACE, REMOVE_PLACE } from '../Places/types';
import { ADD_TAG, REMOVE_TAG } from './types';
import type { AddPlaceAction, RemovePlaceAction } from '../Places/types';
import type { AllIds, Action, Tag, TagsById, AddTagAction, RemoveTagAction } from './types';


function addPlace(state: TagsById, action: AddPlaceAction): TagsById {
  const { id, tagIds } = action.payload;
  
  if (tagIds) {
    const nextState: TagsById = { ...state };

    tagIds.forEach(tagId => {
      const tag: Tag = state[tagId];
      nextState[tagId] = {
        ...tag,
        placeIds: tag.placeIds.concat(id)
      };
    });

    return nextState;
  }
  else return state;
}


function removePlace(state: TagsById, action: RemovePlaceAction): TagsById {
  const { id, tagIds } = action.payload;
  
  if (tagIds) {
    const nextState: TagsById = { ...state };

    tagIds.forEach(tagId => {
      const tag: Tag = state[tagId];
      nextState[tagId] = {
        ...tag,
        placeIds: tag.placeIds.filter(placeId => (placeId !== id))
      }
    });

    return nextState;
  }
  else return state;
}


function addTag(state: TagsById, action: AddTagAction): TagsById {
  const { id } = action.payload;
  return {
    ...state,
    [id]: action.payload
  };
}


function removeTag(state: TagsById, action: RemoveTagAction): TagsById {
  const nextState: TagsById = { ...state };
  delete nextState[action.payload.id];
  return nextState;
}


function tagsById(state: TagsById = {}, action: Action | AddPlaceAction | RemovePlaceAction): TagsById {
  switch (action.type) {
    case ADD_PLACE:
      return addPlace(state, action);
    case REMOVE_PLACE:
      return removePlace(state, action);
    case ADD_TAG:
      return addTag(state, action);
    case REMOVE_TAG:
      return removeTag(state, action);
    default:
      (action: empty);
      return state;
  }
}


function allTags(state: AllIds = [], action: Action): AllIds {
  switch (action.type) {
    case ADD_TAG:
      return state.concat(action.payload.id);
    case REMOVE_TAG:
      return state.filter(tagId => (tagId !== action.payload.id));
    default:
      (action: empty);
      return state;
  }
}


const tagsReducer: Reducer = combineReducers({
  byId: tagsById,
  allIds: allTags
});

export default tagsReducer;