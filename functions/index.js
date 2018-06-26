const functions = require('firebase-functions');
const admin = require('firebase-admin');

const replyAdapter = require('./src/replyAdapter');
const firestore = require('./src/firestore');

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

exports.curriculumVitaeResponses = functions.https.onRequest((request, firebaseResponse) => {

    const action = (request.body.queryResult.action)
        ? request.body.queryResult.action : 'default';

    const requestSource = (request.body.originalDetectIntentRequest.payload.source)
        ? request.body.originalDetectIntentRequest.payload.source.toUpperCase()
        : 'PLATFORM_UNSPECIFIED';

    const context = request.body.queryResult.outputContexts;

    console.info(`request: {requestSource: ${requestSource}, action: ${action}}`);

    firestore(db).getResponse(action)
        .then(firestoreResponse => {
            firebaseResponse.json(
                replyAdapter(firestoreResponse, requestSource, context)
            );
        });
});