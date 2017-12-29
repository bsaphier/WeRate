// @flow
import type { User } from '../User/types';


export const ADD_USERS: 'ADD_USERS' = 'ADD_USERS';

export type Id = string;
export type AllIds = Array<Id>;


export type Users = Array<User>;
export type UsersById = { [id: Id]: User };


export type usersState = {|
  byId: UsersById,
  allIds: AllIds
|};


export type AddUsersAction = {| +type: typeof ADD_USERS, payload: Users |};


export type Action = 
  | empty
  | AddUsersAction;
