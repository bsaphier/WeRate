// @flow
import { combineReducers } from 'redux';
import { ADD_REVIEW, REMOVE_REVIEW } from './types';
import type { Reducer } from 'redux';
import type { AllIds, Action, ReviewsById, AddReviewAction, RemoveReviewAction } from './types';


function addReview(state: ReviewsById, action: AddReviewAction): ReviewsById {
  const { payload } = action;
  const { id } = payload;
  return {
    ...state,
    [id]: payload
  };
}


function removeReview(state: ReviewsById, action: RemoveReviewAction) {
  const nextState: ReviewsById = { ...state };
  delete nextState[action.payload.id];
  return nextState;
}


function reviewsById(state: ReviewsById = {}, action: Action): ReviewsById {
  switch (action.type) {
    case ADD_REVIEW:
      return addReview(state, action);
    case REMOVE_REVIEW:
      return removeReview(state, action);
    default:
      (action: empty);
      return state;
  }
}


function allReviews(state: AllIds = [], action: Action): AllIds {
  switch (action.type) {
    case ADD_REVIEW:
      return state.concat(action.payload.id);
    case REMOVE_REVIEW:
      return state.filter(id => (id !== action.payload.id));
    // TODO: case EDIT_REVIEW:
    default:
      (action: empty);
      return state;
  }
}

const reviewsReducer: Reducer = combineReducers({
  byId: reviewsById,
  allIds: allReviews
});

export default reviewsReducer;
