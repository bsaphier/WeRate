// @flow
import { ADD_PLACE, ADD_PLACES, REMOVE_PLACE } from './types';
import { createPlaceInDb, deletePlaceFromDb } from '../../utils/firestore-actions';
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



export const createPlace: ThunkAction = (place: Place) => {
  return async (dispatch, getState) => {
    const { user } = getState();
    const newPlace = { ...place, createdBy: user.id };
    try {
      const newPlaceInDb = await createPlaceInDb(newPlace);
      dispatch(addPlace(newPlaceInDb));
      return newPlaceInDb;
    } catch (error) {
      console.log('createPlace', error);
    }
  };
};


export const deletePlace: ThunkAction = (place: Place) => {
  return async dispatch => {
    await deletePlaceFromDb(place.id);
    dispatch(removePlace(place));
  };
};



export default {
   addPlace,
   addPlaces,
   createPlace,
   deletePlace
};
