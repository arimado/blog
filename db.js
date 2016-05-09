var MongoClient = require('mongodb').MongoClient

var state = {
    db: null
}

exports.connect = function(url, done) {
    if(state.db) return done();
    MongoClient.connect(url, function(err, db) {
        state.db = db;
        done();
    });
}

exports.get = function() {
    return state.db
}

exports.close = function( done ) {
    if (state.db) {
        state.db.close(function (err, result) {
            state.db = null;
            state.mode = null;
            done(err);
        });
    }
} 

// USAGE --------------------------------

// .connect('URL', error callback)
    // connects to database
    // stores database in a state variable

// .get()
    // just gets the database
    // the same database the was called when it was called before? i think

// .close(err-callback)
    // calls close() on the state.db
    // assign state.db to null
    // assign state.mode to null
    // calls error callback
