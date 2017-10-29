const test = require('ava');
const standartRequest = require('./standartRequest.json');
const responses = require('../responses.json');
const myFunctions = require('../index');

test('Telegram default intent', t => {
    
    // Arrange
    let request = Object.create(standartRequest);
    request.body.result.metadata.intentName = '';
    request.body.originalRequest = { source: 'telegram' };
    
    const expectedResponse = {
        speech: responses.default.text[0],
        displayText: responses.default.text[0],
        messages: [
            {
                'type': 2,
                'platform': 'telegram',
                'title': 'default',
                'replies': []
            }
        ]
    };

    const response = {
        json: (objectResponse) => {
            // Assert
            t.deepEqual(objectResponse.data, expectedResponse.data);
            t.deepEqual(objectResponse, expectedResponse);
        }
    };
    
    // Act
    myFunctions.curriculumVitaeResponses(request, response);
    
});

test('Default intent with undefined request source', t => {
    
    // Arrange
    let request = Object.create(standartRequest);
    request.body.result.metadata.intentName = '';
    request.body.originalRequest = null;
    
    const expectedResponse = {
        speech: responses.default.text[0],
        displayText: responses.default.text[0],
        messages: [
            {
                'type': 2,
                'platform': 'default',
                'title': 'default',
                'replies': []
            }
        ]
    };
    const response = {
        json: (objectResponse) => {
            // Assert
            t.deepEqual(objectResponse.data, expectedResponse.data);
            t.deepEqual(objectResponse, expectedResponse);
        }
    };
    
    // Act
    myFunctions.curriculumVitaeResponses(request, response);
    
});

test('Telegram anoExperiencia intent', t => {
    
    // Arrange
    let request = Object.create(standartRequest);
    request.body.result.metadata.intentName = 'anoExperiencia';
    request.body.originalRequest = { source: 'telegram' };
    
    const expectedResponse = {
        speech: responses.anoExperiencia.text[0],
        displayText: responses.anoExperiencia.text[0],
        messages: [
            {
                'type': 2,
                'platform': 'telegram',
                'title': responses.anoExperiencia.text[0],
                'replies': [
                    responses.anoExperiencia.quickReply[0],
                    responses.anoExperiencia.quickReply[1],
                    responses.anoExperiencia.quickReply[2],
                    responses.anoExperiencia.quickReply[3]
                ]
            }
        ]
        
    };

    const response = {
        json: (objectResponse) => {
            // Assert
            t.deepEqual(objectResponse.data, expectedResponse.data);
            t.deepEqual(objectResponse, expectedResponse);
        }
    };
    
    // Act
    myFunctions.curriculumVitaeResponses(request, response);
    
});

test('Telegram Becual intent', t => {
    
    // Arrange
    let request = Object.create(standartRequest);
    request.body.result.metadata.intentName = 'becual';
    request.body.originalRequest = { source: 'telegram' };
    
    const expectedResponse = {
        speech: responses.becual.text[0],
        displayText: responses.becual.text[0],
        messages: [
            {
                type: 0,
                platform: 'telegram',
                speech: responses.becual.text[0]
            },
            {
                type: 0,
                platform: 'telegram',
                speech: responses.becual.text[1]
            },
            {
                'type': 2,
                'platform': 'telegram',
                'title': responses.becual.text[2],
                'replies': [
                    responses.becual.quickReply[0],
                    responses.becual.quickReply[1],
                    responses.becual.quickReply[2],
                    responses.becual.quickReply[3]
                ]
            }
        ]
    };

    const response = {
        json: (objectResponse) => {
            // Assert
            t.deepEqual(objectResponse.data, expectedResponse.data);
            t.deepEqual(objectResponse, expectedResponse);
        }
    };
    
    // Act
    myFunctions.curriculumVitaeResponses(request, response);
    
});