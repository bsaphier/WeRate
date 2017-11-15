// @flow
import firebase from 'react-native-firebase';
import type { placesTypes } from '../state/Places';
type Place = placesTypes.Place;


const Store = firebase.firestore();
// const Tags = Store.collection('tags');
// const Users = Store.collection('users');
const Places = Store.collection('places');
// const Reviews = Store.collection('reviews');


function handlePlaceData(documentRef): Place {
  const { id } = documentRef;
  const { name, description } = documentRef.data();
  return {
    id,
    name,
    description: description || ''
  };
}


export const createPlaceInDb = (place: Place) => 
  Places.add(place)
    .then(docRef => docRef.get())
    .then(handlePlaceData);


export const deletePlaceFromDb = (placeId: string) =>
  Places.doc(placeId).delete();