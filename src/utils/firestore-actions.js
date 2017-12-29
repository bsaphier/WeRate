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

export const createTagInDb = async (tag: Tag) => {
  const docRef = await Tags.add(tag);
  return insertId(await docRef.get());
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

export const getUserFromDb = async (uid: string) => insertId(await Users.doc(uid).get());

export const createUserInDb = async ({ uid, ...user }: any) => {
  const { email, password, firstName, lastName, business, phone, website } = user;
  await Users.doc(uid).set({ id: uid, email, password, firstName, lastName, business, phone, website });
  return getUserFromDb(uid);
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

export const createPlaceInDb = async (place: Place) => {
  try {    
    const docRef = await Places.add(place);
    return insertId(await docRef.get());
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

export const createReviewInDb = async (review: Review) => {
  const docRef = await Reviews.add(review);
  return insertId(await docRef.get());
};



// ********* FILTERS

// export const filterPlacesByTags = (tagName) => {
//   return Places.where('')
// };