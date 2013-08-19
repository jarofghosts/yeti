var nano = require('nano')('http://localhost:5984'),
    restify = require('restify'),
    server = restify.createServer(),
    db = nano.db.use('yeti'),
    users = require('./lib/user.js')(db),
    auth = require('./lib/auth.js')(db, restify);

server.use(restify.bodyParser());
server.use(restify.queryParser());
server.use(restify.gzipResponse());
server.use(restify.authorizationParser());

server.get('/user', users.getUser);
server.post('/user', users.insertUser);
server.put('/login', auth.processLogin);

