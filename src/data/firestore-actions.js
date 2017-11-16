// @flow
import firebase from 'react-native-firebase';
import type { tagsTypes } from '../state/Tags';
import type { userTypes } from '../state/User';
import type { placesTypes } from '../state/Places';
import type { reviewsTypes } from '../state/Reviews';
type Tag = tagsTypes.Tag;
type User = userTypes.User;
type Place = placesTypes.Place;
type Review = reviewsTypes.Review;
type Data = 
  | Tag
  | User
  | Place
  | Review;


const Store = firebase.firestore();
const Tags = Store.collection('tags');
const Users = Store.collection('users');
const Places = Store.collection('places');
const Reviews = Store.collection('reviews');


// TODO: extract to a utils/helpers file
function insertId(documentRef): Data {
  const { id } = documentRef;
  return { id, ...documentRef.data() };
}

function handleCollectionSnapshot(querySnapshot): Array<Data> {
  const data: Array<Data> = [];
  querySnapshot.forEach(doc => {
    data.push({ id: doc.id, ...doc.data() });
  });
  return data;
}
// *********


export const loadAllTagsFromDb = () =>
  Tags.get().then(handleCollectionSnapshot);


export const loadAllUsersFromDb = () =>
  Users.get().then(handleCollectionSnapshot);


export const loadAllPlacesFromDb = () =>
  Places.get().then(handleCollectionSnapshot);


export const loadAllReviewsFromDb = () =>
  Reviews.get().then(handleCollectionSnapshot);


export const createTagInDb = (tag: Tag) => 
  Tags.add(tag)
    .then(docRef => docRef.get())
    .then(insertId);


export const createUserInDb = (user: User) => 
  Users.add(user)
    .then(docRef => docRef.get())
    .then(insertId);


export const createPlaceInDb = (place: Place) => 
  Places.add(place)
    .then(docRef => docRef.get())
    .then(insertId);


export const createReviewInDb = (review: Review) => 
  Reviews.add(review)
    .then(docRef => docRef.get())
    .then(insertId);


export const deleteTagFromDb = (tagId: string) =>
  Tags.doc(tagId).delete();

export const deleteUserFromDb = (userId: string) =>
  Users.doc(userId).delete();

export const deletePlaceFromDb = (placeId: string) =>
  Places.doc(placeId).delete();

export const deleteReviewFromDb = (reviewId: string) =>
  Reviews.doc(reviewId).delete();
