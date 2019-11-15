'use strict';
const expressJwt = require('express-jwt');

const router = require('express').Router();

const errors = require('./src/errors');
const moviesRouter = require('./src/movies/router');
const authRouter = require("./src/auth/authRouter");
const wishListRouter = require("./src/wishlist/wishlist.router");

router.use(expressJwt({secret: 'Kriss-super-secret'}).unless({path: ['/auth', '/auth/getUserId']}));

// Wire up routers
router.use('/movies', moviesRouter);
router.use('/auth', authRouter);
router.use('/wishlist', wishListRouter);

// Wire up error-handling middleware
router.use(errors.errorHandler);
router.use(errors.nullRoute);

// Export the router
module.exports = router;
