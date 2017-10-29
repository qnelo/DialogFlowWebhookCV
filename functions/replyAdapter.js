const replaceValues = require('./replaceValues');
const messageFormatter = (requestSource, text) => {
    
    const message = {
        'other': {
            type: 0,
            platform: requestSource,
            speech: text
        },
        'default': {
            type: 0,
            speech: text
        }
    };

    return message[('default' === requestSource) ? 'default' : 'other'];
};

const telegramQuickReplyFormatter = (requestSource, responseText, lastText) => {
    return {
        type: 2,
        platform: requestSource,
        title: lastText,
        replies: responseText.quickReply.map(reply => reply)
    };
};

module.exports = (responseText, requestSource, context) => {

    let output = {};
    output.speech = output.displayText
        = replaceValues({ 'text': responseText.text[0], 'object': context });
    
    // TELEGRAM -> Last text must be the title field in quick replys
    let textArray = Object.create(responseText.text);
    const lastText = textArray.pop();

    output.messages = [];
    output.messages = textArray.map(text => messageFormatter(
        requestSource,
        replaceValues({ 'object': context, 'text': text })
    ));
    output.messages.push(telegramQuickReplyFormatter(
        requestSource,
        responseText,
        replaceValues({ 'object': context, 'text': lastText })
    ));
    
    return output;
};