const jwt = require('jsonwebtoken');
const databaseConnector = require('../services/database.conector')

exports.getToken = async function (req, res) {
    const body = req.body;
    await (databaseConnector.checkForUser(body.login, body.password))
      .then(response => {
        var token = jwt.sign({ userName: response.Login }, 'Kriss-super-secret', { expiresIn: '2h' });
        res.send({ token }
        )
      }
      ).catch(rej => res.sendStatus(401))
  }

  exports.getUserId = async function (req, res) {
    const body = req.body;
    await (databaseConnector.getUserId(body.login, body.password))
      .then(response => {
        var userId = response;
        res.send({ userId: userId }
        )
      }
      ).catch(rej => res.sendStatus(401))
  }