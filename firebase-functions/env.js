import { __MAILGUN_API_KEY__ } from './private';

export const MAILGUN_BASE_URL = 'https://us-central1-werate-68084.cloudfunctions.net';

export const MAILGUN_API_KEY = __MAILGUN_API_KEY__;

export const FIRESTORE = {
  USERS: 'users',
  TAGS: 'tags',
  PLACES: 'places',
  REVIEWS: 'reviews',
  REQ_ACCOUNT: '_users_'
};

export default {
  FIRESTORE,
  MAILGUN_API_KEY,
  MAILGUN_BASE_URL
};
