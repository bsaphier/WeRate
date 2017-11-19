// @flow
export const ADD_REVIEW: 'ADD_REVIEW' = 'ADD_REVIEW';
export const ADD_REVIEWS: 'ADD_REVIEWS' = 'ADD_REVIEWS';
export const REMOVE_REVIEW: 'REMOVE_REVIEW' = 'REMOVE_REVIEW';


export type Id = string;
export type AllIds = Array<Id>;

// A review is for rating a place.
// A review is created by a user and belongs to only one place. 
export type Review = {
  id: Id,
  createdBy: any,
  placeId: any,
  rating: number,
  comment: string
};

export type Reviews = Array<Review>;
export type ReviewsById = { [id: Id]: Review };

export type reviewsState = {|
  byId: ReviewsById,
  allIds: AllIds
|};

export type AddReviewAction = {| +type: typeof ADD_REVIEW, payload: Review |};
export type AddReviewsAction = {| +type: typeof ADD_REVIEWS, payload: Reviews |};
export type RemoveReviewAction = {| +type: typeof REMOVE_REVIEW, payload: Review |};

export type Action =
  | empty
  | AddReviewAction
  | AddReviewsAction
  | RemoveReviewAction;