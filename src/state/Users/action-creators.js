// @flow
/* globals console */
import { ADD_USERS, RESET_USERS, UPDATE_USER, SELECTED_USER } from './types';
import { modifyUserInDb } from '../../utils/firestore-actions';
import { checkAuth } from '../Auth/action-creators';
import type { Id, User, Users, AddUsersAction, ResetUsersAction, SelectUserAction, UpdateUserAction } from './types';
import type { ThunkAction } from 'redux-thunk';
import type { ActionCreator } from 'redux';



export const addUsers: ActionCreator = (users: Users): AddUsersAction => ({
  type: ADD_USERS,
  payload: users
});

export const resetUsers: ActionCreator = (): ResetUsersAction => ({
  type: RESET_USERS
});

export const modifyUser: ActionCreator = (user: User): UpdateUserAction => ({
  type: UPDATE_USER,
  payload: user
});

export const selectUser: ActionCreator = (userId: Id): SelectUserAction => ({
  type: SELECTED_USER,
  payload: userId
});


export const editUser: ThunkAction = (user: User) => {
  return async dispatch => {
    try {
      await modifyUserInDb(user);
      dispatch(modifyUser(user));
      // update the signed in user state of the auth reducer
      await dispatch(checkAuth());
    } catch (error) {
      console.log('editUser', error);
    }
  };
};




export default {
  addUsers,
  editUser,
  modifyUser,
  selectUser,
  resetUsers
};
