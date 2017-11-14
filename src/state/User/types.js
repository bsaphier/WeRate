// @flow
import type { AddReviewAction, RemoveReviewAction } from '../Reviews/types';
export const FETCHING_USER_SUCCESS: 'FETCHING_USER_SUCCESS' = 'FETCHING_USER_SUCCESS';


export type Id = string;


export type userState = {
  +id: Id,
  +admin: boolean,
  firstName: string,
  lastName: string,
  email: string,
  business: string,
  phone: string,
  website: string,
  reviewIds: Array<Id>,
};

export type Users = Array<userState>;


export type FetchUserSuccessAction = {| type: typeof FETCHING_USER_SUCCESS, payload: userState |};

export type Action = 
  | empty
  | AddReviewAction
  | RemoveReviewAction
  | FetchUserSuccessAction;
