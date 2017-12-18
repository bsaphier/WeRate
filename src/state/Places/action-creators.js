// @flow
import { ADD_PLACE, EDIT_PLACE, ADD_PLACES, REMOVE_PLACE } from './types';
import { modifyTagInDb, createPlaceInDb, modifyPlaceInDb, deletePlaceFromDb } from '../../utils/firestore-actions';
import type { Place, Places, AddPlaceAction, EditPlaceAction, AddPlacesAction, RemovePlaceAction } from './types';
import type { ThunkAction } from 'redux-thunk';
import type { ActionCreator } from 'redux';



export const addPlace: ActionCreator = (place: Place): AddPlaceAction => ({
  type: ADD_PLACE,
  payload: place
});


export const modifyPlace: ActionCreator = (place: Place): EditPlaceAction => ({
  type: EDIT_PLACE,
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


export const editPlace: ThunkAction = (place: Place) => {
  return async (dispatch, getState) => {
    const { tags } = getState();
    try {
      await modifyPlaceInDb(place);
      dispatch(modifyPlace(place));
      tags.allIds.forEach(async tagId => {
        let updatedTag, updatedPlaceIds;
        const tag = tags.byId[tagId];
        const { placeIds } = tag;
        const tagHoldsReferenceToPlace: boolean = placeIds.includes(place.id);
        const placeHoldsReferenceToTag: boolean = place.tagIds.includes(tagId);

        if (tagHoldsReferenceToPlace && !placeHoldsReferenceToTag) {
          updatedPlaceIds = placeIds.filter(placeId => (placeId !== place.id));
          updatedTag = { ...tag, placeIds: updatedPlaceIds };
        } else if (!tagHoldsReferenceToPlace && placeHoldsReferenceToTag) {
          updatedPlaceIds = placeIds.concat(place.id);
          updatedTag = { ...tag, placeIds: updatedPlaceIds };
        }
        await modifyTagInDb(updatedTag);
      });
    } catch (error) {
      console.log('editPlace', error);
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
   editPlace,
   addPlaces,
   modifyPlace,
   createPlace,
   deletePlace
};
