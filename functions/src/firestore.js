const getResponse = db => action => {

    return db.collection('responses').doc(action).get()
        .then(dbResponse => {
            return dbResponse.data();
        });
};

module.exports = functions => {

    const admin = require('firebase-admin');
    admin.initializeApp(functions.config().firebase);
    const db = admin.firestore();

    return {
        getResponse: getResponse(db)
    };
};