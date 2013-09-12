var nano = require('nano')('http://localhost:5984'),
    db = nano.db.use('yeti'),
    http = require('http'),
    Cookies = require('cookies').Cookies,
    Session = require('redis-sessions'),
    routes = {
      users: require('./routes/user.js')(db),
      posts: require('./routes/post.js')(db),
      replies: require('./routes/reply.js')(db),
      messages: require('./routes/message.js')(db),
      categories: require('./routes/category.js')(db),
      auth: require('./routes/auth.js')(db, rs)
    },
    rs = new Session(),
    router = require('route-emitter').createRouter(),
    parseParams = require('http-params').parse,
    package = require('./package.json'),
    yeti = { name: 'yeti', version: package.version };

http.ServerResponse.prototype.send = require('http-json-response');

router = require('./routes/setup.js')(router, routes);

router.listen('get', '/', function (req, res) {
  res.send(yeti);
});

http.createServer(function (req, res) {
  parseParams(req, function (err, params) {
    if (err) return res.send(500, { success: false, message: 'Error processing request' });
    var cookies = new Cookies(req, res),
        token = cookies.get('token');
    req.params = params;
    req.session = null;
    if (!token) return router.route(req, res);
    rs.get({ app: 'yeti', token: token }, function (err, session) {
      if (err) return res.send(403, { success: false, message: 'Invalid token' });

      session.token = token;
      req.session = session;
      router.route(req, res);
    });
  });
}).listen(8000);

