var nano = require('nano')('http://localhost:5984'),
    router = require('route-emitter').createRouter(),
    db = nano.db.use('yeti'),
    users = require('./lib/user.js')(db);
