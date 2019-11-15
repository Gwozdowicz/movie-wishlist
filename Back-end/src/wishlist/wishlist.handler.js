const databaseConnector = require('../services/database.conector')


exports.getWishlist = async function (req, res) {
  const userId = req.query.userId;
  await (databaseConnector.getUsersWishlist(userId))
    .then(response => {
      res.send(response)
    }
    ).catch(rej => res.sendStatus(404))
}

exports.checkIfItemIsInWishlist = async function (req, res) {
  const userId = req.query.userId;
  const movieId = req.query.movieId;
  await (databaseConnector.checkIfMovieInWishlist(userId, movieId))
    .then(response => {
      res.send(response)
    }
    ).catch(rej => res.sendStatus(404))
}

exports.addItemToWishlist = async function (req, res) {
  const userId = req.query.userId;
  const movieId = req.body.movieId;
  await (databaseConnector.addItemToWishlist(userId, movieId))
    .then(response => {
      res.send(response)
    }
    ).catch(rej => res.sendStatus(404))
}
