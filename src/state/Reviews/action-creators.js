// @flow
import { editUser } from '../User/action-creators';
import { editPlace } from '../Places/action-creators';
import { ADD_REVIEW, ADD_REVIEWS, EDIT_REVIEW, REMOVE_REVIEW } from './types';
import { createReviewInDb, modifyPlaceInDb, modifyUserInDb, modifyReviewInDb, deleteReviewFromDb } from '../../utils/firestore-actions';
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
    try {
      const place = places.byId[review.placeId];
      const newReview = { ...review, createdBy: user.id };
      const newReviewInDb = await createReviewInDb(newReview);
      dispatch(addReview(newReviewInDb));
      const updatedPlaceReviewIds = place.reviewIds.concat(newReviewInDb.id);
      const updatedUserReviewIds = user.reviewIds ? user.reviewIds.concat(newReviewInDb.id) : [newReviewInDb.id];
      dispatch(editPlace({ ...place, reviewIds: updatedPlaceReviewIds }));
      dispatch(editUser({ ...user, reviewIds: updatedUserReviewIds }));
      return newReviewInDb;
    } catch (error) {
      console.log('createReview', error);
    }
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
    const { users, places } = getState();
    try {
      await deleteReviewFromDb(review.id);
      dispatch(removeReview(review));
      const user = users.byId[review.createdBy];
      const place = places.byId[review.placeId];
      const updatedPlaceReviewIds = place.reviewIds.filter(reviewId => (review.id !== reviewId));
      const updatedUserReviewIds = user.reviewIds.filter(reviewId => (review.id !== reviewId));
      dispatch(editPlace({ ...place, reviewIds: updatedPlaceReviewIds }));
      dispatch(editUser({ ...user, reviewIds: updatedUserReviewIds }));
    } catch (error) {
      console.log('deleteReview', error);
    }
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
