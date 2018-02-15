// @flow
export const ADD_USERS: 'ADD_USERS' = 'ADD_USERS';
export const UPDATE_USER: 'UPDATE_USER' = 'UPDATE_USER';
export const RESET_USERS: 'RESET_USERS' = 'RESET_USERS';
export const SELECTED_USER: 'SELECTED_USER' = 'SELECTED_USER';


export type Id = string;
export type AllIds = Array<Id>;

export type User = {
  id: string,
  admin: boolean,
  approved: boolean,
  firstName: string,
  lastName: string,
  email: string,
  confirmEmail?: string,
  business: string,
  phone: string,
  website: string,
  reviewIds: Array<any>,
};

export type Users = Array<User>;
export type UsersById = { [id: Id]: User };


export type usersState = {|
  byId: UsersById,
  allIds: AllIds,
  selectedUser: Id
|};


export type ResetUsersAction = {| +type: typeof RESET_USERS |};
export type AddUsersAction = {| +type: typeof ADD_USERS, payload: Users |};
export type UpdateUserAction = {| +type: typeof UPDATE_USER, payload: User |};
export type SelectUserAction = {| +type: typeof SELECTED_USER, payload: Id |};


export type Action = 
  | empty
  | AddUsersAction
  | ResetUsersAction
  | UpdateUserAction;
