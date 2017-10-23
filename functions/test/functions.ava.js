const standartRequest = require('./standartRequest.json');
const test = require('ava');
const myFunctions = require('../index');
const responsesText = require('../responsesText');

test('anoExperiencia intent', t => {
    
    // Arrange
    let request = standartRequest;
    request.body.result.metadata.intentName = 'anoExperiencia';
    
    const expectedResponse = {
        speech: responsesText('anoExperiencia').text,
        displayText: responsesText('anoExperiencia').text,
        data: {
            'telegram': {
                'text': `Camilo tiene 12 años de experiencia trabajando en distintas empresas 
                del sector tecnológico, de los cuales, los últimos 8 años tienen relación con 
                el desarrollo de software.`,
                'reply_markup': {
                    'keyboard': [
                        [
                            responsesText('anoExperiencia').quickReply[0]
                        ],
                        [
                            responsesText('anoExperiencia').quickReply[0]
                        ],
                        [
                            responsesText('anoExperiencia').quickReply[0]
                        ],
                        [
                            responsesText('anoExperiencia').quickReply[0]
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

            console.info(JSON.stringify(objectResponse, null, 4));

            // Assert
            t.deepEqual(objectResponse.data, expectedResponse.data);
            t.deepEqual(objectResponse, expectedResponse);
        }
    };
    
    // Act
    myFunctions.curriculumVitaeResponses(standartRequest, response);
    
});