const fs = require('fs');
const admin = require('firebase-admin');

const serviceAccount = require('../../credential.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
let content = {};

db.collection('responses').get()
    .then((snapshot) => {
        snapshot.forEach(doc => {
            content[doc.id] = doc.data();
        });

        content = JSON.stringify(content);
        
        fs.writeFile('firebase_responses.json', content, 'utf8', err => {
            if (err) {
                return console.info(err);
            }
        
            return console.info('The file was saved!');
        });
    })
    .catch((err) => {
        console.info('Error getting documents', err);
    });