'use strict';

const functions = require('firebase-functions');
const responses = require('./responses.json');
const replyAdapter = require('./replyAdapter');

exports.curriculumVitaeResponses = functions.https.onRequest((request, response) => {
    
    let intent = request.body.result.metadata.intentName;
    //const inputContexts = request.body.result.contexts;
    const requestSource = (request.body.originalRequest)
        ? request.body.originalRequest.source : 'default';

    console.info(`request: {requestSource: ${requestSource}, intent: ${intent}}`);

    // If undefined or unknown action use the default handler
    if (!intent) {
        intent = 'default';
    }
        
    // Send response to Dialogflow
    response.json(
        replyAdapter(responses[intent], requestSource)
    );
});