'use strict';

var _firebaseFunctions = require('firebase-functions');

var functions = _interopRequireWildcard(_firebaseFunctions);

var _firebaseAdmin = require('firebase-admin');

var _firebaseAdmin2 = _interopRequireDefault(_firebaseAdmin);

var _mailgunJs = require('mailgun-js');

var _mailgunJs2 = _interopRequireDefault(_mailgunJs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

_firebaseAdmin2.default.initializeApp(functions.config().firebase);

const API_KEY = '***REMOVED***';
const DOMAIN = 'sandboxb1a1755b98884a1ba829ea395300f4f6.mailgun.org';

const mailgun = (0, _mailgunJs2.default)({ apiKey: API_KEY, domain: DOMAIN });

exports.sendNewPlaceEmail = functions.firestore.document('places/{placeId}').onCreate(event => {
  const newPlace = event.data.data();
  const emailData = {
    from: `WeRate <mailgun@${DOMAIN}>`,
    to: 'b.saphier@gmail.com',
    subject: 'WeRate - A new business has been added',
    text: `Testing some Mailgun awesomeness! ...${newPlace.name}`
  };
  mailgun.messages().send(emailData, function (error, body) {
    console.log('*******DATA*******', newPlace);
    console.log('*******ERRROR*******', body);
    console.log('*******BODY*******', body);
  });
});