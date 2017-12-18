// @flow
import { combineReducers } from 'redux';
import { ADD_REVIEW, ADD_REVIEWS, EDIT_REVIEW, REMOVE_REVIEW } from './types';
import type { Reducer } from 'redux';
import type { AllIds, Action, Review, ReviewsById, AddReviewAction, EditReviewAction, AddReviewsAction, RemoveReviewAction } from './types';


function addReview(state: ReviewsById, action: AddReviewAction): ReviewsById {
  const { payload } = action;
  const { id } = payload;
  return {
    ...state,
    [id]: payload
  };
}


function editReview(state: ReviewsById, action: EditReviewAction): ReviewsById {
  const { payload } = action;
  const { id } = payload;
  const prevReview = state[id];
  return {
    ...state,
    [id]: { ...prevReview, ...payload }
  };
}


function removeReview(state: ReviewsById, action: RemoveReviewAction): ReviewsById {
  const nextState: ReviewsById = { ...state };
  delete nextState[action.payload.id];
  return nextState;
}


function addReviews(state: ReviewsById, action: AddReviewsAction): ReviewsById {
  const nextState: ReviewsById = { ...state };
  action.payload.forEach((review: Review) => {
    nextState[review.id] = review;
  });
  return nextState;
}


function reviewsById(state: ReviewsById = {}, action: Action): ReviewsById {
  switch (action.type) {
    case ADD_REVIEW:
      return addReview(state, action);
    case EDIT_REVIEW:
      return editReview(state, action);
    case REMOVE_REVIEW:
      return removeReview(state, action);
    case ADD_REVIEWS:
      return addReviews(state, action);
    default:
      (action: empty);
      return state;
  }
}


function allReviews(state: AllIds = [], action: Action): AllIds {
  switch (action.type) {
    case ADD_REVIEW:
      return state.concat(action.payload.id);
    case EDIT_REVIEW:
      return state;
    case REMOVE_REVIEW:
      return state.filter(id => (id !== action.payload.id));
    case ADD_REVIEWS:
      return state.concat(action.payload.map((review: Review) => review.id));
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
