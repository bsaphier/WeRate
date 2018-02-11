/* global exports,console*/
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import mg from 'mailgun-js';
import { FIRESTORE } from '../src/utils/constants';
import { email as template } from './email';
import { MAILGUN_API_KEY } from './keys';
const { USERS, PLACES, REQ_ACCOUNT } = FIRESTORE;
const DOMAIN = 'sandboxb1a1755b98884a1ba829ea395300f4f6.mailgun.org';
const mailgun = mg({ apiKey: MAILGUN_API_KEY, domain: DOMAIN });


admin.initializeApp(functions.config().firebase);

const getStore = () => admin.firestore();

const generateTempPassword = () => {
  return 'admin123';
};


const constructNewPlaceEmail = (adminUser, newPlace) => ({
  from: `WeRate <mailgun@${DOMAIN}>`,
  to: adminUser.email,
  subject: 'WeRate - A new business has been added',
  text: `Hello ${adminUser.firstName}, ${newPlace.name} has been added to WeRate`
});

const constructSignUpRequestEmail = (pendingUser, actionLink, adminUser) => ({
  from: `WeRate <mailgun@${DOMAIN}>`,
  to: adminUser.email,
  subject: `WeRate - %recipient.puFirstName% %recipient.puLastName% wants to join your group!`,
  html: template,
  'recipient-variables': {
    [adminUser.email]: {
      actionLink,
      first: adminUser.firstName,
      last: adminUser.lastName,
      puFirstName: pendingUser.firstName,
      puLastName: pendingUser.lastName,
      puEmail: pendingUser.email,
      puBusiness: pendingUser.business,
      puWebsite: pendingUser.website,
      puPhone: pendingUser.phone
    }
  }
});

const constructUserRequestApprovedEmail = (user, tempPassword) => ({
  from: `WeRate <mailgun@${DOMAIN}>`,
  to: user.email,
  subject: 'Welcome to WeRate!',
  text: `Hello ${user.firstName}, You have been approved and can now log in to WeRate with the password: ${tempPassword}`
});


const approveUserRequest = async (uid) => {
  try {
    const store = getStore();
    return await store.collection(REQ_ACCOUNT).doc(uid).update({ approved: true });
  } catch (error) {
    console.log('FAIL * approveUserRequest * ', error);
  }
};

const handleUserRequestApproved = async (user) => {
  const tempPassword = generateTempPassword();
  try {
    const newAuthUser = await createNewAuthuser(user.email, tempPassword);
    const emailData = constructUserRequestApprovedEmail(user, tempPassword);
    await createNewUserInDb(user, newAuthUser.uid);
    return await sendEmail(emailData);
  } catch (error) {
    console.log('FAIL * handleUserRequestApproved * ', error);
  }
};

const generateSignUpRequestEmail = async (pendingUser, actionLink) => {
  try {
    const adminUser = await getAdmin();
    const emailData = constructSignUpRequestEmail(pendingUser, actionLink, adminUser);
    return await sendEmail(emailData);
  } catch (error) {
    console.log('FAIL * generateSignUpRequestEmail * ', error);
  }
};

const generateNewPlaceEmail = async (newPlace) => {
  try {
    const adminUser = await getAdmin();
    const emailData = constructNewPlaceEmail(adminUser, newPlace);
    return await sendEmail(emailData);
  } catch (error) {
    console.log('FAIL * generateSignUpRequestEmail * ', error);
  }
};


async function createNewAuthuser(email, tempPassword) {
  try {
    const newAuthUser = await admin.auth().createUser({
      email,
      emailVerified: true,
      password: tempPassword
    });
    return newAuthUser;
  } catch (error) {
    console.log('FAIL * createNewAuthuser * ', error);
  }
}

async function createNewUserInDb({ firstName, lastName, business, website, email, phone }, uid) {
  try {
    const store = getStore();
    const docRef = await store.collection(USERS).doc(uid).set({
      id: uid,
      reviewIds: [],
      admin: false,
      firstName,
      lastName,
      business,
      website,
      email,
      phone
    });
    return docRef;
  } catch (error) {
    console.log('Error creating firestore user', error);
  }
}


async function sendEmail(emailData) {
  try {
    const data = await mailgun.messages().send(emailData);
    console.log(data);
    return data;
  } catch (error) {
    console.log('Error sending email: ', error);
    return;
  }
}

async function getAdmin() {
  let adminUser;
  try {
    const store = getStore();
    const querySnapshot = await store.collection(USERS).where('admin', '==', true).get();
    querySnapshot.forEach(doc => {
      if (doc.exists) adminUser = doc.data();
    });
    return adminUser;
  } catch (error) {
    console.log('Error getting admin from database: ', error);
    return;
  }
}


exports.approveUser = functions.https.onRequest((req, res) => {
  const requestId = req.params[0].slice(1);
  approveUserRequest(requestId)
    .then(data => {
      console.log('SUCCESS * approveUser * ', data);
      res.end();
    })
    .catch(err => {
      console.log('FAIL * approveUser * ', err);
      res.end();
    });
});

exports.onUserRequestApproved = functions.firestore.document(`${REQ_ACCOUNT}/{pendingUserId}`).onUpdate(event => {
  const pendingUser = event.data.data();
  const { approved } = pendingUser;
  const { approved: approvedPrev } = event.data.previous.data();
  if (!approvedPrev && approved) {
    return handleUserRequestApproved(pendingUser)
      .then(data => console.log('SUCCESS * onUserRequestApproved * ', data))
      .catch(err => console.log('FAIL * onUserRequestApproved * ', err));
  }
});

exports.handleSignUpRequest = functions.firestore.document(`${REQ_ACCOUNT}/{pendingUserId}`).onCreate(event => {
  const pendingUser = event.data.data();
  const actionLink = `https://us-central1-werate-68084.cloudfunctions.net/approveUser/${event.params.pendingUserId}`;
  return generateSignUpRequestEmail(pendingUser, actionLink)
    .then(data => console.log('SUCCESS * handleSignUpRequest * ', data))
    .catch(err => console.log('FAIL * handleSignUpRequest * ', err));
});

exports.handleNewPlace = functions.firestore.document(`${PLACES}/{placeId}`).onCreate(event => {
  const newPlace = event.data.data();
  return generateNewPlaceEmail(newPlace)
    .then(data => console.log('SUCCESS * handleNewPlace * ', data))
    .catch(err => console.log('FAIL * handleNewPlace * ', err));
});
