// @flow
import { combineReducers } from 'redux';
import { ADD_PLACE, REMOVE_PLACE } from './types';
import { ADD_REVIEW, REMOVE_REVIEW } from '../Reviews/types';
import { ADD_TAG, REMOVE_TAG } from '../Tags/types';
import type { Reducer } from 'redux';
import type { AddReviewAction, RemoveReviewAction } from '../Reviews/types';
import type { AddTagAction, RemoveTagAction } from '../Tags/types';
import type { AllIds, Place, Action, PlacesById, AddPlaceAction, RemovePlaceAction } from './types';


function addReview(state: PlacesById, action: AddReviewAction): PlacesById {
  const { id, placeId } = action.payload;
  const place: Place = state[placeId];

  if (place.reviewIds && place.reviewIds.length) {
    return {
      ...state,
      [placeId]: {
        ...place,
        reviewIds: place.reviewIds.concat(id)
      }
    };
  }
  else return state;
}


function removeReview(state: PlacesById, action: RemoveReviewAction): PlacesById {
  const { id, placeId } = action.payload;
  const place: Place = state[placeId];

  if (place.reviewIds && place.reviewIds.length) {
    return {
      ...state,
      [placeId]: {
        ...place,
        reviewIds: place.reviewIds.filter(reviewId => (id !== reviewId))
      }
    };
  }
  else return state;
}


function addTag(state: PlacesById, action: AddTagAction): PlacesById {
  const { payload } = action;
  const { id, placeIds } = payload;

  if (placeIds && placeIds.length) {
    const nextState: PlacesById = { ...state };
  
    placeIds.forEach(placeId => {
      const place: Place = state[placeId];
      const tagIds = (place.tagIds) ? place.tagIds.concat(id) : [id];
      nextState[placeId] = {
        ...place,
        tagIds
      };
    });
    return nextState;
  }
  else return state;
}


function removeTag(state: PlacesById, action: RemoveTagAction): PlacesById {
  const { payload } = action;
  const { id, placeIds } = payload;

  if (placeIds && placeIds.length) {
    const nextState: PlacesById = { ...state };

    placeIds.forEach(placeId => {
      const place: Place = state[placeId];
      const tagIds = (place.tagIds) ? place.tagIds.filter(tagId => (tagId !== id)) : [];
      nextState[placeId] = {
        ...place,
        tagIds
      };
    });
    return nextState;
  }
  else return state;
}


function addPlace(state: PlacesById, action: AddPlaceAction): PlacesById {
  const { id } = action.payload;
  return {
    ...state,
    [id]: action.payload
  };
}


function removePlace(state: PlacesById, action: RemovePlaceAction): PlacesById {
  const nextState: PlacesById = { ...state };
  delete nextState[action.payload.id];
  return nextState;
}


function placesById(state: PlacesById = {}, action: Action | AddReviewAction | AddTagAction | RemoveTagAction | RemoveReviewAction): PlacesById {
  switch(action.type) {
    case ADD_REVIEW:
      return addReview(state, action);
    case REMOVE_REVIEW:
      return removeReview(state, action);
    case ADD_TAG:
      return addTag(state, action);
    case REMOVE_TAG:
      return removeTag(state, action);
    case ADD_PLACE:
      return addPlace(state, action);
    case REMOVE_PLACE:
      return removePlace(state, action);
    default:
      (action: empty);
      return state;
  }
}


function allPlaces(state: AllIds = [], action: Action): AllIds {
  switch(action.type) {
    case ADD_PLACE:
      return state.concat(action.payload.id);
    case REMOVE_PLACE:
      return state.filter(placeId => (placeId !== action.payload.id));
    default:
      (action: empty);
      return state;
  }
}


const placesReducer: Reducer = combineReducers({
  byId: placesById,
  allIds: allPlaces
});

export default placesReducer;