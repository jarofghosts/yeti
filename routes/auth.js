module.exports = function (db, rs) {

  return {

    postRegister: function (req, res) {
    },

    putLogin: function (req, res) {
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

