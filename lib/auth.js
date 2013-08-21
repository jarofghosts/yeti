var bcrypt = require('bcrypt'),
    RedisSessions = require('redis-sessions'),
    rs = new RedisSessions(),
    cookie = require('cookies');

module.exports = function (db, restify) {

  return {
    processLogin: function (req, res, next) {
      if (!req.authorization || !req.authorization.basic ||
          !req.authorization.basic.username ||
          !req.authorization.basic.password) return next(new restify.NotAuthorizedError('Not authorized'));
      db.view('users', 'getByUsername',
          { key: req.authorization.basic.username }, function (err, body) {
        if (err) return next(err);
        bcrypt.compare(req.authorization.basic.password, body.password, function (err, res) {
          if (err) return next(err);
          if (!res) return next(new restify.NotAuthorizedError('Not authorized'));
          rs.create({
            app: 'yeti',
            ip: '127.0.0.1',
            id: body.username
          });
        }
      });
    };
    verifyAuth: function (req, res, next) {
      if (req.query.pathname === 'login') return next();
    };
  };

}
