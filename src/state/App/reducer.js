// @flow
import { ROOT_CHANGED } from './types';
import type { Action, rootState } from './types';



export default function (state: rootState = { root: undefined }, action: Action): rootState {
  switch (action.type) {

    case ROOT_CHANGED:
      return {
        root: action.root
      };

    default:
      return state;
  }
}
