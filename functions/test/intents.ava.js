const test = require('ava');
const standartRequest = require('./standartRequest.json');
const responses = require('../responses.json');
const myFunctions = require('../index');

test('Telegram Saludo', t => {

    // Arrange
    let request = Object.create(standartRequest);
    request.body.result.metadata.intentName = 'saludo';
    request.body.result.contexts = [
        {
            'name': 'cv',
            'parameters': {
                'nombreUsuario': 'Huachimingo',
                'nombreUsuario.original': 'Huachimingo'
            },
            'lifespan': 4
        }
    ];
    request.body.originalRequest = { source: 'telegram' };

    const expectedResponse = {
        speech: 'Hola Huachimingo, puedes consultar acerca de la experiencia de Camilo, sus estudios, trabajos o sobre este robot.',
        displayText: 'Hola Huachimingo, puedes consultar acerca de la experiencia de Camilo, sus estudios, trabajos o sobre este robot.',
        messages: [
            {
                'type': 0,
                'platform': request.body.originalRequest.source,
                'speech': 'Hola Huachimingo, puedes consultar acerca de la experiencia de Camilo, sus estudios, trabajos o sobre este robot.',
            },
            {
                'type': 2,
                'platform': request.body.originalRequest.source,
                'title': 'Adicionalmente puedes ocupar los botones de preguntas rápidas que aparecen al presionar el icono de botones de telegram.',
                'replies': [
                    'Trabajo Actual',
                    'Estudios de Camilo',
                    '¿Donde vive?',
                    '¿Que es un chatbot?'
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
                platform: request.body.originalRequest.source,
                speech: responses.becual.text[0]
            },
            {
                type: 0,
                platform: request.body.originalRequest.source,
                speech: responses.becual.text[1]
            },
            {
                type: 0,
                platform: request.body.originalRequest.source,
                speech: responses.becual.text[2]
            },
            {
                'type': 2,
                'platform': request.body.originalRequest.source,
                'title': responses.becual.text[3],
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