// @flow
import { ADD_REVIEW, ADD_REVIEWS, EDIT_REVIEW, REMOVE_REVIEW } from './types';
import { createReviewInDb, modifyPlaceInDb, modifyReviewInDb, deleteReviewFromDb } from '../../utils/firestore-actions';
import type { Review, Reviews, AddReviewAction, AddReviewsAction, EditReviewAction, RemoveReviewAction } from './types';
import type { ThunkAction } from 'redux-thunk';
import type { ActionCreator } from 'redux';



export const addReview: ActionCreator = (review: Review): AddReviewAction => ({
  type: ADD_REVIEW,
  payload: review
});


export const modifyReview: ActionCreator = (review: Review): EditReviewAction => ({
  type: EDIT_REVIEW,
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
    const { user, places } = getState();
    const place = places.byId[review.placeId];
    const newReview = { ...review, createdBy: user.id };
    const newReviewInDb = await createReviewInDb(newReview);
    await modifyPlaceInDb({
      ...place,
      reviewIds: place.reviewIds.concat(newReviewInDb.id)
    });
    dispatch(addReview(newReviewInDb));
    return newReviewInDb;
  };
};


export const editReview: ThunkAction = (review: Review) => {
  return async dispatch => {
    try {
      await modifyReviewInDb(review);
      dispatch(modifyReview(review));
    } catch (error) {
      console.log('editReview', error);
    }
  };
};


export const deleteReview: ThunkAction = (review: Review) => {
  return async (dispatch, getState) => {
    const { places } = getState();
    const place = places.byId[review.placeId];
    await modifyPlaceInDb({
      ...place,
      reviewIds: place.reviewIds.filter(reviewId => (review.id !== reviewId))
    });
    await deleteReviewFromDb(review.id);
    dispatch(removeReview(review));
  };
};



export default {
  addReview,
  addReviews,
  editReview,
  removeReview,
  deleteReview,
  createReview
};
