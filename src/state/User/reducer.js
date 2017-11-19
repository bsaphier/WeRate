// @flow
import { LOGIN_REQUEST_SUCCESS } from '../Auth/types';
import { ADD_REVIEW, REMOVE_REVIEW } from '../Reviews/types';
import type { AddReviewAction, RemoveReviewAction } from '../Reviews/types';
import type { Action, User } from './types';


const initialState: User = {
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


function addReview(state: User, action: AddReviewAction): User {
  const { id } = action.payload;
  const reviewIds = [ ...state.reviewIds, id ];
  return {
    ...state,
    reviewIds
  };
}


function removeReview(state: User, action: RemoveReviewAction): User {
  const { id } = action.payload;
  const reviewIds = state.reviewIds.filter(reviewId => (id !== reviewId));
  return {
    ...state,
    reviewIds
  };
}


export default function(state: User = initialState, action: Action): User {
  switch (action.type) {
    case ADD_REVIEW:
      return addReview(state, action);
    case REMOVE_REVIEW:
      return removeReview(state, action);
    case LOGIN_REQUEST_SUCCESS:
      return {
        ...state,
        ...action.payload
      };
    default:
      (action: empty);
      return state;
  }
}