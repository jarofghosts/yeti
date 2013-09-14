var bcrypt = require('bcrypt');

module.exports = function (yeti) {

  return {

    postRegister: function (req, res) {
    },

    putLogin: function (req, res) {
      if (!req.params.username || !req.params.password) return yeti.sendJson(403, new yeti.Error('Send credetials')); 
      db.view('users', 'password_by_username',
        { keys: [req.params.username] },
        function (err, body) {
          if (err) return yeti.sendJson(500, new yeti.Error('Database error'));

          if (!body.rows.length) return yeti.sendJson(404, new yeti.Error('No such user')); 
          
          bcrypt.compare(req.params.password,
            body.rows[0].value,
            function (err, matches) {
              if (!matches) return yeti.sendJson(403, new yeti.Error('Authentication failed')); 
              rs.create({ app: 'yeti', id: req.params.username },
                function (err, resp) {
                  if (err) return yeti.sendJson(500, new yeti.Error('Session error')); 
                  yeti.sendJson(new yeti.Response({ token: resp.token }));
                });
            });
        });
    },

    putLogout: function (req, res) {
      rs.kill({ app: 'yeti', token: req.session.token },
        function (err, resp) {
          if (err || !resp || !resp.kill) {
            res.writeHead(500);
            return res.end('Bad');
          };
          return res.end(JSON.stringify({ success: true }));
        });
    }

  };

};

