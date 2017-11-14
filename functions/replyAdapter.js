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

const telegramMediaFormatter = (requestSource, media) => {
    return {
        type: 3,
        platform: requestSource,
        imageUrl: media
    };
}

module.exports = (responseText, requestSource, context) => {

    let output = {};
    output.speech = output.displayText
        = replaceValues(context, responseText.text[0]);

    // TELEGRAM -> Last text must be the title field in quick replys
    let textArray = Object.create(responseText.text);
    const lastText = textArray.pop();

    output.messages = [];
    output.messages = textArray.map(text => messageFormatter(
        requestSource,
        replaceValues(context, text)
    ));
    if (responseText.media) {
        output.messages.push(
            telegramMediaFormatter(
                requestSource,
                responseText.media
            )
        );
    };
    output.messages.push(
        telegramQuickReplyFormatter(
            requestSource,
            responseText,
            replaceValues(context, lastText)
        )
    );
    // console.info(`response:${JSON.stringify(output, null, 4)}`);
    return output;
};