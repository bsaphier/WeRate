// @flow
import { ADD_REVIEW, ADD_REVIEWS, REMOVE_REVIEW } from './types';
import { createReviewInDb, deleteReviewFromDb, loadAllReviewsFromDb } from '../../utils/firestore-actions';
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



export const loadAllReviews: ThunkAction = () => {
  return dispatch => {
    return loadAllReviewsFromDb()
      .then((allReviews: Reviews) => {
        allReviews.forEach((review: Review) => {
          dispatch(addReview(review));
        });
      });
  };
};


export const createReview: ThunkAction = (review: Review) => {
  return dispatch => {
    return createReviewInDb(review)
      .then((newReview: Review): Review => {
        dispatch(addReview(newReview));
        return newReview;
      });
  };
};


export const deleteReview: ThunkAction = (review: Review) => {
  return dispatch => {
    return deleteReviewFromDb(review.id)
      .then(() => dispatch(removeReview(review)));
  };
};



export default {
  addReview,
  addReviews,
  removeReview,
  deleteReview,
  createReview,
  loadAllReviews
};
