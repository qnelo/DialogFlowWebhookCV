const test = require('ava');
const replyAdapter = require('../replyAdapter');

test('telegram replyAdapter', t => {

    //Arrange
    const responseText = {
        text: 'texto de prueba.',
        quickReply: ['0', '1', '2', '3']
    };
    const requestSource = 'telegram';
    const expectedReply = {
        'displayText': responseText.text,
        'speech': responseText.text,
        'data': {
            'telegram': {
                'text': responseText.text,
                'reply_markup': {
                    'keyboard': [['0'], ['1'], ['2'], ['3']],
                    'one_time_keyboard': true,
                    'resize_keyboard': true
                }
            }
        }
    };

    // Act
    const telegramQuickReply = replyAdapter(responseText, requestSource);

    // Assert
    t.deepEqual(telegramQuickReply, expectedReply);
});