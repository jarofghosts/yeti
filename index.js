var nano = require('nano')('http://localhost:5984'),
    restify = require('restify'),
    db = nano.db.use('yeti'),
    users = require('./lib/user.js')(db);


