module.exports = function (db) {

  return {

    insertUser: function (req, res) {
      
    };

    getUser: function (req, res) {
      if (!req.query || !req.query.id) return res.end({ error: 'no_id' });
    };

    deleteUser: function (req, res) {
    };

    updateUser: function (req, res) {
    };

  };

};

