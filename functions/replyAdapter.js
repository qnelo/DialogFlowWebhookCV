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

module.exports = (responseText, requestSource) => {

    let output = {};
    output.speech = responseText.text[0];
    output.displayText = responseText.text[0];
    
    // TELEGRAM -> Last text must be the title field in quick replys
    let textArray = Object.create(responseText.text);
    const lastText = textArray.pop();

    output.messages = [];
    output.messages = textArray.map(text => messageFormatter(requestSource, text));
    output.messages.push(telegramQuickReplyFormatter(requestSource, responseText, lastText));
    
    return output;
};