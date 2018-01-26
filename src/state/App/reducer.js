// @flow
import { ROOT_CHANGED } from './types';
import type { Action, rootState } from './types';



const INIT_STATE: rootState = { root: undefined };

export default function (state: rootState = INIT_STATE, action: Action): rootState {
  switch (action.type) {
    case ROOT_CHANGED:
      return {
        root: action.root,
      };
    default:
      (action: empty);
      return state;
  }
}
