var bcrypt = require('bcryptjs');
var q = require('q');
var db = require('./db');

exports.localReg = function (username, password, callback) {
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
            console.log('this username is allowed');
            users.insert(user,
                function (err, res) {
                    if (err) throw new Error;
                    callback(err, res);
                    return;
                }
            );
        };
    });
};

exports.localAuth = function (username, password, callback) {
    var users = db.get().collection('users');
    users.findOne({username: username}, function (err, result) {
        if (result) {
            console.log('username match');
            console.log(result);
            var hash = result.password;
            console.log(hash);
            var isMatch = bcrypt.compareSync(password, hash);
            console.log(isMatch);
            if (isMatch) {
                callback(err, result);
            } else {
                callback(err, false);
            }
        } else {
            callback(err, err);
        }
    });
}


//check if user exists
    //if user exists check if passwords match (use bcrypt.compareSync(password, hash); // true where 'hash' is password in DB)
      //if password matches take into website
  //if user doesn't exist or password doesn't match tell them it failed

// exports.localAuth = function (username, password) {
//   var deferred = Q.defer();
//
//   db.get('local-users', username)
//   .then(function (result){
//     console.log("FOUND USER");
//     var hash = result.body.password;
//     console.log(hash);
//     console.log(bcrypt.compareSync(password, hash));
//     if (bcrypt.compareSync(password, hash)) {
//       deferred.resolve(result.body);
//     } else {
//       console.log("PASSWORDS NOT MATCH");
//       deferred.resolve(false);
//     }
//   }).fail(function (err){
//     if (err.body.message == 'The requested items could not be found.'){
//           console.log("COULD NOT FIND USER IN DB FOR SIGNIN");
//           deferred.resolve(false);
//     } else {
//       deferred.reject(new Error(err));
//     }
//   });
//
//   return deferred.promise;
// }
