const test = require('ava');
const replyAdapter = require('../replyAdapter');

test('telegram replyAdapter', t => {

    //Arrange
    const responseText = {
        text: ['texto de prueba.'],
        quickReply: ['0', '1', '2', '3']
    };
    const requestSource = 'telegram';
    const expectedReply = {
        'displayText': responseText.text[0],
        'speech': responseText.text[0],
        'messages': [
            {
                'type': 2,
                'platform': requestSource,
                'title': responseText.text[0],
                'replies': [
                    responseText.quickReply[0],
                    responseText.quickReply[1],
                    responseText.quickReply[2],
                    responseText.quickReply[3]
                ]
            }
        ]
    };

    // Act
    const telegramQuickReply = replyAdapter(responseText, requestSource);

    // Assert
    t.deepEqual(telegramQuickReply, expectedReply);
});

test('default source replyAdapter', t => {
    
    //Arrange
    const responseText = {
        text: ['texto de prueba.', 'segundo texto de prueba'],
        quickReply: ['0', '1', '2', '3']
    };
    const requestSource = 'default';
    const expectedReply = {
        'displayText': responseText.text[0],
        'speech': responseText.text[0],
        'messages': [
            {
                'type': 0,
                'speech': responseText.text[0]
            },
            {
                'type': 2,
                'platform': requestSource,
                'title': responseText.text[1],
                'replies': [
                    responseText.quickReply[0],
                    responseText.quickReply[1],
                    responseText.quickReply[2],
                    responseText.quickReply[3]
                ]
            }
        ]
    };
    
    // Act
    const telegramQuickReply = replyAdapter(responseText, requestSource);
    
    // Assert
    t.deepEqual(telegramQuickReply, expectedReply);
});