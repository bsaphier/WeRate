// @flow
/* global console*/
import firebase from 'react-native-firebase';
import { FIRESTORE } from './constants';
import type { tagsTypes } from '../state/Tags';
import type { userTypes } from '../state/Users';
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

const { USERS, TAGS, PLACES, REVIEWS, REQ_ACCOUNT } = FIRESTORE;
const Store = firebase.firestore();
const Tags = Store.collection(USERS);
const Users = Store.collection(TAGS);
const Places = Store.collection(PLACES);
const Reviews = Store.collection(REVIEWS);
const PendingUsers = Store.collection(REQ_ACCOUNT);



// TODO: extract to a utils/helpers file
function insertId(documentRef): Data {
  if (documentRef.exists) {
    const { id } = documentRef;
    return { id, ...documentRef.data() };
  }
  return false;
}

function handleCollectionSnapshot(querySnapshot): Array<Data> {
  const data: Array<Data> = [];
  querySnapshot.forEach(doc => data.push({ id: doc.id, ...doc.data() }));
  return data;
}



// ********* TAGS

export const deleteTagFromDb = (tagId: string) => Tags.doc(tagId).delete();

export const loadAllTagsFromDb = async () => handleCollectionSnapshot(await Tags.get());

export const modifyTagInDb = async (tag: Tag) => {
  try {
    await Tags.doc(tag.id).update(tag);
  } catch (err) {
    console.log('modifyTagInDb', err);
  }
};

export const createTagInDb: (Tag) => Promise<Tag> = async (tag: Tag) => {
  try {
    const docRef = await Tags.add(tag);
    const tagWithId = insertId(await docRef.get());
    await Tags.doc(tagWithId.id).update(tagWithId);
    return tagWithId;
  } catch (error) {
    console.log('createTagInDb', error);
  }
};


// ********* USERS

export const deleteUserFromDb = (uid: string) => Users.doc(uid).delete();

export const loadAllUsersFromDb = async () => handleCollectionSnapshot(await Users.get());

export const modifyUserInDb = async (user: User) => {
  try {
    await Users.doc(user.id).update(user);
  } catch (err) {
    console.log('modifyUserInDb', err);

  }
};

export const getUserFromDb = async (uid: string) => await Users.doc(uid).get();

export const createUserInDb: (User) => Promise<User> = async ({ user }: User) => {
  const { email, firstName, lastName, business, phone, website } = user;
  const newUser = {
    reviewIds: [],
    approved: false,
    admin: false,
    firstName,
    lastName,
    business,
    website,
    email,
    phone
  };
  try {
    const docRef = await Users.add(newUser);
    const userWithId = insertId(await docRef.get());
    await Users.doc(userWithId.id).update(userWithId);
    return userWithId;
  } catch (error) {
    console.log('createUserInDb', error);
  }
};

  
// ********* PLACES

export const deletePlaceFromDb = (placeId: string) => Places.doc(placeId).delete();

export const loadAllPlacesFromDb = async () => handleCollectionSnapshot(await Places.get());

export const modifyPlaceInDb = async (place: Place) => {
  try {
    await Places.doc(place.id).update(place);
  } catch (err) {
    console.log('modifyPlaceInDb', err);
  }
};

export const createPlaceInDb: (Place) => Promise<Place> = async (place: Place) => {
  try {    
    const docRef = await Places.add(place);
    const placeWithId = insertId(await docRef.get());
    await Places.doc(placeWithId.id).update(placeWithId);
    return placeWithId;
  } catch (err) {
    console.log('createPlaceInDb', err);
  }
};


// ********* REVIEWS

export const deleteReviewFromDb = (reviewId: string) => Reviews.doc(reviewId).delete();

export const loadAllReviewsFromDb = async () => handleCollectionSnapshot(await Reviews.get());

export const modifyReviewInDb = async (review: Review) => {
  try {
    await Reviews.doc(review.id).update(review);
  } catch (err) {
    console.log('modifyReviewInDb', err);
  }
};

export const createReviewInDb: (Review) => Promise<Review> = async (review: Review) => {
  try {
    const docRef = await Reviews.add(review);
    const reviewWithId = insertId(await docRef.get());
    await Reviews.doc(reviewWithId.id).update(reviewWithId);
    return reviewWithId;
  } catch (error) {
    console.log('createReviewInDb', error);
  }
};


// ********* PENDING-USERS

export const deletePendingUserFromDb = async (id: string) => PendingUsers.doc(id).delete();

export const getPendingUserFromDb = async (id: string) => await PendingUsers.doc(id).get();

export const createPendingUserInDb = async (userCreds: any) => {
  const user = { approved: false, ...userCreds };
  const docRef = await PendingUsers.add(user);
  const userWithId = insertId(await docRef.get());
  await PendingUsers.doc(userWithId.id).update(userWithId);
  return userWithId;
};
