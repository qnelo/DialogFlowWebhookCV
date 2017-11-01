/**
 * Adapta el objeto de contexto a una estructura de objeto con estructura llave valor plano
 * @param {*} dialogflowContexts Objeto del que se usarán los valores para reemplazar en el texto
 * @param {*} parameters parameters to replace
 * @returns {Object} object with parameters to replace
 */
const objectAdapter = (dialogflowContexts, parameters) => {
    
    let parametersObject = {};
    
    for (let context of dialogflowContexts) {
        
        for (let parameter of parameters){
            
            let newParameter = parameter.replace('$', '').split('.');
            
            if (context.parameters[newParameter[1]] && context.name === newParameter[0]) {
                parametersObject[`$${context.name}.${newParameter[1]}`]
                = context.parameters[newParameter[1]];
            }
        }
    }
    return parametersObject;
};

/**
 * Reemplaza los valores en un string entregado por los valores de atributos del objeto entregado
 * @param {Object} dialogflowContexts Objeto del que se usarán los valores para reemplazar en el texto
 * @param {String} replyText Texto en el cual se quieren reempazar los parametros que inician con '$'
 * por params de object
 * @returns {String} retorna el texto con los valores reemplazados  por los valores de los objetos
 */
const replaceValues = (dialogflowContexts, replyText) => {
    
    const parameters = replyText.match(/[$]+(\w{2,}.\w{2,})/g);

    // If no parameters to replace, return text
    if (!parameters || 0 === parameters.lenght) {
        return replyText;
    }
    
    let parametersObject = objectAdapter(dialogflowContexts, parameters);
    
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