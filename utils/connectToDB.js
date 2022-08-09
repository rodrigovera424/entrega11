var admin = require("firebase-admin");
var serviceAccount = require("../keyfile.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const connectToDB = admin.firestore();

module.exports = connectToDB;
