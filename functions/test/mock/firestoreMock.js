const responsesMock = require('./responses.json');
const repliesMock = require('./quickReplies.json');

const doc = collectionName => (document) => {
    return {
        get: () => {
            return new Promise((resolve) => {
                resolve({
                    data: () => {
                        return 'responses' === collectionName
                            ? responsesMock[document]
                            : repliesMock.replys;
                    }
                });
            });
        }
    };
};

const collection = (collectionName) => {
    return {
        doc: doc(collectionName)
    };
};

module.exports = {
    collection
};