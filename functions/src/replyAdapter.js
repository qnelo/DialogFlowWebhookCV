const replaceValues = require('./replaceValues');

/**
 * Create the object of quickReply
 * @param {array} responseText responses
 * @param {string} lastText Last text from responses as a title of quickReply
 * @return {object} QuickReply Object
 */
const quickRepliesFormatter = (responseText, lastText) => {
    return {
        title: lastText,
        quickReplies: responseText.quickReply.map(reply => reply)
    };
};

/**
 * Adapts the answer to Dialogflow
 * @param {object} selectedResponse response object to be adapted
 * @param {string} requestSource Source of the request
 * @param {object} context Context dialog
 * @returns {object} Adapted response
 */
module.exports = (selectedResponse, requestSource, context) => {

    let output = {};
    output.fulfillmentText
        = replaceValues(context, selectedResponse.text[0]);

    // TELEGRAM -> Last text must be the title field in quick replys
    let textArray = Object.create(selectedResponse.text);
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
            selectedResponse,
            replaceValues(context, lastText)
        )});
    return output;
};