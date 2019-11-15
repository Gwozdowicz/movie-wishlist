'use strict';
const bodyParser = require('body-parser');

const app = require('express').Router();
const authHandler = require('./authHandlers');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// route for login
app.post('', authHandler.getToken);

// route used to retrieve user's id
app.post('/getUserId', authHandler.getUserId);


module.exports = app;