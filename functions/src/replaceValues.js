/**
 * Adapt the context to a value key object structure
 * @param {object} dialogflowContexts Object with the contexts that will be replaced in the response
 * @param {string} parameters parameters to replace
 * @returns {object} object with parameters to replace
 */
const objectAdapter = (dialogflowContexts, parameters) => {

    let parametersObject = {};

    for (const context of dialogflowContexts) {

        for (const parameter of parameters) {

            const newParameter = parameter.replace('$', '').split('.');

            if (context.parameters[newParameter[1]]
                && context.name.split('/').pop() === newParameter[0]) {

                parametersObject[`$${context.name.split('/').pop()}.${newParameter[1]}`]
                    = context.parameters[newParameter[1]];
            }
        }
    }
    return parametersObject;
};

/**
 * Replaces the values in a string delivered by the attribute values of the delivered object
 * @param {object} dialogflowContexts Object with the contexts that will be replaced in the response
 * @param {string} replyText Text in which the parameters that start with '$' will be replaced
 * @returns {string} Response with the values replaced
 */
const replaceValues = (dialogflowContexts, replyText) => {

    const parameters = replyText.match(/[$]+(\w{2,}.\w{2,})/g);

    // If no parameters to replace, return text
    if (!parameters || 0 === parameters.lenght) {
        return replyText;
    }

    const parametersObject = objectAdapter(dialogflowContexts, parameters);

    let keyValues = {};
    for (let p of parameters) {
        keyValues[p] = parametersObject[p];
    }

    let completeText = replyText;
    for (let key of Object.keys(keyValues)) {
        let value = keyValues[key];
        completeText = completeText.replace(key, value);
    }

    return completeText;
};

module.exports = replaceValues;