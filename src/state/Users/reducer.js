// @flow
import { combineReducers } from 'redux';
import { ADD_USERS } from './types';
import type { Reducer } from 'redux';
import type { User } from '../User/types';
import type { AllIds, Action, UsersById, AddUsersAction } from './types';



function addUsers(state: UsersById, action: AddUsersAction): UsersById {
  const nextState: UsersById = { ...state };
  action.payload.forEach((user: User) => {
    nextState[user.id] = user;
  });
  return nextState;
}


function usersById(state: UsersById = {}, action: Action): UsersById {
  switch(action.type) {
    case ADD_USERS:
      return addUsers(state, action);
    default:
      (action: empty);
      return state;
  }
}


function allUsers(state: AllIds = [], action: Action): AllIds {
  switch (action.type) {
    case ADD_USERS:
      return state.concat(action.payload.map((user: User) => user.id));
    default:
      (action: empty);
      return state;
  }
}


const usersReducer: Reducer = combineReducers({
  byId: usersById,
  allIds: allUsers
});

export default usersReducer;
