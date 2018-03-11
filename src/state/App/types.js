// @flow
export const APP_ROOT: 'root.MAIN' = 'root.MAIN';
export const LOGIN_ROOT: 'root.LOGIN' = 'root.LOGIN';
export const PENDING_SIGNUP_ROOT: 'root.PENDING_SIGNUP' = 'root.PENDING_SIGNUP';
export const ROOT_CHANGED: 'ROOT_CHANGED' = 'ROOT_CHANGED';


export type Root = typeof APP_ROOT | typeof LOGIN_ROOT | void;

export type rootState = {| +root: Root |};

export type AppRootChangedAction = {| +type: typeof ROOT_CHANGED, root: Root |};

export type Action =
  | empty
  | AppRootChangedAction;
