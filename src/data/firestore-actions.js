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


// ********* TAGS

export const deleteTagFromDb = (tagId: string) => Tags.doc(tagId).delete();

export const loadAllTagsFromDb = async () => handleCollectionSnapshot(await Tags.get());

export const createTagInDb = async (tag: Tag) => {
  const docRef = await Tags.add(tag);
  return insertId(docRef.get());
};


// ********* USERS

export const getUserFromDb = async (uid: string) => insertId(await Users.doc(uid).get());

export const deleteUserFromDb = (uid: string) => Users.doc(uid).delete();

export const loadAllUsersFromDb = async () => handleCollectionSnapshot(await Users.get());

export const createUserInDb = async (uid: string, user: User) => {
  await Users.doc(uid).set(user);
  return insertId(await Users.doc(uid).get());
};

  
// ********* PLACES

export const loadAllPlacesFromDb = async () =>
  handleCollectionSnapshot(await Places.get());

export const createPlaceInDb = async (place: Place) => {
  const docRef = await Places.add(place);
  return insertId(docRef.get());
};

export const deletePlaceFromDb = (placeId: string) =>
  Places.doc(placeId).delete();


// ********* REVIEWS

export const loadAllReviewsFromDb = async () =>
  handleCollectionSnapshot(await Reviews.get());

export const createReviewInDb = async (review: Review) => {
  const docRef = await Reviews.add(review);
  return insertId(docRef.get());
};

export const deleteReviewFromDb = (reviewId: string) =>
  Reviews.doc(reviewId).delete();
