// @flow
import type { AddReviewAction, RemoveReviewAction } from '../Reviews/types';
import type { LogoutRequestAction, LoginRequestSuccessAction } from "../Auth/types";

export const UPDATE_USER: 'UPDATE_USER' = 'UPDATE_USER';


export type User = {
  id: string,
  admin: boolean,
  firstName: string,
  lastName: string,
  email: string,
  business: string,
  phone: string,
  website: string,
  reviewIds: Array<any>,
};

export type Users = Array<User>;


export type UpdateUserAction = {| +type: typeof UPDATE_USER, payload: User |};

export type Action = 
  | empty
  | AddReviewAction
  | UpdateUserAction
  | RemoveReviewAction
  | LogoutRequestAction
  | LoginRequestSuccessAction;
