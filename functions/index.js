'use strict';

const functions = require('firebase-functions');
const responses = require('./responses.json');
const replyAdapter = require('./replyAdapter');

exports.curriculumVitaeResponses = functions.https.onRequest((request, response) => {
    
    const intent = (!request.body.queryResult.action)
        ? 'default' : request.body.queryResult.action;

    const requestSource = (request.body.originalDetectIntentRequest)
        ? request.body.originalDetectIntentRequest.source : 'default';
    
    const context = request.body.outputContexts;
    
    console.info(`request: {requestSource: ${requestSource}, intent: ${intent}}`);
        
    // Send response to Dialogflow
    response.json(
        replyAdapter(responses[intent], requestSource, context)
    );
});