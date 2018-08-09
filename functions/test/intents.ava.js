const test = require('ava');
const R = require('ramda');
const rewire = require('rewire');

const newStandartRequest = require('./newStandartRequest.json');
const responses = require('./mock/responses.json');
let myFunctions = rewire('../index');

const db = require('./mock/firestoreMock');

myFunctions.__set__('db', db);

test.cb('Telegram Saludo', t => {

    // Arrange
    let request = R.clone(newStandartRequest);
    request.body.queryResult.action = 'saludo';
    request.body.originalDetectIntentRequest.payload.source = 'telegram';
    request.body.queryResult.outputContexts = [
        {
            name: 'projects/newagent-86de9/agent/sessions/asdf/contexts/cv',
            lifespanCount: 5,
            parameters: {
                nombreUsuario: 'Huachimingo',
                'nombreUsuario.original': 'Huachimingo'
            }
        },
        {
            name: 'projects/newagent-86de9/agent/sessions/asdf/contexts/saludo',
            parameters: {
                nombreUsuario: 'Huachimingo',
                'nombreUsuario.original': 'Huachimingo'
            }
        }
    ];

    const expectedResponse = {
        fulfillmentText: 'Hola Huachimingo, puedes consultar acerca de la experiencia de Camilo.',
        fulfillmentMessages: [
            {
                platform: request.body.originalDetectIntentRequest.payload.source.toUpperCase(),
                text: {
                    text: [
                        'Hola Huachimingo, puedes consultar acerca de la experiencia de Camilo.'
                    ]
                }
            },
            {
                platform: request.body.originalDetectIntentRequest.payload.source.toUpperCase(),
                quickReplies: {
                    title: responses.saludo.text[1],
                    quickReplies: []
                }
            }
        ]
    };

    const response = {
        json: (objectResponse) => {
            // Assert
            t.is(objectResponse.fulfillmentText, expectedResponse.fulfillmentText);
            t.deepEqual(
                objectResponse.fulfillmentMessages[0], expectedResponse.fulfillmentMessages[0]
            );
            t.is(
                objectResponse.fulfillmentMessages[1].platform,
                expectedResponse.fulfillmentMessages[1].platform
            );
            t.is(
                objectResponse.fulfillmentMessages[1].quickReplies.title,
                expectedResponse.fulfillmentMessages[1].quickReplies.title
            );
            t.end();
        }
    };

    // Act
    myFunctions.curriculumVitaeResponses(request, response);

});

test.cb('Telegram default intent', t => {

    // Arrange
    let request = R.clone(newStandartRequest);
    request.body.queryResult.action = '';
    request.body.originalDetectIntentRequest.payload.source = 'telegram';

    const expectedResponse = {
        fulfillmentText: responses.default.text[0],
        fulfillmentMessages: [
            {
                platform: request.body.originalDetectIntentRequest.payload.source.toUpperCase(),
                text: {
                    text: []
                }
            },
            {
                platform: request.body.originalDetectIntentRequest.payload.source.toUpperCase(),
                quickReplies: {
                    title: responses.default.text[0],
                    quickReplies: []
                }
            }
        ]
    };

    const response = {
        json: (objectResponse) => {
            // Assert
            t.deepEqual(objectResponse.data, expectedResponse.data);
            t.deepEqual(objectResponse, expectedResponse);
            t.end();
        }
    };

    // Act
    myFunctions.curriculumVitaeResponses(request, response);

});

test.cb('Default intent with undefined request source', t => {

    // Arrange
    let request = R.clone(newStandartRequest);
    request.body.queryResult.action = '';
    request.body.originalDetectIntentRequest.payload.source = null;

    const expectedResponse = {
        fulfillmentText: responses.default.text[0],
        fulfillmentMessages: [
            {
                platform: 'PLATFORM_UNSPECIFIED',
                text: {
                    text: [responses.default.text[0]]
                }
            },
            {
                platform: 'PLATFORM_UNSPECIFIED',
                quickReplies: {
                    title: 'Respuestas rápidas',
                    quickReplies: []
                }
            }
        ]
    };

    const response = {
        json: (objectResponse) => {
            // Assert
            t.deepEqual(objectResponse.data, expectedResponse.data);
            t.deepEqual(objectResponse, expectedResponse);
            t.end();
        }
    };

    // Act
    myFunctions.curriculumVitaeResponses(request, response);

});

