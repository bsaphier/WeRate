import * as functions from 'firebase-functions';
import admin from 'firebase-admin';
import mg from 'mailgun-js';
import { MAILGUN_API_KEY } from './keys';
const DOMAIN = 'sandboxb1a1755b98884a1ba829ea395300f4f6.mailgun.org';


admin.initializeApp(functions.config().firebase);


const mailgun = mg({ apiKey: MAILGUN_API_KEY, domain: DOMAIN });


exports.sendNewPlaceEmail = functions.firestore
  .document('places/{placeId}')
  .onCreate(event => {
    const newPlace = event.data.data();
    const emailData = {
      from: `WeRate <mailgun@${DOMAIN}>`,
      to: 'b.saphier@gmail.com',
      subject: 'WeRate - A new business has been added',
      text: `${newPlace.name} has been added to WeRate`
    };
    mailgun.messages().send(emailData, function (error, body) {
      console.log('*******DATA*******', newPlace);
      console.log('*******ERRROR*******', body);
      console.log('*******BODY*******', body);
    });
});
