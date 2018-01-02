// @flow
import { ADD_USERS, SELECTED_USER } from './types';
import type { Id, Users, AddUsersAction, SelectUserAction } from './types';
import type { ActionCreator } from 'redux';



export const addUsers: ActionCreator = (users: Users): AddUsersAction => ({
  type: ADD_USERS,
  payload: users
});


export const selectUser: ActionCreator = (userId: Id): SelectUserAction => ({
  type: SELECTED_USER,
  payload: userId
});


export default {
  addUsers,
  selectUser
};
