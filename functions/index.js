'use strict';

const functions = require('firebase-functions');
const responses = require('./responses.json');
const replyAdapter = require('./replyAdapter');

exports.curriculumVitaeResponses = functions.https.onRequest((request, response) => {

    const action = (request.body.queryResult.action)
        ? request.body.queryResult.action : 'default';

    const requestSource = (request.body.originalDetectIntentRequest.payload.source)
        ? request.body.originalDetectIntentRequest.payload.source.toUpperCase()
        : 'PLATFORM_UNSPECIFIED';

    const context = request.body.queryResult.outputContexts;
    
    // console.info(`complete request: ${JSON.stringify(request.body, null, 4)}`);
    // console.info(`request: {requestSource: ${requestSource}, action: ${action}}`);

    // Send response to Dialogflow
    response.json(
        replyAdapter(responses[action], requestSource, context)
    );
});