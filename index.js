var nano = require('nano')('http://localhost:5984'),
    db = nano.db.use('yeti'),
    router = require('route-emitter').createRouter(),
    parseParams = require('http-params').parse;

