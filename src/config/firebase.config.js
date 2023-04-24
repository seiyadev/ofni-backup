require("dotenv").config();
const admin = require("firebase-admin");
const serviceAccount = require("../../firebase.json");
const { getFirestore } = require("firebase-admin/firestore");
const { getAuth } = require("firebase-admin/auth");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = getFirestore();
const auth = getAuth();

module.exports = {
  db,
  auth,
};
