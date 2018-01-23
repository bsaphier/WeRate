/* global exports,console*/
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import mg from 'mailgun-js';
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
