const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');
const contactController = require('../controllers/contact_controller');

router.get('/', homeController.home);
router.use('/users', require('./users.js'));
router.get('/contact', contactController.contact);

console.log("Router loaded");

module.exports = router;