// index.js is my entry point to all the routes


// aapne push kia hai khi pe use?han cooments ko push kia h

const express = require('express');
const router = express.Router();
// we need to require controller first before using it
const homeController = require('../controllers/home_controller');

router.get('/',homeController.home);
router.use('/users',require('./users'));
router.use('/posts',require('./posts'));
router.use('/comments',require('./comments'));
router.use('/api',require('./api'));
router.use('/likes',require('./likes'));

module.exports = router;
