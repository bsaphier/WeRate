// @flow
import firebase from 'react-native-firebase';
import type { placesTypes } from '../state/Places';
type Place = placesTypes.Place;


const Store = firebase.firestore();
// const Tags = Store.collection('tags');
// const Users = Store.collection('users');
const Places = Store.collection('places');
// const Reviews = Store.collection('reviews');


// TODO: extract to a utils/helpers file
function handlePlaceData(documentRef): Place {
  const { id } = documentRef;
  return { id, ...documentRef.data() };
}

function handleLoadAllPlaces(querySnapshot): Array<Place> {
  const allPlaces: Array<Place> = [];
  querySnapshot.forEach(doc => {
    allPlaces.push({ id: doc.id, ...doc.data() });
  });
  return allPlaces;
}
// *********


export const loadAllPlacesFromDb = () =>
  Places.get()
    .then(handleLoadAllPlaces);


export const createPlaceInDb = (place: Place) => 
  Places.add(place)
    .then(docRef => docRef.get())
    .then(handlePlaceData);


export const deletePlaceFromDb = (placeId: string) =>
  Places.doc(placeId).delete();