'use strict';

const functions = require('firebase-functions');
const responsesText = require('./responsesText');
const telegramRequest = 'telegram';

exports.curriculumVitaeResponses = functions.https.onRequest((request, response) => {
    
    let intent = request.body.result.metadata.intentName;
    const inputContexts = request.body.result.contexts;
    const requestSource = (request.body.originalRequest)
        ? request.body.originalRequest.source : undefined;
    
    // console.info(`Request headers: ${JSON.stringify(request.headers)}`);
    // console.info(`Request body: ${JSON.stringify(request.body)}`);
    // console.info(`parameters: ${JSON.stringify(parameters)}`);
    // console.info(`input context: ${JSON.stringify(inputContexts)}`);
    // console.info(`request source: ${JSON.stringify(requestSource)}`);
    // console.info(`intent: ${JSON.stringify(intent)}`);

    const intentsHandlers = {

        'anoExperiencia': () => {
            sendResponse(requestSource, inputContexts, response, responsesText('anoExperiencia'));
        }
    };


    // If undefined or unknown action use the default handler
    if (!intentsHandlers[intent]) {
        intent = 'default';
    }

    // Run the proper handler function to handle the request from Dialogflow
    intentsHandlers[intent]();

});

function sendResponse(requestSource, inputContexts, response, message) {

    let objResponse = {};
    objResponse.speech = message.text;
    objResponse.displayText = message.text;

    response.json(objResponse); // Send response to Dialogflow
    
}