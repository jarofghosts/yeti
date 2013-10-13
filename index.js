var nano = require('nano')('http://localhost:5984'),
    db = nano.db.use('yeti'),
    http = require('http'),
    Cookies = require('cookies').Cookies,
    Session = require('redis-sessions'),
    rs = new Session(),
    router = require('route-emitter').createRouter(),
    parseParams = require('http-params').parse,
    package = require('./package.json'),
    yeti = {
      app: { name: 'yeti',
             version: package.version },
      db: db,
      rs: rs,
      sendJson: require('http-json-response'),
      Error: function (obj) {
        if (typeof obj == 'string') obj = { message: obj }
        obj = xtend({ success: false }, obj)
        return obj
      },
      Response: function (obj) {
        if (typeof obj == 'string') obj = { message: obj }
        obj = xtend({ success: true }, obj)
        return obj
      }
    },
    routes = {
      users: require('./routes/user.js')(yeti),
      posts: require('./routes/post.js')(yeti),
      replies: require('./routes/reply.js')(yeti),
      messages: require('./routes/message.js')(yeti),
      categories: require('./routes/category.js')(yeti),
      auth: require('./routes/auth.js')(yeti)
    }

router = require('./routes/setup.js')(router, routes)

router.listen('get', '/', function (req, res) {
  res.send(yeti.app)
})

http.createServer(function (req, res) {
  parseParams(req, onParsed.bind(this))
  function onParsed(err, params) {
    if (err) return yeti.sendJson(res, 500, new yeti.Error('Error processing request'))
    var cookies = new Cookies(req, res),
        token = cookies.get('token')
    req.params = params
    req.session = null
    if (!token) return router.route(req, res)
    rs.get({ app: 'yeti', token: token }, withSession.bind(this))
    function withSession(err, session) {
      if (err) return yeti.sendJson(res, 403, new yeti.Error('Invalid token'))

      session.token = token
      req.session = session
      router.route(req, res)
    }
  }
}).listen(8000)

