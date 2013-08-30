var nano = require('nano')('http://localhost:5984'),
    db = nano.db.use('yeti'),
    cookies = require('cookies'),
    Session = require('redis-sessions'),
    rs = new Session(),
    router = require('route-emitter').createRouter(),
    parseParams = require('http-params').parse,
    routes = {
      users: require('./routes/user.js'),
      posts: require('./routes/post.js')
    };

router.listen('get', '/user', users.getUser);
router.listen('post', '/user', users.postUser);
router.listen('put', '/user', users.putUser);
router.listen('delete', '/user', users.deleteUser);

