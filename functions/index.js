'use strict';

const functions = require('firebase-functions');
const responses = require('./responses.json');
const replyAdapter = require('./replyAdapter');

exports.curriculumVitaeResponses = functions.https.onRequest((request, response) => {
    
    const intent = (!request.body.result.metadata.intentName)
        ? 'default' : request.body.result.metadata.intentName;

    const requestSource = (request.body.originalRequest)
        ? request.body.originalRequest.source : 'default';
    
    const context = request.body.result.contexts;

    console.info(`request: {requestSource: ${requestSource}, intent: ${intent}}`);
        
    // Send response to Dialogflow
    response.json(
        replyAdapter(responses[intent], requestSource, context)
    );
});