// @flow
// import { UPDATE_USER } from './types';
// import { modifyUserInDb } from '../../utils/firestore-actions';
// import type { User, UpdateUserAction } from './types';
// import type { ThunkAction } from 'redux-thunk';
// import type { ActionCreator } from 'redux';


// export const modifyUser: ActionCreator = (user: User): UpdateUserAction => ({
//   type: UPDATE_USER,
//   payload: user
// });


// export const editUser: ThunkAction = (user: User) => {
//   return async dispatch => {
//     try {
//       await modifyUserInDb(user);
//       dispatch(modifyUser(user));
//     } catch (error) {
//       console.log('editUser', error);
//     }
//   };
// };


// export default {
//   editUser,
//   modifyUser
// };
