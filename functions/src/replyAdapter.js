const replaceValues = require('./replaceValues');

/**
 * Create the object of quickReply
 * @param {array} replies quick replies array
 * @param {string} lastText Last text from responses as a title of quickReply
 * @return {object} QuickReply Object
 */
const quickRepliesFormatter = (replies, lastText) => {
    return {
        title: lastText,
        quickReplies: replies.map(reply => reply)
    };
};

const getRandomReplies = (replies) => {

    let output = [];
    let newReplies = replies.slice(0, replies.length);
    for (let index = 0; 3 > index; index++) {

        const number = Math.floor((Math.random() * newReplies.length));
        output.push(newReplies[number]);
        newReplies = newReplies.filter(i => newReplies.indexOf(i) !== newReplies.indexOf(newReplies[number]));

    }
    return output;
};

/**
 * Adapts the answer to Dialogflow
 * @param {object} selectedResponse response object to be adapted
 * @param {array} replies quick replies array
 * @param {string} requestSource Source of the request
 * @param {object} context Context dialog
 * @returns {object} Adapted response
 */
module.exports = (selectedResponse, replies, requestSource, context) => {

    let output = {};
    output.fulfillmentText
        = replaceValues(context, selectedResponse.text[0]);

    const randomReplies = getRandomReplies(replies, 3);

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
            randomReplies,
            replaceValues(context, lastText)
        )
    });
    return output;
};