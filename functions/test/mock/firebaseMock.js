const responses = require('./responses.json');

const doc = (document) => {
    return {
        get: () => {
            return new Promise((resolve) => {
                resolve({
                    data: () => {
                        return responses[document];
                    }
                });
            });
        }
    };
};

const collection = () => {
    return {
        doc
    };
};

module.exports = {
    collection
};