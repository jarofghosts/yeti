var nano = require('nano')('http://localhost:5984'),
    db = nano.db.use('yeti'),
    http = require('http'),
    Cookies = require('cookies').Cookies,
    Session = require('redis-sessions'),
    rs = new Session(),
    router = require('route-emitter').createRouter(),
    parseParams = require('http-params').parse,
    routes = {
      users: require('./routes/user.js'),
      posts: require('./routes/post.js'),
      replies: require('./routes/reply.js'),
      messages: require('./routes/message.js'),
      categories: require('./routes/category.js')
    };

router.listen('get', '/user', routes.users.getUser);
router.listen('post', '/user', routes.users.postUser);
router.listen('put', '/user', routes.users.putUser);
router.listen('delete', '/user', routes.users.deleteUser);

router.listen('get', '/post', routes.posts.getPost);
router.listen('post', '/post', routes.posts.postPost);
router.listen('put', '/post', routes.posts.putPost);
router.listen('delete', '/post', routes.posts.deletePost);

router.listen('get', '/reply', routes.replies.getReply);
router.listen('post', '/reply', routes.replies.postReply);
router.listen('put', '/reply', routes.replies.putReply);
router.listen('delete', '/reply', routes.replies.deleteReply);

router.listen('get', '/message', routes.messages.getMessage);
router.listen('post', '/message', routes.messages.postMessage);
router.listen('put', '/message', routes.messages.putMessage);
router.listen('delete', '/message', routes.messages.deleteMessage);

router.listen('get', '/category', routes.categories.getCategory);
router.listen('post', '/category', routes.categories.postCategory);
router.listen('put', '/category', routes.categories.putCategory);
router.listen('delete', '/category', routes.categories.deleteCategory);

http.createServer(function (req, res) {
  parseParams(req, function (err, params) {
    if (err) {
      res.writeHead(500);
      return res.end('Error!');
    }
    var cookies = new Cookies(req, res),
        token = cookies.get('token');
    req.params = params;
    req.session = null;
    if (!token) return router.route(req, res);
    rs.get({ app: 'yeti', token: token }, function (err, session) {
      if (err) {
        res.writeHead(403);
        return res.end('Can\'t do that!');
      }
      req.session = session;
      router.route(req, res);
    });
  });
}).listen(8000);