test.cb('Telegram anoExperiencia intent', t => {

    // Arrange
    let request = R.clone(newStandartRequest);
    request.body.queryResult.action = 'anoExperiencia';
    request.body.originalDetectIntentRequest.payload.source = 'telegram';

    const expectedResponse = {
        fulfillmentText: responses.anoExperiencia.text[0],
        fulfillmentMessages: [
            {
                platform: request.body.originalDetectIntentRequest.payload.source.toUpperCase(),
                text: {
                    text: []
                }
            },
            {
                platform: request.body.originalDetectIntentRequest.payload.source.toUpperCase(),
                quickReplies: {
                    title: responses.anoExperiencia.text[0],
                    quickReplies: []
                }
            }
        ]
    };

    const response = {
        json: (objectResponse) => {
            // Assert
            t.is(objectResponse.fulfillmentText, expectedResponse.fulfillmentText);
            t.deepEqual(
                objectResponse.fulfillmentMessages[0], expectedResponse.fulfillmentMessages[0]
            );
            t.is(
                objectResponse.fulfillmentMessages[1].platform,
                expectedResponse.fulfillmentMessages[1].platform
            );
            t.is(
                objectResponse.fulfillmentMessages[1].quickReplies.title,
                expectedResponse.fulfillmentMessages[1].quickReplies.title
            );
            t.end();
        }
    };

    // Act
    myFunctions.curriculumVitaeResponses(request, response);

});

test.cb('Telegram Becual intent', t => {

    // Arrange
    let request = R.clone(newStandartRequest);
    request.body.queryResult.action = 'becual';
    request.body.originalDetectIntentRequest.payload.source = 'telegram';

    const expectedResponse = {
        fulfillmentText: responses.becual.text[0],
        fulfillmentMessages: [
            {
                platform: request.body.originalDetectIntentRequest.payload.source.toUpperCase(),
                text: {
                    text: [
                        responses.becual.text[0],
                        responses.becual.text[1],
                        responses.becual.text[2]
                    ]
                }
            },
            {
                platform: request.body.originalDetectIntentRequest.payload.source.toUpperCase(),
                quickReplies: {
                    title: responses.becual.text[3],
                    quickReplies: []
                }
            }
        ]
    };

    const response = {
        json: (objectResponse) => {
            // Assert
            t.is(objectResponse.fulfillmentText, expectedResponse.fulfillmentText);
            t.deepEqual(
                objectResponse.fulfillmentMessages[0], expectedResponse.fulfillmentMessages[0]
            );
            t.is(
                objectResponse.fulfillmentMessages[1].platform,
                expectedResponse.fulfillmentMessages[1].platform
            );
            t.is(
                objectResponse.fulfillmentMessages[1].quickReplies.title,
                expectedResponse.fulfillmentMessages[1].quickReplies.title
            );
            t.end();
        }
    };

    // Act
    myFunctions.curriculumVitaeResponses(request, response);

});

test.cb('Telegram disponibilidad intent', t => {

    // Arrange
    let request = R.clone(newStandartRequest);
    request.body.queryResult.action = 'disponibilidad';
    request.body.originalDetectIntentRequest.payload.source = 'telegram';

    const expectedResponse = {
        fulfillmentText: responses.disponibilidad.text[0],
        fulfillmentMessages: [
            {
                platform: request.body.originalDetectIntentRequest.payload.source.toUpperCase(),
                text: {
                    text: [
                        responses.disponibilidad.text[0],
                        responses.disponibilidad.text[1]
                    ]
                }
            },
            {
                platform: request.body.originalDetectIntentRequest.payload.source.toUpperCase(),
                quickReplies: {
                    title: responses.disponibilidad.text[2],
                    quickReplies: []
                }
            }
        ]
    };

    const response = {
        json: (objectResponse) => {
            // Assert
            t.is(objectResponse.fulfillmentText, expectedResponse.fulfillmentText);
            t.deepEqual(
                objectResponse.fulfillmentMessages[0], expectedResponse.fulfillmentMessages[0]
            );
            t.is(
                objectResponse.fulfillmentMessages[1].platform,
                expectedResponse.fulfillmentMessages[1].platform
            );
            t.is(
                objectResponse.fulfillmentMessages[1].quickReplies.title,
                expectedResponse.fulfillmentMessages[1].quickReplies.title
            );
            t.end();
        }
    };

    // Act
    myFunctions.curriculumVitaeResponses(request, response);

});