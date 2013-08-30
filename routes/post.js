
module.exports = function (db) {

  return {

    insertPost: function (req, res) {
      
    };

    getPost: function (req, res) {
      if (!req.query || !req.query.id) return res.send({ error: 'no_id' });
    };

    deletePost: function (req, res) {
    };

    updatePost: function (req, res) {
    };

  };

};

