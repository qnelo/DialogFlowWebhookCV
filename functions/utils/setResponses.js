const admin = require('firebase-admin');

const serviceAccount = require('../../credential.json');
const responses = require('./firebase_responses.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

for (let key of Object.keys(responses)) {
    db.collection('responsesTest').doc(key).set(responses[key])
        .then(ref => {
            console.info(`insert of ${key}: ${JSON.stringify(ref)}`);
        });
}