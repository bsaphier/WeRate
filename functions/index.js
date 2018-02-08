'use strict';

let generateEmail = (() => {
  var _ref = _asyncToGenerator(function* (pendingUser, actionLink) {
    try {
      const emailData = yield constructEmail(pendingUser, actionLink);
      return yield sendEmail(emailData);
    } catch (error) {
      console.log(error);
    }
  });

  return function generateEmail(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

let sendEmail = (() => {
  var _ref2 = _asyncToGenerator(function* (emailData) {
    try {
      const data = yield mailgun.messages().send(emailData);
      console.log(data);
      return data;
    } catch (error) {
      console.log('Error sending email: ', error);
      return;
    }
  });

  return function sendEmail(_x3) {
    return _ref2.apply(this, arguments);
  };
})();

let constructEmail = (() => {
  var _ref3 = _asyncToGenerator(function* (pendingUser, actionLink) {
    const adminUser = yield getAdmin();
    const emailData = {
      from: `WeRate <mailgun@${DOMAIN}>`,
      to: adminUser.email,
      subject: `WeRate - %recipient.puFirstName% %recipient.puLastName% wants to join your group!`,
      html: _email.email,
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
  });

  return function constructEmail(_x4, _x5) {
    return _ref3.apply(this, arguments);
  };
})();

let getAdmin = (() => {
  var _ref4 = _asyncToGenerator(function* () {
    let adminUser;
    try {
      const store = admin.firestore();
      const querySnapshot = yield store.collection('users').where('admin', '==', true).get();
      querySnapshot.forEach(function (doc) {
        if (doc.exists) adminUser = doc.data();
      });
      return adminUser;
    } catch (error) {
      console.log('Error getting admin from database: ', error);
      return;
    }
  });

  return function getAdmin() {
    return _ref4.apply(this, arguments);
  };
})();

var _firebaseFunctions = require('firebase-functions');

var functions = _interopRequireWildcard(_firebaseFunctions);

var _firebaseAdmin = require('firebase-admin');

var admin = _interopRequireWildcard(_firebaseAdmin);

var _mailgunJs = require('mailgun-js');

var _mailgunJs2 = _interopRequireDefault(_mailgunJs);

var _email = require('./email');

var _keys = require('./keys');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /* global exports,console*/


const DOMAIN = 'sandboxb1a1755b98884a1ba829ea395300f4f6.mailgun.org';
const mailgun = (0, _mailgunJs2.default)({ apiKey: _keys.MAILGUN_API_KEY, domain: DOMAIN });

admin.initializeApp(functions.config().firebase);

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
  }).catch(error => {
    console.log('Error getting firestore documents: ', error);
  });
});

exports.approveUser = functions.https.onRequest((req, res) => {
  const store = admin.firestore();
  store.collection('__users').doc(req.params[0].slice(1)).get().then(doc => {
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
        }).then(userRecord => {
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
          }).then(user => {
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
  return generateEmail(pendingUser, actionLink).then(data => console.log(data)).catch(err => console.log(err));
});