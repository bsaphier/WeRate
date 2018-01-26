// @flow
import { combineReducers } from 'redux';
import { ADD_USERS, SELECTED_USER, UPDATE_USER } from './types';
import { ADD_REVIEW, REMOVE_REVIEW } from '../Reviews/types';
import type { Reducer } from 'redux';
import type { User } from '../User/types';
import type { AddReviewAction, RemoveReviewAction } from '../Reviews/types';
import type { Id, AllIds, Action, UsersById, UpdateUserAction, AddUsersAction, SelectUserAction } from './types';



function addUsers(state: UsersById, action: AddUsersAction): UsersById {
  const nextState: UsersById = { ...state };
  action.payload.forEach((user: User) => {
    nextState[user.id] = user;
  });
  return nextState;
}

function editUser(state: UsersById, action: UpdateUserAction): UsersById {
  const { id } = action.payload;
  const currentUserState = state[id];
  return {
    ...state,
    [id]: {
      ...currentUserState,
      ...action.payload
    }
  };
}


function addReview(state: UsersById, action: AddReviewAction): UsersById {
  const { id, createdBy } = action.payload;
  const user = state[createdBy];
  const reviewIds = [...user.reviewIds, id];
  return {
    ...state,
    [createdBy]: {
      ...user,
      reviewIds
    }
  };
}


function removeReview(state: UsersById, action: RemoveReviewAction): UsersById {
  const { id, createdBy } = action.payload;
  const user = state[createdBy];
  const reviewIds = user.reviewIds.filter(reviewId => (id !== reviewId));
  return {
    ...state,
    [createdBy]: {
      ...user,
      reviewIds
    }
  };
}


function usersById(state: UsersById = {}, action: Action): UsersById {
  switch(action.type) {
    case ADD_USERS:
      return addUsers(state, action);
    case UPDATE_USER:
      return editUser(state, action);
    case ADD_REVIEW:
      return addReview(state, action);
    case REMOVE_REVIEW:
      return removeReview(state, action);
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
