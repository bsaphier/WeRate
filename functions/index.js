'use strict';

let createNewAuthuser = (() => {
  var _ref5 = _asyncToGenerator(function* (email, tempPassword) {
    try {
      const newAuthUser = yield admin.auth().createUser({
        email,
        emailVerified: true,
        password: tempPassword
      });
      return newAuthUser;
    } catch (error) {
      console.log('FAIL * createNewAuthuser * ', error);
    }
  });

  return function createNewAuthuser(_x6, _x7) {
    return _ref5.apply(this, arguments);
  };
})();

let createNewUserInDb = (() => {
  var _ref6 = _asyncToGenerator(function* ({ firstName, lastName, business, website, email, phone }, uid) {
    try {
      const store = getStore();
      const docRef = yield store.collection(USERS).doc(uid).set({
        id: uid,
        reviewIds: [],
        admin: false,
        approved: false,
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
  });

  return function createNewUserInDb(_x8, _x9) {
    return _ref6.apply(this, arguments);
  };
})();

let deletePendingUserFromDb = (() => {
  var _ref7 = _asyncToGenerator(function* (uid) {
    try {
      const store = getStore();
      return yield store.collection(REQ_ACCOUNT).doc(uid).delete();
    } catch (error) {
      console.log('Error deleting firestore pending_user', error);
    }
  });

  return function deletePendingUserFromDb(_x10) {
    return _ref7.apply(this, arguments);
  };
})();

let sendEmail = (() => {
  var _ref8 = _asyncToGenerator(function* (emailData) {
    try {
      const data = yield mailgun.messages().send(emailData);
      console.log(data);
      return data;
    } catch (error) {
      console.log('Error sending email: ', error);
      return;
    }
  });

  return function sendEmail(_x11) {
    return _ref8.apply(this, arguments);
  };
})();

let getAdmin = (() => {
  var _ref9 = _asyncToGenerator(function* () {
    let adminUser;
    try {
      const store = getStore();
      const querySnapshot = yield store.collection(USERS).where('admin', '==', true).get();
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
    return _ref9.apply(this, arguments);
  };
})();

var _firebaseFunctions = require('firebase-functions');

var functions = _interopRequireWildcard(_firebaseFunctions);

var _firebaseAdmin = require('firebase-admin');

var admin = _interopRequireWildcard(_firebaseAdmin);

var _mailgunJs = require('mailgun-js');

var _mailgunJs2 = _interopRequireDefault(_mailgunJs);

var _email = require('./email');

var _env = require('./env');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /* global exports,console*/


const { USERS, PLACES, REQ_ACCOUNT } = _env.FIRESTORE;
const DOMAIN = 'sandboxb1a1755b98884a1ba829ea395300f4f6.mailgun.org';
const mailgun = (0, _mailgunJs2.default)({ apiKey: _env.MAILGUN_API_KEY, domain: DOMAIN });

admin.initializeApp(functions.config().firebase);

const getStore = () => admin.firestore();

const generateTempPassword = () => {
  // TODO ...
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
});

const constructUserRequestApprovedEmail = (user, tempPassword) => ({
  from: `WeRate <mailgun@${DOMAIN}>`,
  to: user.email,
  subject: 'Welcome to WeRate!',
  text: `Hello ${user.firstName}, You have been approved and can now log in to WeRate with the password: ${tempPassword}`
});

const approveUserRequest = (() => {
  var _ref = _asyncToGenerator(function* (uid) {
    try {
      const store = getStore();
      return yield store.collection(REQ_ACCOUNT).doc(uid).update({ approved: true });
    } catch (error) {
      console.log('FAIL * approveUserRequest * ', error);
    }
  });

  return function approveUserRequest(_x) {
    return _ref.apply(this, arguments);
  };
})();

const handleUserRequestApproved = (() => {
  var _ref2 = _asyncToGenerator(function* (user) {
    const tempPassword = generateTempPassword();
    try {
      const { uid } = yield createNewAuthuser(user.email, tempPassword);
      const emailData = constructUserRequestApprovedEmail(user, tempPassword);
      yield createNewUserInDb(user, uid);
      yield deletePendingUserFromDb(uid);
      return yield sendEmail(emailData);
    } catch (error) {
      console.log('FAIL * handleUserRequestApproved * ', error);
    }
  });

  return function handleUserRequestApproved(_x2) {
    return _ref2.apply(this, arguments);
  };
})();

const generateSignUpRequestEmail = (() => {
  var _ref3 = _asyncToGenerator(function* (pendingUser, actionLink) {
    try {
      const adminUser = yield getAdmin();
      const emailData = constructSignUpRequestEmail(pendingUser, actionLink, adminUser);
      return yield sendEmail(emailData);
    } catch (error) {
      console.log('FAIL * generateSignUpRequestEmail * ', error);
    }
  });

  return function generateSignUpRequestEmail(_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
})();

const generateNewPlaceEmail = (() => {
  var _ref4 = _asyncToGenerator(function* (newPlace) {
    try {
      const adminUser = yield getAdmin();
      const emailData = constructNewPlaceEmail(adminUser, newPlace);
      return yield sendEmail(emailData);
    } catch (error) {
      console.log('FAIL * generateSignUpRequestEmail * ', error);
    }
  });

  return function generateNewPlaceEmail(_x5) {
    return _ref4.apply(this, arguments);
  };
})();

exports.approveUser = functions.https.onRequest((req, res) => {
  const requestId = req.params[0].slice(1);
  approveUserRequest(requestId).then(data => {
    console.log('SUCCESS * approveUser * ', data);
    res.end();
  }).catch(err => {
    console.log('FAIL * approveUser * ', err);
    res.end();
  });
});

exports.onUserRequestApproved = functions.firestore.document(`${REQ_ACCOUNT}/{pendingUserId}`).onUpdate(event => {
  const pendingUser = event.data.data();
  const { approved } = pendingUser;
  const { approved: approvedPrev } = event.data.previous.data();
  if (!approvedPrev && approved) {
    return handleUserRequestApproved(pendingUser).then(data => console.log('SUCCESS * onUserRequestApproved * ', data)).catch(err => console.log('FAIL * onUserRequestApproved * ', err));
  }
});

exports.handleSignUpRequest = functions.firestore.document(`${REQ_ACCOUNT}/{pendingUserId}`).onCreate(event => {
  const pendingUser = event.data.data();
  const actionLink = `${_env.MAILGUN_BASE_URL}/approveUser/${event.params.pendingUserId}`;
  return generateSignUpRequestEmail(pendingUser, actionLink).then(data => console.log('SUCCESS * handleSignUpRequest * ', data)).catch(err => console.log('FAIL * handleSignUpRequest * ', err));
});

exports.handleNewPlace = functions.firestore.document(`${PLACES}/{placeId}`).onCreate(event => {
  const newPlace = event.data.data();
  return generateNewPlaceEmail(newPlace).then(data => console.log('SUCCESS * handleNewPlace * ', data)).catch(err => console.log('FAIL * handleNewPlace * ', err));
});