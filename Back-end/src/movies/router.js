'use strict';

// Router
const router = require('express').Router();
const tasks = require('./index');

// Tasks
router.get('/latest', tasks.findLatest);
router.get('/popular', tasks.findPopular);
router.get('/:movie_id', tasks.findById);





// Export the router
module.exports = router;