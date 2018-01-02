// @flow
import type { User } from '../User/types';

export const ADD_USERS: 'ADD_USERS' = 'ADD_USERS';
export const SELECTED_USER: 'SELECTED_USER' = 'SELECTED_USER';


export type Id = string;
export type AllIds = Array<Id>;


export type Users = Array<User>;
export type UsersById = { [id: Id]: User };


export type usersState = {|
  byId: UsersById,
  allIds: AllIds,
  selectedUser: Id
|};


export type AddUsersAction = {| +type: typeof ADD_USERS, payload: Users |};
export type SelectUserAction = {| +type: typeof SELECTED_USER, payload: Id |};


export type Action = 
  | empty
  | AddUsersAction
  | SelectUserAction;
