// @flow
/* globals console */
import firebase from 'react-native-firebase';
import type { userTypes } from '../state/Users';
import type { authTypes } from '../state/Auth';
type Login = authTypes.Login;
type User = userTypes.User;


const Auth = firebase.auth();


export const signInWithEmailAndPassword = async (login: Login): User => {
  return await Auth.signInAndRetrieveDataWithEmailAndPassword(login.email, login.password);
};

export const resetUserPassword = async (newPassword: string) => {
  const user = whoAmI();
  if (user) {
    try {
      await user.updatePassword(newPassword);
    } catch (error) {
      console.log('* resetUserPassword:', error);
      throw(error);
    }
  }
};

// export const createAuthUser = async ({ email, password }: Login) => {
//   return await Auth.createUserWithEmailAndPassword(email, password);
// };

export const logoutUser = async () => await Auth.signOut();

export const whoAmI = () => Auth.currentUser;
