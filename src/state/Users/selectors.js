import { createSelector } from 'reselect';



const getSelectedUserId = state => state.users.selectedUser;
const getUsers = state => state.users.byId;


export const getSelectedUser = createSelector(
  [ getSelectedUserId, getUsers ],
  (selectedUserId, users) => users[selectedUserId]
);

export default { getSelectedUser };
