// @flow
import firebase from 'react-native-firebase';
import type { ThunkAction } from 'redux-thunk';
import type { ActionCreator } from 'react-redux';
import type { placesTypes } from '../state/Places';
type Place = placesTypes.Place;


const Store = firebase.firestore();
// const Tags = Store.collection('tags');
// const Users = Store.collection('users');
const Places = Store.collection('places');
// const Reviews = Store.collection('reviews');



export const createPlace: ThunkAction = (place: Place, callback: ActionCreator) =>
  dispatch =>
    Places.add(place)
      .then(docRef => docRef.get())
      .then(documentRef => {
        const { id } = documentRef;
        const data = documentRef.data();
        const newPlace: Place = {
          id,
          name: data.name,
          description: data.description || ''
        };
        dispatch(callback(newPlace));
        return data;
      });


/******* EXAMPLE ****** */
// export const createPlaceAction = (place: Place) => {
//   return dispatch => {
//     createPlace(
//       place,
//       (newPlace) => dispatch(addPlace(newPlace))
//     );
//   };
// };
