/**
 * Get the answers from firestore
 * @param {object} db firestore instance
 * @returns {function} function that delivers the response according to the action
 */
const getResponse = db => action => {

    return db.collection('responses').doc(action).get()
        .then(dbResponse => {
            return dbResponse.data();
        });
};

/**
 * Get the quick replies from firestore
 * @param {object} db firestore instance
 * @returns {function} function that delivers the quick replies
 */
const getQuickReplies = db => replies => {

    return db.collection('quickReplies').doc(replies).get()
        .then(dbResponse => {
            return dbResponse.data();
        });
};

/**
 * Exposes all methods
 * @param {object} db firestore instance
 * @returns {object} methods
 */
module.exports = db => {
    return {
        getResponse: getResponse(db),
        getQuickReplies: getQuickReplies(db)
    };
};