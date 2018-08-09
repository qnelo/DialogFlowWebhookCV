const test = require('ava');
const replyAdapter = require('../src/replyAdapter');

test.skip('telegram replyAdapter with media', t => {

    //Arrange
    const responseText = {
        text: ['texto de prueba.'],
        quickReply: ['0', '1', '2', '3'],
        media: 'media'
    };
    const requestSource = 'TELEGRAM';
    const expectedReply = {
        fulfillmentText: responseText.text[0],
        fulfillmentMessages: [
            {
                type: 3,
                platform: requestSource.toUpperCase(),
                imageUrl: responseText.media
            },
            {
                type: 2,
                platform: requestSource.toUpperCase(),
                title: responseText.text[0],
                replies: [
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

test('telegram source replyAdapter', t => {

    //Arrange
    const responseText = {
        text: ['texto de prueba.', 'segundo texto de prueba'],
        quickReply: true
    };
    const replies = { replies: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'] };
    const requestSource = 'TELEGRAM';
    const expectedReply = {
        fulfillmentText: responseText.text[0],
        fulfillmentMessages: [
            {
                platform: requestSource,
                text: {
                    text: [
                        responseText.text[0]
                    ]
                }
            },
            {
                platform: requestSource,
                quickReplies: {
                    title: responseText.text[1],
                    quickReplies: []
                }
            }
        ]
    };

    // Act
    const telegramQuickReply = replyAdapter(responseText, replies, requestSource, undefined);

    // Assert
    t.deepEqual(telegramQuickReply.fulfillmentMessages[0], expectedReply.fulfillmentMessages[0]);
});

test('skype source replyAdapter', t => {

    //Arrange
    const responseText = {
        text: ['texto de prueba.', 'segundo texto de prueba'],
        quickReply: true
    };
    const replies = { replies: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'] };
    const requestSource = 'SKYPE';
    const expectedReply = {
        fulfillmentText: responseText.text[0],
        fulfillmentMessages: [
            {
                platform: requestSource,
                text: {
                    text: [
                        responseText.text[0],
                        responseText.text[1]
                    ]
                }
            },
            {
                platform: requestSource,
                quickReplies: {
                    title: 'Respuestas rápidas',
                    quickReplies: []
                }
            }
        ]
    };

    // Act
    const skypeQuickReply = replyAdapter(responseText, replies, requestSource, undefined);

    // Assert
    t.deepEqual(skypeQuickReply.fulfillmentMessages[0], expectedReply.fulfillmentMessages[0]);
});

test('telegram source replyAdapter with quickReply = false', t => {

    //Arrange
    const responseText = {
        text: ['texto de prueba.', 'segundo texto de prueba'],
        quickReply: false
    };
    const replies = { replies: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'] };
    const requestSource = 'TELEGRAM';
    const expectedReply = {
        fulfillmentText: responseText.text[0],
        fulfillmentMessages: [
            {
                platform: requestSource,
                text: {
                    text: [
                        responseText.text[0]
                    ]
                }
            },
            {
                platform: requestSource,
                quickReplies: {
                    title: responseText.text[1],
                    quickReplies: []
                }
            }
        ]
    };

    // Act
    const telegramQuickReply = replyAdapter(responseText, replies, requestSource, undefined);

    // Assert
    t.deepEqual(telegramQuickReply, expectedReply);
});