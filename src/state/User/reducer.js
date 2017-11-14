// @flow
import { FETCHING_USER_SUCCESS } from './types';
import { ADD_REVIEW, REMOVE_REVIEW } from '../Reviews/types';
import type { AddReviewAction, RemoveReviewAction } from '../Reviews/types';
import type { Action, userState } from './types';


const initialState: userState = {
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  admin: false,
  business: '',
  phone: '',
  website: '',
  reviewIds: [],
};


function addReview(state: userState, action: AddReviewAction): userState {
  const { id } = action.payload;
  const reviewIds = [ ...state.reviewIds, id ];
  return {
    ...state,
    reviewIds
  };
}


function removeReview(state: userState, action: RemoveReviewAction): userState {
  const { id } = action.payload;
  const reviewIds = state.reviewIds.filter(reviewId => (id !== reviewId));
  return {
    ...state,
    reviewIds
  };
}


export default function(state: userState = initialState, action: Action): userState {
  switch (action.type) {
    case ADD_REVIEW:
      return addReview(state, action);
    case REMOVE_REVIEW:
      return removeReview(state, action);
    case FETCHING_USER_SUCCESS:
      return action.payload;
    default:
      (action: empty);
      return state;
  }
}