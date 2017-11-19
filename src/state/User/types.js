// @flow
import type { AddReviewAction, RemoveReviewAction } from '../Reviews/types';
import type { LoginRequestSuccessAction } from "../Auth/types";


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


export type Action = 
  | empty
  | AddReviewAction
  | RemoveReviewAction
  | LoginRequestSuccessAction;
