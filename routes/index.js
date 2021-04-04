// index.js is my entry point to all the routes

const express = require('express');
const router = express.Router();
// we need to require controller first before using it
const homeController = require('../controllers/home_controller');

router.get('/',homeController.home);
router.use('/users',require('./users'));
router.use('/posts',require('./posts'));

module.exports = router;
