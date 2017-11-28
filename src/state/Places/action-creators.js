// @flow
import { ADD_PLACE, ADD_PLACES, REMOVE_PLACE } from './types';
import { createPlaceInDb, deletePlaceFromDb, loadAllPlacesFromDb } from '../../utils/firestore-actions';
import type { Place, Places, AddPlaceAction, AddPlacesAction, RemovePlaceAction } from './types';
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


export const addPlaces: ActionCreator = (places: Places): AddPlacesAction => ({
  type: ADD_PLACES,
  payload: places
});



export const loadAllPlaces: ThunkAction = () => {
  return dispatch => {
    return loadAllPlacesFromDb()
      .then((allPlaces: Places) => {
        dispatch(addPlaces(allPlaces));
        return allPlaces;
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
   addPlaces,
   createPlace,
   deletePlace,
   loadAllPlaces
};
