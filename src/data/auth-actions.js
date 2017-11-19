// @flow
import firebase from 'react-native-firebase';
import type { userTypes } from '../state/User';
import type { authTypes } from '../state/Auth';
type Login = authTypes.Login;
type User = userTypes.User;


const Auth = firebase.auth();


export const authenticateUser = async (login: Login): User => {
  return await Auth.signInWithEmailAndPassword(login.email, login.password);
};


export const createUser = async (login: Login) => {
  return await Auth.createUserWithEmailAndPassword(login.email, login.password);
};