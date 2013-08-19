var bcrypt = require('bcrypt'),
    rsess = require('redis-session'),
    cookie = require('cookies');

module.exports = function (db, restify) {

  return {
    processLogin: function (req, res, next) {
      db.view('users', 'getByUsername',
          { key: req.authorization.basic.username }, function (err, body) {
        if (err) return next(err);
        bcrypt.compare(req.authorization.basic.password, body.password, function (err, res) {
          if (err) return next(err);
          if (!res) return next(new restify.NotAuthorizedError('Not authorized'));
        }
      });
    };
    verifyAuth: function (req, res, next) {
      if (req.query.pathname === 'login') return next();

    };
  };

}
