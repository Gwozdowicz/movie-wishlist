'use strict';
const bodyParser = require('body-parser');

const app = require('express').Router();
const wishlistHandler = require('./wishlist.handler');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// route used to receive curent user's wishlist
app.get('/getwishlist', wishlistHandler.getWishlist);



module.exports = app;