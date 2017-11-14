// @flow
import { ADD_PLACE, REMOVE_PLACE } from './types';
import type { Place, AddPlaceAction, RemovePlaceAction } from './types';
import type { ActionCreator } from 'redux';


export const addPlace: ActionCreator = (place: Place): AddPlaceAction => ({
  type: ADD_PLACE,
  payload: place
});


export const removePlace: ActionCreator = (place: Place): RemovePlaceAction => ({
  type: REMOVE_PLACE,
  payload: place
});


export default {
   addPlace,
   removePlace
};
