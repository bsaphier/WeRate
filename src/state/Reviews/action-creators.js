// @flow
import { ADD_REVIEW, REMOVE_REVIEW } from './types';
import type { ActionCreator } from 'redux';
import type { Review, AddReviewAction, RemoveReviewAction } from './types';


export const addReview: ActionCreator = (review: Review): AddReviewAction => ({
  type: ADD_REVIEW,
  payload: review
});


export const removeReview: ActionCreator = (review: Review): RemoveReviewAction => ({
  type: REMOVE_REVIEW,
  payload: review
});


export default {
  addReview,
  removeReview
};
