const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

const replyAdapter = require('./replyAdapter');

exports.curriculumVitaeResponses = functions.https.onRequest((request, response) => {

    const action = (request.body.queryResult.action)
        ? request.body.queryResult.action : 'default';

    const requestSource = (request.body.originalDetectIntentRequest.payload.source)
        ? request.body.originalDetectIntentRequest.payload.source.toUpperCase()
        : 'PLATFORM_UNSPECIFIED';

    const context = request.body.queryResult.outputContexts;

    console.info(`request: {requestSource: ${requestSource}, action: ${action}}`);

    // Send response to Dialogflow
    db.collection('responses').doc(action).get()
            .then(dbResponse => {
                console.info('dbResponse', dbResponse);
                response.json(
                    replyAdapter(dbResponse.data(), requestSource, context)
                );
            });
});