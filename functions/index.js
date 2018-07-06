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

    const firestoreResponse = firestore(db).getResponse(action);
    const firestoreReplies = firestore(db).getQuickReplies();

    Promise.all([firestoreResponse, firestoreReplies])
        .then(firestoreData => {
            firebaseResponse.json(
                replyAdapter(firestoreData[0], firestoreData[1], requestSource, context)
            );
        });
});