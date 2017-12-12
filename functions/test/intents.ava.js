const test = require('ava');
const R = require('ramda');
const standartRequest = require('./standartRequest.json');
const newStandartRequest = require('./newStandartRequest.json');
const responses = require('../responses.json');
const myFunctions = require('../index');

test.only('Telegram Saludo', t => {

    // Arrange
    let request = R.clone(newStandartRequest);
    request.body.queryResult.action = 'saludo';
    request.body.originalDetectIntentRequest.source = 'TELEGRAM';
    request.body.queryResult.outputContexts = [
        {
            "name": "projects/newagent-86de9/agent/sessions/0a7124e9-8a0b-45a8-b7ef-035452978583/contexts/cv",
            "lifespanCount": 5,
            "parameters": {
                "nombreUsuario": "Huachimingo",
                "nombreUsuario.original": "Huachimingo"
            }
        },
        {
            "name": "projects/newagent-86de9/agent/sessions/0a7124e9-8a0b-45a8-b7ef-035452978583/contexts/saludo",
            "parameters": {
                "nombreUsuario": "Huachimingo",
                "nombreUsuario.original": "Huachimingo"
            }
        }
    ];

    const expectedResponse = {
        fulfillmentText: 'Hola Huachimingo, puedes consultar acerca de la experiencia de Camilo, sus estudios, trabajos o sobre este robot.',
        fulfillmentMessages: [
            {
                platform: request.body.originalDetectIntentRequest.source,
                text: {
                    text: [
                        'Hola Huachimingo, puedes consultar acerca de la experiencia de Camilo, sus estudios, trabajos o sobre este robot.',
                        'Adicionalmente puedes ocupar los botones de preguntas rápidas que aparecen al presionar el icono de botones de telegram.'
                    ]
                }
            },
            {
                platform: request.body.originalDetectIntentRequest.source,
                quickReplies: {
                    title: responses.becual.text[3],
                    quickReplies: [
                        'Trabajo Actual',
                        'Estudios de Camilo',
                        '¿Donde vive?',
                        '¿Que es un chatbot?'
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

test.skip('Telegram default intent', t => {

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
                'platform': request.body.originalRequest.source,
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

test.skip('Default intent with undefined request source', t => {

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
    let request = Object.create(newStandartRequest);
    request.body.queryResult.action = 'anoExperiencia';
    request.body.originalRequest = { source: 'telegram' };

    const expectedResponse = {
        speech: responses.anoExperiencia.text[0],
        displayText: responses.anoExperiencia.text[0],
        messages: [
            {
                'type': 2,
                'platform': request.body.originalRequest.source,
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

test.only('Telegram Becual intent', t => {

    // Arrange
    let request = R.clone(newStandartRequest);
    request.body.queryResult.action = 'becual';
    request.body.originalDetectIntentRequest.source = 'TELEGRAM';

    const expectedResponse = {
        fulfillmentText: responses.becual.text[0],
        fulfillmentMessages: [
            {
                platform: request.body.originalDetectIntentRequest.source,
                text: {
                    text: [
                        responses.becual.text[0],
                        responses.becual.text[1],
                        responses.becual.text[2]
                    ]
                }
            },
            {
                platform: request.body.originalDetectIntentRequest.source,
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
    let request = Object.create(standartRequest);
    request.body.result.metadata.intentName = 'disponibilidad';
    request.body.originalRequest = { source: 'telegram' };

    const expectedResponse = {
        speech: responses.disponibilidad.text[0],
        displayText: responses.disponibilidad.text[0],
        messages: [
            {
                type: 0,
                platform: request.body.originalRequest.source,
                speech: responses.disponibilidad.text[0]
            },
            {
                type: 0,
                platform: request.body.originalRequest.source,
                speech: responses.disponibilidad.text[1]
            },
            {
                "type": 3,
                "platform": request.body.originalRequest.source,
                "imageUrl": responses.disponibilidad.media
            },
            {
                'type': 2,
                'platform': request.body.originalRequest.source,
                'title': responses.disponibilidad.text[2],
                'replies': [
                    responses.disponibilidad.quickReply[0],
                    responses.disponibilidad.quickReply[1],
                    responses.disponibilidad.quickReply[2],
                    responses.disponibilidad.quickReply[3]
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