var nano = require('nano')('http://localhost:5984'),
    db = nano.db.use('yeti'),
    cookies = require('cookies'),
    router = require('route-emitter').createRouter(),
    parseParams = require('http-params').parse;

router.listen('get', '/user', 
