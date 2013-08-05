var nano = require('nano')('http://localhost:5984'),
    http = require('http'),
    db = nano.db.use('yeti'),
    users = require('./lib/user.js')(db);

http.createServer(function (req, res) {

}).listen(4371);

