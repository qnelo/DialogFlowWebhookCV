const getResponse = db => action => {

    return db.collection('responses').doc(action).get()
        .then(dbResponse => {
            return dbResponse.data();
        });
};

module.exports = db => {

    return {
        getResponse: getResponse(db)
    };
};