module.exports = function (db, rs) {

  return {

    postRegister: function (req, res) {
    },

    putLogin: function (req, res) {
      if (!req.params.username || !req.params.password) {
        res.writeHead(403);
        return res.end('errrrrorrrr');
      }
      db.view('users', 'by_username',
        { keys: [req.params.username] },
        function (err, body) {
          if (err) {
            res.writeHead(500);
            return res.end(err);
          }

        });
    },

    putLogout: function (req, res) {
      rs.kill({ app: 'yeti', token: req.session.token }, function (err, resp) {
        if (err || !resp || !resp.kill) {
          res.writeHead(500);
          return res.end('Bad');
        };
        return res.end(JSON.stringify({ success: true }));
      });
    }

  };

};

