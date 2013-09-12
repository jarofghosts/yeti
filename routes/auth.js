var bcrypt = require('bcrypt');

module.exports = function (db, rs) {

  return {

    postRegister: function (req, res) {
    },

    putLogin: function (req, res) {
      if (!req.params.username || !req.params.password) {
        res.writeHead(403);
        return res.end('errrrrorrrr');
      }
      db.view('users', 'password_by_username',
        { keys: [req.params.username] },
        function (err, body) {
          if (err) {
            res.writeHead(500);
            return res.end(err);
          }

          if (!body.rows.length) {
            res.writeHead(404);
            return res.end('nuh uh');
          }
          
          bcrypt.compare(req.params.password,
            body.rows[0].value,
            function (err, matches) {
              if (!matches) {
                res.writeHead(403);
                return res.end('nope');
              }
              rs.create({ app: 'yeti', id: req.params.username },
                function (err, resp) {
                  if (err) {
                    res.writeHead(500);
                    res.end('nope');
                  }
                  res.end(JSON.stringify({ success: true, token: resp.token });
                }
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

