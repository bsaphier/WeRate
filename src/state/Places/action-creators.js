// @flow
import { ADD_PLACE, REMOVE_PLACE } from './types';
import { createPlaceInDb, deletePlaceFromDb, loadAllPlacesFromDb } from '../../data/firestore-actions';
import type { Place, Places, AddPlaceAction, RemovePlaceAction } from './types';
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


export const loadAllPlaces: ThunkAction = () => {
  return dispatch => {
    return loadAllPlacesFromDb()
      .then((allPlaces: Places) => {
        allPlaces.forEach((place: Place) => {
          dispatch(addPlace(place));
        });
      });
  };
};


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
   deletePlace,
   loadAllPlaces
};
