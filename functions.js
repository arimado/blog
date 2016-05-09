var bcrypt = require('bcryptjs');
var q = require('q');
var db = require('./db');

exports.localReg = function (username, password, callback) {
    var deferred = q.defer(); //wtf does this do?
    var hash = bcrypt.hashSync(password, 8);
    var user = {
        username: username,
        password: hash
    }
    // check if username is already in the database t
    var users = db.get().collection('users');
    users.findOne({username: username},
        function(err, doc) {
        if (doc) {
            console.log('username already exists');
            callback(err, false);
            return;
        } else {
            console.log('username does not exist');
            users.insert({username: username, password: password},
                function (err, res) {
                    if (err) throw new Error;
                    callback(err, res);
                    return; 
                }
            );
        }
    })
}
