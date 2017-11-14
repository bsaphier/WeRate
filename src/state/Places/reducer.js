// @flow
import { combineReducers } from 'redux';
import { ADD_PLACE, REMOVE_PLACE } from './types';
import { ADD_REVIEW, REMOVE_REVIEW } from '../Reviews/types';
import { ADD_CATEGORY, REMOVE_CATEGORY } from '../Categories/types';
import type { Reducer } from 'redux';
import type { AddReviewAction, RemoveReviewAction } from '../Reviews/types';
import type { AddCategoryAction, RemoveCategoryAction } from '../Categories/types';
import type { AllIds, Place, Action, PlacesById, AddPlaceAction, RemovePlaceAction } from './types';


function addReview(state: PlacesById, action: AddReviewAction): PlacesById {
  const { id, placeId } = action.payload;
  const place: Place = state[placeId];

  return {
    ...state,
    [placeId]: {
      ...place,
      reviewIds: place.reviewIds.concat(id)
    }
  };
}


function removeReview(state: PlacesById, action: RemoveReviewAction): PlacesById {
  const { id, placeId } = action.payload;
  const place: Place = state[placeId];

  return {
    ...state,
    [placeId]: {
      ...place,
      reviewIds: place.reviewIds.filter(reviewId => (id !== reviewId))
    }
  };
}


function addCategory(state: PlacesById, action: AddCategoryAction): PlacesById {
  const { payload } = action;
  const { id, placeIds } = payload;

  if (placeIds) {
    const nextState: PlacesById = { ...state };
  
    placeIds.forEach(placeId => {
      const place: Place = state[placeId];
      nextState[placeId] = {
        ...place,
        categoryIds: place.categoryIds.concat(id)
      };
    });
    return nextState;
  }
  else return state;
}


function removeCategory(state: PlacesById, action: RemoveCategoryAction): PlacesById {
  const { payload } = action;
  const { id, placeIds } = payload;

  if (placeIds) {
    const nextState: PlacesById = { ...state };

    placeIds.forEach(placeId => {
      const place: Place = state[placeId];
      nextState[placeId] = {
        ...place,
        categoryIds: place.categoryIds.filter(categoryId => (categoryId !== id))
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


function placesById(state: PlacesById = {}, action: Action | AddReviewAction | AddCategoryAction | RemoveCategoryAction | RemoveReviewAction): PlacesById {
  switch(action.type) {
    case ADD_REVIEW:
      return addReview(state, action);
    case REMOVE_REVIEW:
      return removeReview(state, action);
    case ADD_CATEGORY:
      return addCategory(state, action);
    case REMOVE_CATEGORY:
      return removeCategory(state, action);
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