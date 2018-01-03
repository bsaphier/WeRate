// @flow
import { combineReducers } from 'redux';
import { ADD_USERS, SELECTED_USER } from './types';
import type { Reducer } from 'redux';
import type { User } from '../User/types';
import type { Id, AllIds, UsersById, AddUsersAction, SelectUserAction } from './types';



function addUsers(state: UsersById, action: AddUsersAction): UsersById {
  const nextState: UsersById = { ...state };
  action.payload.forEach((user: User) => {
    nextState[user.id] = user;
  });
  return nextState;
}


function usersById(state: UsersById = {}, action: AddUsersAction): UsersById {
  switch(action.type) {
    case ADD_USERS:
      return addUsers(state, action);
    default:
      (action: empty);
      return state;
  }
}


function allUsers(state: AllIds = [], action: AddUsersAction): AllIds {
  switch (action.type) {
    case ADD_USERS:
      return state.concat(action.payload.map((user: User) => user.id));
    default:
      (action: empty);
      return state;
  }
}


function selectUser(state: Id = '', action: SelectUserAction): Id {
  switch (action.type) {
    case SELECTED_USER:
      return action.payload;
    default:
      (action: empty);
      return state;
  }
}



const usersReducer: Reducer = combineReducers({
  byId: usersById,
  allIds: allUsers,
  selectedUser: selectUser
});

export default usersReducer;
