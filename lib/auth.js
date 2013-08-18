var bcrypt = require('bcrypt'),
    rsess = require('redis-session'),
    cookie = require('cookies');

module.exports = function (db) {

  return {
    processLogin: function (req, res, next) {
      db.view('users', 'getByUsername',
          { key: req.authorization.basic.username }, function (err, body) {
        if (err) return next(err);
      });
    };
  };

}
