const test = require('ava');
const replyAdapter = require('../src/replyAdapter');

test.skip('telegram replyAdapter with media', t => {

    //Arrange
    const responseText = {
        text: ['texto de prueba.'],
        quickReply: ['0', '1', '2', '3'],
        media: 'media'
    };
    const requestSource = 'telegram';
    const expectedReply = {
        fulfillmentText: responseText.text[0],
        // speech: responseText.text[0],
        fulfillmentMessages: [
            {
                type: 3,
                platform: requestSource.toUpperCase(),
                imageUrl: responseText.media,

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
        quickReply: ['0', '1', '2', '3']
    };
    const requestSource = 'telegram';
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
                    quickReplies: [
                        responseText.quickReply[0],
                        responseText.quickReply[1],
                        responseText.quickReply[2],
                        responseText.quickReply[3]
                    ]
                }
            }
        ]
    };

    // Act
    const telegramQuickReply = replyAdapter(responseText, requestSource);

    // Assert
    t.deepEqual(telegramQuickReply, expectedReply);
});