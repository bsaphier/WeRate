// @flow
import { ADD_USERS } from './types';
import type { Users, AddUsersAction } from './types';
// import type { ThunkAction } from 'redux-thunk';
import type { ActionCreator } from 'redux';


export const addUsers: ActionCreator = (users: Users): AddUsersAction => ({
  type: ADD_USERS,
  payload: users
});


export default {
  addUsers
};
