// @flow
import { ADD_REVIEW, ADD_REVIEWS, REMOVE_REVIEW } from './types';
import { createReviewInDb, deleteReviewFromDb } from '../../utils/firestore-actions';
import type { Review, Reviews, AddReviewAction, AddReviewsAction, RemoveReviewAction } from './types';
import type { ThunkAction } from 'redux-thunk';
import type { ActionCreator } from 'redux';



export const addReview: ActionCreator = (review: Review): AddReviewAction => ({
  type: ADD_REVIEW,
  payload: review
});


export const removeReview: ActionCreator = (review: Review): RemoveReviewAction => ({
  type: REMOVE_REVIEW,
  payload: review
});


export const addReviews: ActionCreator = (reviews: Reviews): AddReviewsAction => ({
  type: ADD_REVIEWS,
  payload: reviews
});



export const createReview: ThunkAction = (review: Review) => {
  return async (dispatch, getState) => {
    const { user } = getState();
    const newReview = { ...review, createdBy: user.id };
    const newReviewInDb = await createReviewInDb(newReview);
    dispatch(addReview(newReviewInDb));
    return newReviewInDb;
  };
};


export const deleteReview: ThunkAction = (review: Review) => {
  return async dispatch => {
    await deleteReviewFromDb(review.id);
    dispatch(removeReview(review));
  };
};



export default {
  addReview,
  addReviews,
  removeReview,
  deleteReview,
  createReview
};
