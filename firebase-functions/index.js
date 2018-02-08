/* global exports,console*/
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import mg from 'mailgun-js';
import { email as template } from './email';
import { MAILGUN_API_KEY } from './keys';
const DOMAIN = 'sandboxb1a1755b98884a1ba829ea395300f4f6.mailgun.org';
const mailgun = mg({ apiKey: MAILGUN_API_KEY, domain: DOMAIN });


admin.initializeApp(functions.config().firebase);

exports.handleNewPlace = functions.firestore.document('places/{placeId}').onCreate(event => {
  const newPlace = event.data.data();
  const store = admin.firestore();
  return store.collection('users').where('admin', '==', true).get().then((querySnapshot) => {
    let adminUser = {};
    querySnapshot.forEach(doc => {
      if (doc.exists) adminUser = doc.data();
    });
    const emailData = {
      from: `WeRate <mailgun@${DOMAIN}>`,
      to: adminUser.email,
      subject: 'WeRate - A new business has been added',
      text: `Hello ${adminUser.firstName}, ${newPlace.name} has been added to WeRate`
    };
    mailgun.messages().send(emailData, function (error, body) {
      if (!error) {
        console.log('Email sent to: ', adminUser.email, body);
      } else {
        console.log('Error sending email: ', error);
      }
    });
  })
  .catch(error => {
    console.log('Error getting firestore documents: ', error);
  });
});

exports.approveUser = functions.https.onRequest((req, res) => {
  const store = admin.firestore();
  store.collection('__users')
  .doc(req.params[0].slice(1))
  .get()
  .then(doc => {
    const user = doc.data(); // The Firebase user.
    const { email, firstName, lastName, business, phone, website } = user;
    const emailData = {
      from: `WeRate <mailgun@${DOMAIN}>`,
      to: email,
      subject: 'WeRate - A new business has been added',
      text: `Hello ${user.firstName}, You have been approved and can now log in to WeRate.`
    };
    mailgun.messages().send(emailData, function (error, body) {
      if (!error) {
        console.log('Email sent to: ', email, body);
        admin.auth().createUser({
          email,
          emailVerified: true,
          password: user.password
        })
        .then(userRecord => {
          store.collection('users').doc(userRecord.uid).set({
            reviewIds: [],
            approved: true,
            admin: false,
            id: userRecord.uid,
            firstName,
            lastName,
            business,
            website,
            email,
            phone
          })
          .then(user => {
            console.log('NEW**USER', user);
            res.end();
          });
        });
      } else {
        console.log('Error sending email: ', error);
      }
    });
  });
});

exports.handleSignUpRequest = functions.firestore.document('__users/{__userId}').onCreate(event => {
  const pendingUser = event.data.data();
  const actionLink = `https://us-central1-werate-68084.cloudfunctions.net/approveUser/${event.params.__userId}`;
  return generateEmail(pendingUser, actionLink)
    .then(data => console.log(data))
    .catch(err => console.log(err));
});


async function generateEmail (pendingUser, actionLink) {
  try {
    const emailData = await constructEmail(pendingUser, actionLink);
    return await sendEmail(emailData);
  } catch (error) {
    console.log(error);
  }
}

async function sendEmail (emailData) {
  try {
    const data = await mailgun.messages().send(emailData);
    console.log(data);
    return data;
  } catch (error) {
    console.log('Error sending email: ', error);
    return;
  }
}

async function constructEmail (pendingUser, actionLink) {
  const adminUser = await getAdmin();
  const emailData = {
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
  };
  return emailData;
}

async function getAdmin () {
  let adminUser;
  try {
    const store = admin.firestore();
    const querySnapshot = await store.collection('users').where('admin', '==', true).get();
    querySnapshot.forEach(doc => {
      if (doc.exists) adminUser = doc.data();
    });
    return adminUser;
  } catch (error) {
    console.log('Error getting admin from database: ', error);
    return;
  }
}
