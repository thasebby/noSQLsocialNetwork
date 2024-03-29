// create express
const router = require('express').Router();

// import user and thought routes
const userRoutes = require('./userRoutes.js');
const thoughtRoutes = require('./thoughtRoutes.js');

// defining endpoints
router.use('/user', userRoutes);
router.use('/thought', thoughtRoutes);

// export router
module.exports = router;