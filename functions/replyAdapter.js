const replaceValues = require('./replaceValues');

const quickRepliesFormatter = (requestSource, responseText, lastText) => {
    return {
        title: lastText,
        quickReplies: responseText.quickReply.map(reply => reply)
    };
};

module.exports = (responseText, requestSource, context) => {

    let output = {};
    output.fulfillmentText
        = replaceValues(context, responseText.text[0]);

    // TELEGRAM -> Last text must be the title field in quick replys
    let textArray = Object.create(responseText.text);
    const lastText = textArray.pop();

    output.fulfillmentMessages = [];
    output.fulfillmentMessages.push({
        platform: requestSource,
        text: {
            text: textArray.map(text => replaceValues(context, text))
        }
    });

    output.fulfillmentMessages.push({
        platform: requestSource,
        quickReplies: quickRepliesFormatter(
            requestSource,
            responseText,
            replaceValues(context, lastText)
        )});
    // console.info(`response:${JSON.stringify(output, null, 4)}`);
    return output;
};