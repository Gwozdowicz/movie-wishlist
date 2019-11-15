const databaseConnector = require('../services/database.conector')


exports.getWishlist = async function (req, res) {
    const userId = req.query.userId;
    await (databaseConnector.getUsersWishlist(userId))
      .then(response => {
        res.send(response)
      }
      ).catch(rej => res.sendStatus(401))
  }