const test = require('ava');

const standartRequest = require('./standartRequest.json');
const responses = require('../responses.json');

const myFunctions = require('../index');

test('default intent', t => {
    
    // Arrange
    let request = Object.create(standartRequest);
    request.body.result.metadata.intentName = '';
    request.body.originalRequest = { source: 'telegram' };
    
    const expectedResponse = {
        speech: responses.default.text,
        displayText: responses.default.text,
        data: {
            'telegram': {
                'text': 'default',
                'reply_markup': {
                    'keyboard': [],
                    'one_time_keyboard': true,
                    'resize_keyboard': true
                }
            }
        }
        
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

test('default intent with undefined request source', t => {
    
    // Arrange
    let request = Object.create(standartRequest);
    request.body.result.metadata.intentName = '';
    request.body.originalRequest = null;
    
    const expectedResponse = {
        speech: responses.default.text,
        displayText: responses.default.text,
        data: {
            'default': {
                'text': 'default',
                'reply_markup': {
                    'keyboard': [],
                    'one_time_keyboard': true,
                    'resize_keyboard': true
                }
            }
        }
        
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
        speech: responses.anoExperiencia.text,
        displayText: responses.anoExperiencia.text,
        data: {
            'telegram': {
                'text': 'Camilo tiene 12 años de experiencia trabajando en distintas empresas del sector tecnológico, de los cuales, los últimos 8 años tienen relación con el desarrollo de software.',
                'reply_markup': {
                    'keyboard': [
                        [
                            responses.anoExperiencia.quickReply[0]
                        ],
                        [
                            responses.anoExperiencia.quickReply[1]
                        ],
                        [
                            responses.anoExperiencia.quickReply[2]
                        ],
                        [
                            responses.anoExperiencia.quickReply[3]
                        ]
                    ],
                    'one_time_keyboard': true,
                    'resize_keyboard': true
                }
            }
        }
        
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
        speech: responses.becual.text,
        displayText: responses.becual.text,
        data: {
            'telegram': {
                'text': [
                    'Becual es una empresa que busca conectar eficientemente, apalancados en la tecnología, a las empresas pyme con financiamientos y créditos, de manera que pudieran acceder en menores tiempos y en mejores condiciones',
                    'En otras palabras Becual es una plataforma de crowdfunding, que se orienta al área de préstamos',
                    'Las personas que tienen dinero se conectan de manera directa, con pequeñas y medianas empresas que necesitan financiamiento. El resultado es que las personas ganan más por sus inversiones y las empresas finalmente pagan menos por sus créditos.'
                ],
                'reply_markup': {
                    'keyboard': [
                        [
                            responses.becual.quickReply[0]
                        ],
                        [
                            responses.becual.quickReply[1]
                        ],
                        [
                            responses.becual.quickReply[2]
                        ],
                        [
                            responses.becual.quickReply[3]
                        ]
                    ],
                    'one_time_keyboard': true,
                    'resize_keyboard': true
                }
            }
        }
        
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