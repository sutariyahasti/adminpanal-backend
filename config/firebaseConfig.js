const admin = require('firebase-admin');
const serviceAccount = require('../admin-penal-97654-firebase-adminsdk-z9ix8-cb954a6122.json'); // Replace with your Firebase service account key file path

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'admin-penal-97654.appspot.com' // Replace with your Firebase Storage bucket name
});

const bucket = admin.storage().bucket();

module.exports = { admin, bucket };
