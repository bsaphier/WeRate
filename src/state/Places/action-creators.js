// @flow
import { ADD_PLACE, REMOVE_PLACE } from './types';
import { createPlaceInDb, deletePlaceFromDb } from '../../data/firestore-actions';
import type { Place, AddPlaceAction, RemovePlaceAction } from './types';
import type { ThunkAction } from 'redux-thunk';
import type { ActionCreator } from 'redux';


export const addPlace: ActionCreator = (place: Place): AddPlaceAction => ({
  type: ADD_PLACE,
  payload: place
});


export const removePlace: ActionCreator = (place: Place): RemovePlaceAction => ({
  type: REMOVE_PLACE,
  payload: place
});


export const createPlace: ThunkAction = (place: Place) => {
  return dispatch => {
    return createPlaceInDb(place)
      .then((newPlace: Place): Place => {
        dispatch(addPlace(newPlace));
        return newPlace;
      });
  };
};


export const deletePlace: ThunkAction = (place: Place) => {
  return dispatch => {
    return deletePlaceFromDb(place.id)
      .then(() => dispatch(removePlace(place)));
  };
};

export default {
   addPlace,
   createPlace,
   deletePlace
};
