var bcrypt = require('bcrypt')

module.exports = function (yeti) {

  return {

    postRegister: function (req, res) {
    },

    putLogin: function (req, res) {
    },

    putLogout: function (req, res) {
      rs.kill({ app: 'yeti', token: req.session.token }, onKilled)
      function onKilled(err, resp) {
        if (err || !resp || !resp.kill) {
          return yeti.sendJson(res, 500, new yeti.Error('Session error'))
        }
        yeti.sendJson(res, { loggedOut: true })
      })
    }
  }
}

