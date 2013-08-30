var nano = require('nano')('http://localhost:5984'),
    db = nano.db.use('yeti'),
    http = require('http'),
    cookies = require('cookies'),
    Session = require('redis-sessions'),
    rs = new Session(),
    router = require('route-emitter').createRouter(),
    parseParams = require('http-params').parse,
    routes = {
      users: require('./routes/user.js'),
      posts: require('./routes/post.js')
    };

router.listen('get', '/user', routes.users.getUser);
router.listen('post', '/user', routes.users.postUser);
router.listen('put', '/user', routes.users.putUser);
router.listen('delete', '/user', routes.users.deleteUser);

router.listen('get', '/post', routes.posts.getPost);
router.listen('post', '/post', routes.posts.postPost);
router.listen('put', '/post', routes.posts.putPost);
router.listen('delete', '/post', routes.posts.deletePost);

http.createServer(function (req, res) {
  parseParams(req, function (err, params) {
    if (err) {
      res.writeHead(503);
      res.end('Error!');
    }
    router.route(req, res);
  });
}).listen(8000);

