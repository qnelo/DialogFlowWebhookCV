const test = require('ava');
const R = require('ramda');
const newStandartRequest = require('./newStandartRequest.json');
const responses = require('../responses.json');
const myFunctions = require('../index');

test('Telegram Saludo', t => {

    // Arrange
    let request = R.clone(newStandartRequest);
    request.body.queryResult.action = 'saludo';
    request.body.originalDetectIntentRequest.payload.source = 'telegram';
    request.body.queryResult.outputContexts = [
        {
            name: 'projects/newagent-86de9/agent/sessions/0a7124e9-8a0b-45a8-b7ef-035452978583/contexts/cv',
            lifespanCount: 5,
            parameters: {
                nombreUsuario: 'Huachimingo',
                'nombreUsuario.original': 'Huachimingo'
            }
        },
        {
            name: 'projects/newagent-86de9/agent/sessions/0a7124e9-8a0b-45a8-b7ef-035452978583/contexts/saludo',
            parameters: {
                nombreUsuario: 'Huachimingo',
                'nombreUsuario.original': 'Huachimingo'
            }
        }
    ];

    const expectedResponse = {
        fulfillmentText: 'Hola Huachimingo, puedes consultar acerca de la experiencia de Camilo, sus estudios, trabajos o sobre este robot.',
        fulfillmentMessages: [
            {
                platform: request.body.originalDetectIntentRequest.payload.source.toUpperCase(),
                text: {
                    text: [
                        'Hola Huachimingo, puedes consultar acerca de la experiencia de Camilo, sus estudios, trabajos o sobre este robot.'
                    ]
                }
            },
            {
                platform: request.body.originalDetectIntentRequest.payload.source.toUpperCase(),
                quickReplies: {
                    title: responses.saludo.text[1],
                    quickReplies: [
                        responses.saludo.quickReply[0],
                        responses.saludo.quickReply[1],
                        responses.saludo.quickReply[2],
                        responses.saludo.quickReply[3]
                    ]
                }
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

test('Telegram default intent', t => {

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
        }
    };

    // Act
    myFunctions.curriculumVitaeResponses(request, response);

});

test('Default intent with undefined request source', t => {

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
                    text: []
                }
            },
            {
                platform: 'PLATFORM_UNSPECIFIED',
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
        }
    };

    // Act
    myFunctions.curriculumVitaeResponses(request, response);

});

test('Telegram anoExperiencia intent', t => {

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
                    quickReplies: [
                        responses.anoExperiencia.quickReply[0],
                        responses.anoExperiencia.quickReply[1],
                        responses.anoExperiencia.quickReply[2],
                        responses.anoExperiencia.quickReply[3]
                    ]
                }
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
                    quickReplies: [
                        responses.becual.quickReply[0],
                        responses.becual.quickReply[1],
                        responses.becual.quickReply[2],
                        responses.becual.quickReply[3]
                    ]
                }
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

test('Telegram disponibilidad intent', t => {

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
                    quickReplies: [
                        responses.disponibilidad.quickReply[0],
                        responses.disponibilidad.quickReply[1],
                        responses.disponibilidad.quickReply[2],
                        responses.disponibilidad.quickReply[3]
                    ]
                }
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