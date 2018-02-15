// @flow
import { combineReducers } from 'redux';
import type { Reducer } from 'redux';
import { ADD_PLACE, EDIT_PLACE, REMOVE_PLACE } from '../Places/types';
import { ADD_TAG, ADD_TAGS, REMOVE_TAG, EDIT_TAG, RESET_TAGS } from './types';
import type { AddPlaceAction, EditPlaceAction, RemovePlaceAction } from '../Places/types';
import type { AllIds, Action, Tag, TagsById, AddTagAction, AddTagsAction, EditTagAction, RemoveTagAction } from './types';



function addPlace(state: TagsById, action: AddPlaceAction): TagsById {
  const { id, tagIds } = action.payload;
  
  if (tagIds && tagIds.length > 0) {
    const nextState: TagsById = { ...state };

    tagIds.forEach(tagId => {
      const tag: Tag = state[tagId];

      // this check prevents adding tags that shouldn't exist
      if (tag) {
        const placeIds: Array<string> = (tag.placeIds && tag.placeIds.length > 0) ? tag.placeIds.concat(id) : [ id ];
        nextState[tagId] = { ...tag, placeIds };
      }
    });
    return nextState;
  } else {
    return state;
  }
}

function editPlace(state: TagsById, action: EditPlaceAction): TagsById {
  const nextState: TagsById = { ...state };
  const { id, tagIds } = action.payload;

  Object.keys(state).forEach(tagId => {
    const tag: Tag = state[tagId];
    let placeIds: Array<string> = [ ...tag.placeIds ];
    
    if (tagIds) {
      const actionPlaceIncludesThisTag: boolean = tagIds.includes(tagId);
      const tagReferenceToActionPlace: boolean = placeIds.includes(id);

      if (actionPlaceIncludesThisTag && !tagReferenceToActionPlace) {
        placeIds = placeIds.concat(id);
      } else if (!actionPlaceIncludesThisTag && tagReferenceToActionPlace) {
        placeIds = placeIds.filter(placeId => (placeId !== id));
      }
    }
    nextState[tagId] = { ...tag, placeIds };
  });
  return nextState;
}

function removePlace(state: TagsById, action: RemovePlaceAction): TagsById {
  const { id, tagIds } = action.payload;
  
  if (tagIds && tagIds.length > 0) {
    const nextState: TagsById = { ...state };

    tagIds.forEach(tagId => {
      const tag: Tag = state[tagId];
      nextState[tagId] = {
        ...tag,
        placeIds: tag.placeIds.filter(placeId => (placeId !== id))
      };
    });

    return nextState;
  } else {
    return state;
  }
}

// Admin
function addTag(state: TagsById, action: AddTagAction): TagsById {
  const { id } = action.payload;
  return {
    ...state,
    [id]: action.payload
  };
}

function editTag(state: TagsById, action: EditTagAction): TagsById {
  const { payload } = action;
  const { id } = payload;
  const prevTag = state[id];
  return {
    ...state,
    [id]: { ...prevTag, ...payload }
  };
}

// Admin
function removeTag(state: TagsById, action: RemoveTagAction): TagsById {
  const nextState: TagsById = { ...state };
  delete nextState[action.payload.id];
  return nextState;
}

// Admin
function addTags(state: TagsById, action: AddTagsAction): TagsById {
  const nextState: TagsById = { ...state };
  action.payload.forEach((tag: Tag) => {
    nextState[tag.id] = tag;
  });
  return nextState;
}


function tagsById(state: TagsById = {}, action: Action | AddPlaceAction | EditPlaceAction | RemovePlaceAction): TagsById {
  switch (action.type) {
    case ADD_PLACE:
      return addPlace(state, action);
    case EDIT_PLACE:
      return editPlace(state, action);
    case REMOVE_PLACE:
      return removePlace(state, action);
    case ADD_TAG:
      return addTag(state, action);
      case EDIT_TAG:
      return editTag(state, action);
    case REMOVE_TAG:
      return removeTag(state, action);
    case ADD_TAGS:
      return addTags(state, action);
    case RESET_TAGS:
      return {};
    default:
      (action: empty);
      return state;
  }
}


function allTags(state: AllIds = [], action: Action): AllIds {
  switch (action.type) {
    case ADD_TAG:
      return state.concat(action.payload.id);
    case EDIT_TAG:
      return state;
    case REMOVE_TAG:
      return state.filter(tagId => (tagId !== action.payload.id));
    case ADD_TAGS:
      return state.concat(action.payload.map((tag: Tag) => tag.id));
      case RESET_TAGS:
      return [];
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