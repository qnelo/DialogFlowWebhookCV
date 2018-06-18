const functions = require('firebase-functions');
// const admin = require('firebase-admin');

// admin.initializeApp(functions.config().firebase);
// const db = admin.firestore();

const replyAdapter = require('./src/replyAdapter');
const firestore = require('./src/firestore');

exports.curriculumVitaeResponses = functions.https.onRequest((request, firebaseResponse) => {

    const action = (request.body.queryResult.action)
        ? request.body.queryResult.action : 'default';

    const requestSource = (request.body.originalDetectIntentRequest.payload.source)
        ? request.body.originalDetectIntentRequest.payload.source.toUpperCase()
        : 'PLATFORM_UNSPECIFIED';

    const context = request.body.queryResult.outputContexts;

    console.info(`request: {requestSource: ${requestSource}, action: ${action}}`);

    const ft = firestore(functions);
    console.info('firestore', ft.getResponse);

    ft.getResponse(action)
        .then(firestoreResponse => {
            console.info('firestoreResponse', firestoreResponse);
            firebaseResponse.json(
                replyAdapter(firestoreResponse, requestSource, context)
            );
        });
});