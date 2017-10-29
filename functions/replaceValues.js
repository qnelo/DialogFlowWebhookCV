/**
 * Reemplaza los valores en un string entregado por los valores de atributos del objeto entregado
 * @param {Object} input - (input.object) Objeto del que se usarán los valores para reemplazar en el texto
 * (input.text) Texto  en el cual se quieren reempazar los parametros que inician con '$'
 * por params de object
 * @returns {String} retorna el texto con los valores reemplazados  por los valores de los objetos
 */
const replaceValues = (input) => {
    
    const parts = input.text.match(/[$]+(\w{2,}.\w{2,})/g);

    if (!parts || 0 === parts.lenght) {
        return input.text;
    }
    
    let newText = input.text;
    let keyValues = {};
    let newObject = {};

    for(let context of input.object){

        for (let parameter of parts){
            
            let newParameter = parameter.replace('$', '').split('.');
            
            if (context.parameters[newParameter[1]] && context.name === newParameter[0]) {
                newObject[`$${context.name}.${newParameter[1]}`]
                    = context.parameters[newParameter[1]];
            }
        }
    }

    for (let p of parts) {
        keyValues[p] = newObject[p];
    }

    for (let key of Object.keys(keyValues)) {
        let value = keyValues[key];
        newText = newText.replace(key, value);
    }
    
    return newText;
};

module.exports = replaceValues;