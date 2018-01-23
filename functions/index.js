'use strict';

var _firebaseFunctions = require('firebase-functions');

var functions = _interopRequireWildcard(_firebaseFunctions);

var _firebaseAdmin = require('firebase-admin');

var admin = _interopRequireWildcard(_firebaseAdmin);

var _mailgunJs = require('mailgun-js');

var _mailgunJs2 = _interopRequireDefault(_mailgunJs);

var _keys = require('./keys');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

const DOMAIN = 'sandboxb1a1755b98884a1ba829ea395300f4f6.mailgun.org';
const mailgun = (0, _mailgunJs2.default)({ apiKey: _keys.MAILGUN_API_KEY, domain: DOMAIN });

const app = admin.initializeApp(functions.config().firebase);

exports.handleNewPlace = functions.firestore.document('places/{placeId}').onCreate(event => {
  const newPlace = event.data.data();
  const store = admin.firestore();
  return store.collection('users').where('admin', '==', true).get().then(querySnapshot => {
    let adminUser = {};
    querySnapshot.forEach(doc => {
      if (doc.exists) adminUser = doc.data();
    });
    const emailData = {
      from: `WeRate <mailgun@${DOMAIN}>`,
      to: 'b.saphier@gmail.com',
      subject: 'WeRate - A new business has been added',
      text: `Hello ${adminUser.firstName}, ${newPlace.name} has been added to WeRate`
    };
    mailgun.messages().send(emailData, function (error, body) {
      console.log('Data: ', newPlace);
      console.log('Error sending email: ', error);
      console.log('Body', body);
      console.log('Admin: ', adminUser);
    });
  }).catch(error => {
    console.log('Error getting documents: ', error);
  });
});

exports.logStoreData = functions.https.onRequest((req, res) => {
  const store = admin.firestore();
  return store.collection('users').where('admin', '==', true).get().then(querySnapshot => {
    let adminUser = {};
    querySnapshot.forEach(doc => {
      if (doc.exists) admin = doc.data();
    });
    console.log('******* => ', adminUser);
    res.send(adminUser);
  }).catch(function (error) {
    console.log('Error getting documents: ', error);
  });
});