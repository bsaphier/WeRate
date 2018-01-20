import * as functions from 'firebase-functions';
import admin from 'firebase-admin';


admin.initializeApp(functions.config().firebase);


exports.sendNewPlaceEmail = functions.firestore
  .document('places/{placeId}')
  .onCreate(event => {
    const newPlace = event.data.data();
});
